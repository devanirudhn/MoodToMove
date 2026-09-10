import Activity from '../models/Activity.js';
import mongoose from 'mongoose';

export const getActivities = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { active: true };
    if (category && category !== 'All') {
      filter.category = category;
    }

    const activities = await Activity.find(filter).sort({ name: 1 });
    return res.status(200).json({
      success: true,
      count: activities.length,
      activities
    });
  } catch (error) {
    next(error);
  }
};

export const getActivityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let activity;
    if (mongoose.Types.ObjectId.isValid(id)) {
      activity = await Activity.findOne({ _id: id, active: true });
    }
    if (!activity) {
      activity = await Activity.findOne({ slug: id.toLowerCase(), active: true });
    }

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found.'
      });
    }

    return res.status(200).json({
      success: true,
      activity
    });
  } catch (error) {
    next(error);
  }
};
