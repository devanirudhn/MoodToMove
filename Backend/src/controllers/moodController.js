import MoodEntry from '../models/MoodEntry.js';

const MOOD_MAP = {
  1: 'Very Low',
  2: 'Low',
  3: 'Okay',
  4: 'Good',
  5: 'Great'
};

export const createMoodEntry = async (req, res, next) => {
  try {
    const { moodScore, reason = '' } = req.body;
    const score = Number(moodScore);

    if (!score || score < 1 || score > 5) {
      return res.status(400).json({
        success: false,
        message: 'Mood score must be a number between 1 (Very Low) and 5 (Great).'
      });
    }

    const moodLabel = MOOD_MAP[score];

    const moodEntry = await MoodEntry.create({
      userId: req.user._id,
      moodScore: score,
      moodLabel,
      reason: reason.trim()
    });

    return res.status(201).json({
      success: true,
      message: 'Mood recorded successfully.',
      moodEntry
    });
  } catch (error) {
    next(error);
  }
};

export const getMoodHistory = async (req, res, next) => {
  try {
    const moods = await MoodEntry.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      count: moods.length,
      moods
    });
  } catch (error) {
    next(error);
  }
};

export const getTodayMoods = async (req, res, next) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const moods = await MoodEntry.find({
      userId: req.user._id,
      createdAt: { $gte: startOfToday }
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: moods.length,
      moods
    });
  } catch (error) {
    next(error);
  }
};
