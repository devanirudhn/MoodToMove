import mongoose from 'mongoose';

const activitySessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: true
  },
  beforeMood: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  afterMood: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  moodChange: {
    type: Number,
    required: true
  },
  durationSeconds: {
    type: Number,
    default: 120
  },
  reason: {
    type: String,
    default: ''
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for query optimization by user descending
activitySessionSchema.index({ userId: 1, completedAt: -1 });

const ActivitySession = mongoose.model('ActivitySession', activitySessionSchema);
export default ActivitySession;
