import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    category: {
      type: String,
      enum: ['ui', 'functionality', 'performance', 'payment', 'other'],
      default: 'other',
    },
    url: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
    },
    screenshots: [
      {
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    steps: {
      type: String,
      description: 'Steps to reproduce the bug',
    },
    expectedBehavior: {
      type: String,
    },
    actualBehavior: {
      type: String,
    },
    notes: [
      {
        text: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resolvedAt: Date,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Bug = mongoose.model('Bug', bugSchema);
export default Bug;
