import mongoose from 'mongoose';

const newsletterIssueSchema = new mongoose.Schema(
  {
    pdfUrl: { type: String, required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    year: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

newsletterIssueSchema.index({ month: 1, year: 1 }, { unique: true });

export const NewsletterIssue =
  mongoose.models.NewsletterIssue || mongoose.model('NewsletterIssue', newsletterIssueSchema);
