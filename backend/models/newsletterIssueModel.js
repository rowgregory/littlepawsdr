import mongoose from 'mongoose';

const newsletterIssueSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      index: true,
    },
    quarter: {
      type: String,
      enum: ['Q1', 'Q2', 'Q3', 'Q4'],
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique year/quarter combinations
newsletterIssueSchema.index({ year: 1, quarter: 1 }, { unique: true });

export const NewsletterIssue = mongoose.models.NewsletterIssue || mongoose.model('NewsletterIssue', newsletterIssueSchema);
