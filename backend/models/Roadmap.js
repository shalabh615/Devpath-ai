const mongoose = require('mongoose');

const WeekSchema = new mongoose.Schema({
  week: String,
  phase: String,
  title: String,
  description: String,
  resources: [String],
  project: String,
  tags: [String],
  completed: { type: Boolean, default: false },
  completedAt: Date
});

const SkillGapSchema = new mongoose.Schema({
  skill: String,
  current: Number,
  required: Number,
  priority: { type: String, enum: ['High', 'Medium', 'Low'] },
  howToClose: String
});

const RoadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  // Student profile snapshot
  profile: {
    name: String,
    age: Number,
    education: String,
    stream: String,
    gpa: String,
    college: String,
    subjects: String,
    certifications: String,
    skills: [String],
    otherSkills: String,
    selfRatings: {
      coding: Number,
      systemDesign: Number,
      dsa: Number,
      communication: Number,
      projects: Number
    },
    hobbies: String,
    githubUsername: String,
    githubLanguages: [String]
  },
  // Target
  targetRole: {
    type: String,
    required: true
  },
  whyRole: String,
  timeline: String,
  hoursPerWeek: String,
  targetLocation: String,
  budget: String,
  obstacles: String,
  learningStyle: String,
  consistency: String,
  motivation: String,
  risk: String,
  about: String,
  extra: String,

  // AI-generated result
  aiResult: {
    summary: String,
    overallMatch: Number,
    topCareer: {
      title: String,
      field: String,
      salaryRange: String,
      growthOutlook: String,
      whyFit: String,
      tags: [String]
    },
    weeklyRoadmap: [WeekSchema],
    skillGaps: [SkillGapSchema],
    insights: {
      topStrength: String,
      quickWin: String,
      hiddenRisk: String
    },
    personalMessage: String
  },

  // Progress tracking
  progress: {
    weeksCompleted: { type: Number, default: 0 },
    totalWeeks: { type: Number, default: 10 },
    percentComplete: { type: Number, default: 0 },
    lastUpdated: Date
  },

  // Meta
  generatedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// Auto-update updatedAt
RoadmapSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
