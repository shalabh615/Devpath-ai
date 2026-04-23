const axios = require('axios');
const User = require('../models/User');

// @desc    Fetch GitHub profile and cache it
// @route   POST /api/github/analyze
// @access  Public (no auth needed to analyze)
exports.analyzeGitHub = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, message: 'GitHub username is required' });
    }

    // Fetch user profile
    const [userRes, reposRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      }),
      axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      })
    ]);

    const user = userRes.data;
    const repos = reposRes.data;

    // Count languages
    const langCount = {};
    repos.forEach(r => {
      if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    });
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(l => l[0]);

    const topRepos = repos
      .sort((a, b) => (b.stargazers_count - a.stargazers_count))
      .slice(0, 6)
      .map(r => `${r.name} (${r.language || 'N/A'}) ⭐${r.stargazers_count}`);

    const githubData = {
      username,
      name: user.name || username,
      bio: user.bio || '',
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      avatarUrl: user.avatar_url,
      location: user.location || '',
      company: user.company || '',
      languages,
      topRepos,
      profileUrl: user.html_url,
      createdAt: user.created_at
    };

    res.status(200).json({ success: true, data: githubData });
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ success: false, message: 'GitHub user not found' });
    }
    if (err.response && err.response.status === 403) {
      return res.status(429).json({ success: false, message: 'GitHub API rate limit exceeded. Try again in a minute.' });
    }
    console.error('GitHub fetch error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch GitHub profile' });
  }
};

// @desc    Save GitHub data to logged-in user profile
// @route   POST /api/github/save
// @access  Private
exports.saveGitHub = async (req, res) => {
  try {
    const { githubData } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      githubUsername: githubData.username,
      githubData: {
        name: githubData.name,
        bio: githubData.bio,
        followers: githubData.followers,
        publicRepos: githubData.publicRepos,
        languages: githubData.languages,
        topRepos: githubData.topRepos,
        fetchedAt: new Date()
      }
    });

    res.status(200).json({ success: true, message: 'GitHub data saved' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to save GitHub data' });
  }
};
