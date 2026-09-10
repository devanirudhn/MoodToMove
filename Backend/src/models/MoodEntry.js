import mongoose from 'mongoose';

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  moodScore: {
    type: Number,
    required: [true, 'Mood score is required'],
    min: [1, 'Mood score must be at least 1'],
    max: [5, 'Mood score cannot exceed 5']
  },
  moodLabel: {
    type: String,
    required: [true, 'Mood label is required'],
    enum: ['Very Low', 'Low', 'Okay', 'Good', 'Great']
  },
  reason: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying of user's mood history descending
moodEntrySchema.index({ userId: 1, createdAt: -1 });

const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);
export default MoodEntry;
