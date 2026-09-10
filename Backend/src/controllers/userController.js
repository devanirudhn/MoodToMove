import User from '../models/User.js';

export const updateMe = async (req, res, next) => {
  try {
    const { name, focusAreas, breakDuration } = req.body;

    const updates = {};
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ success: false, message: 'Name cannot be empty.' });
      }
      updates.name = name.trim();
    }
    if (focusAreas !== undefined && Array.isArray(focusAreas)) {
      updates.focusAreas = focusAreas;
    }
    if (breakDuration !== undefined) {
      updates.breakDuration = Number(breakDuration) || 2;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        focusAreas: updatedUser.focusAreas,
        breakDuration: updatedUser.breakDuration,
        onboardingCompleted: updatedUser.onboardingCompleted,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const savePreferences = async (req, res, next) => {
  try {
    const { focusAreas, breakDuration } = req.body;

    const updates = {
      onboardingCompleted: true
    };

    if (Array.isArray(focusAreas)) {
      updates.focusAreas = focusAreas;
    }
    if (breakDuration) {
      updates.breakDuration = Number(breakDuration) || 2;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select('-passwordHash');

    return res.status(200).json({
      success: true,
      message: 'Preferences saved successfully!',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        focusAreas: updatedUser.focusAreas,
        breakDuration: updatedUser.breakDuration,
        onboardingCompleted: updatedUser.onboardingCompleted,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};
