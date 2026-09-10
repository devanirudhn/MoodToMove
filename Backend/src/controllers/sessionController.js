import mongoose from 'mongoose';
import ActivitySession from '../models/ActivitySession.js';
import Activity from '../models/Activity.js';
import MoodEntry from '../models/MoodEntry.js';

export const createSession = async (req, res, next) => {
  try {
    const { activityId, beforeMood, afterMood, reason = '', durationSeconds = 120 } = req.body;

    if (!activityId || !mongoose.Types.ObjectId.isValid(activityId)) {
      return res.status(400).json({
        success: false,
        message: 'A valid activity ID is required.'
      });
    }

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Selected activity was not found.'
      });
    }

    const bMood = Number(beforeMood);
    const aMood = Number(afterMood);

    if (!bMood || bMood < 1 || bMood > 5) {
      return res.status(400).json({
        success: false,
        message: 'Before mood must be a number between 1 and 5.'
      });
    }

    if (!aMood || aMood < 1 || aMood > 5) {
      return res.status(400).json({
        success: false,
        message: 'After mood must be a number between 1 and 5.'
      });
    }

    // Explicitly compute moodChange on backend - do not trust client calculation
    const moodChange = aMood - bMood;

    const session = await ActivitySession.create({
      userId: req.user._id,
      activityId,
      beforeMood: bMood,
      afterMood: aMood,
      moodChange,
      durationSeconds: Number(durationSeconds) || 120,
      reason: reason.trim(),
      completedAt: new Date()
    });

    const populatedSession = await ActivitySession.findById(session._id).populate('activityId');

    return res.status(201).json({
      success: true,
      message: 'Reset session completed and saved!',
      session: populatedSession
    });
  } catch (error) {
    next(error);
  }
};

export const getSessions = async (req, res, next) => {
  try {
    const { category } = req.query;

    const query = { userId: req.user._id };
    const sessions = await ActivitySession.find(query)
      .populate('activityId')
      .sort({ completedAt: -1 });

    let filteredSessions = sessions;
    if (category && category !== 'All') {
      filteredSessions = sessions.filter(
        (s) => s.activityId && s.activityId.category === category
      );
    }

    return res.status(200).json({
      success: true,
      count: filteredSessions.length,
      sessions: filteredSessions
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // 1. Today's Completed Resets
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayCount = await ActivitySession.countDocuments({
      userId,
      completedAt: { $gte: startOfToday }
    });

    // 2. All completed sessions for calculations
    const allSessions = await ActivitySession.find({ userId })
      .populate('activityId', 'name category')
      .sort({ completedAt: -1 });

    const totalCount = allSessions.length;

    // 3. Average Mood Improvement
    let avgImprovement = 0;
    if (totalCount > 0) {
      const sumImprovement = allSessions.reduce((acc, s) => acc + s.moodChange, 0);
      avgImprovement = Number((sumImprovement / totalCount).toFixed(1));
    }

    // 4. Calculate Current Streak
    let currentStreak = 0;
    if (totalCount > 0) {
      // Group dates into YYYY-MM-DD set
      const sessionDates = new Set(
        allSessions.map((s) => {
          const d = new Date(s.completedAt);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        })
      );

      const toDateString = (dateObj) =>
        `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

      const today = new Date();
      const todayStr = toDateString(today);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = toDateString(yesterday);

      // Streak is active if user completed a session today or yesterday
      let checkDate = new Date();
      if (!sessionDates.has(todayStr)) {
        if (sessionDates.has(yesterdayStr)) {
          checkDate = yesterday;
        } else {
          checkDate = null;
        }
      }

      if (checkDate) {
        let runningDate = new Date(checkDate);
        while (sessionDates.has(toDateString(runningDate))) {
          currentStreak += 1;
          runningDate.setDate(runningDate.getDate() - 1);
        }
      }
    }

    // 5. Latest Mood
    const latestMoodEntry = await MoodEntry.findOne({ userId }).sort({ createdAt: -1 });
    let latestMood = latestMoodEntry ? latestMoodEntry.moodScore : null;
    if (!latestMood && allSessions.length > 0) {
      latestMood = allSessions[0].afterMood;
    }

    // 6. Weekly Mood Data (last 7 sessions / days)
    const recentSessions = allSessions.slice(0, 7).reverse();
    const weeklyMoodData = recentSessions.map((s) => {
      const d = new Date(s.completedAt);
      return {
        id: s._id,
        date: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        before: s.beforeMood,
        after: s.afterMood,
        change: s.moodChange,
        activityName: s.activityId ? s.activityId.name : 'Quick Reset'
      };
    });

    return res.status(200).json({
      success: true,
      stats: {
        todayCount,
        currentStreak,
        avgImprovement,
        totalCount,
        latestMood: latestMood || 3,
        weeklyMoodData
      }
    });
  } catch (error) {
    next(error);
  }
};
