import mongoose from 'mongoose';

const instructionStepSchema = new mongoose.Schema(
  {
    stepNumber: { type: Number, required: true },
    text: { type: String, required: true },
    startSecond: { type: Number, required: true },
    endSecond: { type: Number, required: true }
  },
  { _id: false }
);

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Activity name is required'],
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Breathing', 'Stretch', 'Mobility', 'Posture', 'Focus', 'Energy', 'Movement']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    durationSeconds: {
      type: Number,
      default: 120
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Gentle'],
      default: 'Easy'
    },
    instructions: {
      type: [instructionStepSchema],
      default: []
    },
    benefits: {
      type: [String],
      default: []
    },
    suitableFor: {
      type: [String],
      default: []
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);


activitySchema.index({ category: 1, active: 1 });

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
