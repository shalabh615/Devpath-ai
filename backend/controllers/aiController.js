const { GoogleGenerativeAI } = require('@google/generative-ai');
const Roadmap = require('../models/Roadmap');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);




// Build the AI prompt from student profile
function buildPrompt(profile, githubData) {
  const ghSection = githubData
    ? `GitHub Analysis:
- Username: @${githubData.username}
- Languages detected: ${githubData.languages.join(', ')}
- Top repositories: ${githubData.topRepos.join(' | ')}
- Public repos: ${githubData.publicRepos} | Followers: ${githubData.followers}`
    : 'GitHub: Not connected';

  return `You are DevpathAI — an expert technical career coach. Build a precise, personalized 6-month career roadmap.

## STUDENT PROFILE
Name: ${profile.name} | Age: ${profile.age} | Education: ${profile.education} in ${profile.stream}
GPA: ${profile.gpa} | College: ${profile.college}
Strong subjects: ${profile.subjects}
Certifications/Achievements: ${profile.certifications}

${ghSection}

Selected Technical Skills: ${profile.skills.join(', ')}
Other Skills: ${profile.otherSkills}

Self-Rated Competencies (out of 10):
- Coding Proficiency: ${profile.selfRatings.coding}/10
- System Design: ${profile.selfRatings.systemDesign}/10
- DSA/Problem Solving: ${profile.selfRatings.dsa}/10
- Communication: ${profile.selfRatings.communication}/10
- Building Projects: ${profile.selfRatings.projects}/10

Hobbies/Passions: ${profile.hobbies}

## TARGET ROLE: ${profile.targetRole}
Why this role: ${profile.whyRole}
Timeline: ${profile.timeline}
Hours available per week: ${profile.hoursPerWeek}
Target location/company: ${profile.targetLocation}
Learning budget: ${profile.budget}
Biggest obstacle: ${profile.obstacles}
Learning style: ${profile.learningStyle}
Consistency: ${profile.consistency}
Motivation: ${profile.motivation}
Risk tolerance: ${profile.risk}
About themselves: ${profile.about}
Extra context: ${profile.extra}

## YOUR TASK
Generate a comprehensive JSON career roadmap. Return ONLY valid JSON, no markdown, no backticks, no explanation:

{
  "name": "student name",
  "targetRole": "exact target role",
  "summary": "2-3 sentence insight about their unique profile and biggest advantage",
  "overallMatch": 85,
  "topCareer": {
    "title": "Career Title",
    "field": "Industry Domain",
    "salaryRange": "salary range",
    "growthOutlook": "Excellent",
    "whyFit": "2-3 sentences WHY this person specifically suits this path",
    "tags": ["tag1", "tag2", "tag3", "tag4"]
  },
  "weeklyRoadmap": [
    {
      "week": "Week 1-2",
      "phase": "Foundation",
      "title": "Short title",
      "description": "Specific tasks referencing their actual skills and gaps",
      "resources": ["Resource 1 with URL if known", "Resource 2"],
      "project": "A specific mini-project idea",
      "tags": ["skill1", "skill2"]
    },
    { "week": "Week 3-4", "phase": "Foundation", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] },
    { "week": "Week 5-6", "phase": "Foundation", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] },
    { "week": "Week 7-9", "phase": "Core Skills", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] },
    { "week": "Week 10-12", "phase": "Core Skills", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] },
    { "week": "Week 13-15", "phase": "Core Skills", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] },
    { "week": "Week 16-18", "phase": "Build Portfolio", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] },
    { "week": "Week 19-21", "phase": "Build Portfolio", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] },
    { "week": "Week 22-23", "phase": "Interview Prep", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] },
    { "week": "Week 24-26", "phase": "Launch", "title": "...", "description": "...", "resources": [], "project": "...", "tags": [] }
  ],
  "skillGaps": [
    { "skill": "Skill Name", "current": 30, "required": 85, "priority": "High", "howToClose": "Specific action with resource" },
    { "skill": "...", "current": 50, "required": 90, "priority": "Medium", "howToClose": "..." },
    { "skill": "...", "current": 60, "required": 80, "priority": "Medium", "howToClose": "..." },
    { "skill": "...", "current": 20, "required": 75, "priority": "High", "howToClose": "..." },
    { "skill": "...", "current": 45, "required": 70, "priority": "Low", "howToClose": "..." }
  ],
  "insights": {
    "topStrength": "Their single most powerful career asset",
    "quickWin": "The #1 action they can take in the next 7 days",
    "hiddenRisk": "A blind spot or risk they might not have considered"
  },
  "personalMessage": "1-2 sentence warm, specific, encouraging message to this student by name"
}

IMPORTANT INSTRUCTIONS FOR LANGUAGE:
1. Use extremely SIMPLE, conversational, and easy-to-understand language. Do not overwhelm the user with pure technical jargon.
2. In the 'description' fields, do NOT just list topics. Actually explain *what* they should do and *why* in a readable, friendly, and plain-English manner.
3. Be HIGHLY SPECIFIC, CREATIVE, and UNIQUE to their profile, but always prioritize readability and approachability for a beginner.
4. Personalize the language so that it sounds like a warm, encouraging human mentor talking directly to them.`;
}

// @desc    Generate AI career roadmap
// @route   POST /api/ai/generate
// @access  Private
exports.generateRoadmap = async (req, res) => {
  try {
    const { profile, githubData } = req.body;

    if (!profile || !profile.targetRole) {
      return res.status(400).json({ success: false, message: 'Profile and target role are required' });
    }

    console.log(`🧠 Generating roadmap for: ${profile.name} → ${profile.targetRole}`);

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { temperature: 0.85 } });
    const result = await model.generateContent(buildPrompt(profile, githubData));
    const raw = result.response.text();

    // Parse AI response
    let text = raw.trim();
    text = text.replace(/^```json\s*/g, '').replace(/^```\s*/g, '').replace(/\s*```$/g, '');

    let aiResult;
    try {
      aiResult = JSON.parse(text);
    } catch (parseErr) {
      const match = text.match(/\\{[\\s\\S]*\\}/);
      if (match) {
        aiResult = JSON.parse(match[0]);
      } else {
        throw new Error('AI returned invalid JSON. Please try again.');
      }
    }

    // Save to MongoDB
    const roadmap = await Roadmap.create({
      user: req.user.id,
      profile,
      targetRole: profile.targetRole,
      whyRole: profile.whyRole,
      timeline: profile.timeline,
      hoursPerWeek: profile.hoursPerWeek,
      targetLocation: profile.targetLocation,
      budget: profile.budget,
      obstacles: profile.obstacles,
      learningStyle: profile.learningStyle,
      consistency: profile.consistency,
      motivation: profile.motivation,
      risk: profile.risk,
      about: profile.about,
      extra: profile.extra,
      aiResult,
      progress: {
        weeksCompleted: 0,
        totalWeeks: (aiResult.weeklyRoadmap || []).length,
        percentComplete: 0
      }
    });

    console.log(`✅ Roadmap saved: ${roadmap._id}`);

    res.status(201).json({
      success: true,
      data: {
        roadmapId: roadmap._id,
        aiResult
      }
    });

  } catch (err) {
    console.error('AI generation error details:', err);
    if (err.status === 401 || (err.message && err.message.includes('API key not valid'))) {
      return res.status(401).json({ success: false, message: 'Invalid Gemini API key. Please check your .env file.' });
    }
    if (err.status === 429) {
      return res.status(429).json({ success: false, message: 'AI rate limit reached. Please wait a moment.' });
    }
    res.status(500).json({ success: false, message: err.message || 'AI generation failed' });
  }
};

// @desc    Get all roadmaps for logged-in user
// @route   GET /api/ai/roadmaps
// @access  Private
exports.getMyRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user.id, isActive: true })
      .sort({ generatedAt: -1 })
      .select('targetRole aiResult.topCareer aiResult.overallMatch progress generatedAt');

    res.status(200).json({ success: true, count: roadmaps.length, data: roadmaps });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch roadmaps' });
  }
};

// @desc    Get single roadmap
// @route   GET /api/ai/roadmaps/:id
// @access  Private
exports.getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ _id: req.params.id, user: req.user.id });

    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    res.status(200).json({ success: true, data: roadmap });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch roadmap' });
  }
};

// @desc    Update week completion status
// @route   PATCH /api/ai/roadmaps/:id/week/:weekIndex
// @access  Private
exports.updateWeekStatus = async (req, res) => {
  try {
    const { completed } = req.body;
    const { id, weekIndex } = req.params;

    const roadmap = await Roadmap.findOne({ _id: id, user: req.user.id });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }

    // Update the specific week
    const idx = parseInt(weekIndex);
    if (roadmap.aiResult.weeklyRoadmap[idx] !== undefined) {
      roadmap.aiResult.weeklyRoadmap[idx].completed = completed;
      roadmap.aiResult.weeklyRoadmap[idx].completedAt = completed ? new Date() : null;
    }

    // Recalculate progress
    const totalWeeks = roadmap.aiResult.weeklyRoadmap.length;
    const completedWeeks = roadmap.aiResult.weeklyRoadmap.filter(w => w.completed).length;
    roadmap.progress = {
      weeksCompleted: completedWeeks,
      totalWeeks,
      percentComplete: Math.round((completedWeeks / totalWeeks) * 100),
      lastUpdated: new Date()
    };

    roadmap.markModified('aiResult.weeklyRoadmap');
    await roadmap.save();

    res.status(200).json({
      success: true,
      data: {
        progress: roadmap.progress,
        week: roadmap.aiResult.weeklyRoadmap[idx]
      }
    });
  } catch (err) {
    console.error('Week update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update week' });
  }
};

// @desc    Delete a roadmap
// @route   DELETE /api/ai/roadmaps/:id
// @access  Private
exports.deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ _id: req.params.id, user: req.user.id });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }
    roadmap.isActive = false;
    await roadmap.save();
    res.status(200).json({ success: true, message: 'Roadmap deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete roadmap' });
  }
};
