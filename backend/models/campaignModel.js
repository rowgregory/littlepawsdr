import mongoose, { Schema } from 'mongoose';

const campaignSchema = new Schema(
  {
    auction: {
      type: Schema.Types.ObjectId,
      ref: 'Auction',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    isTheme: {
      type: Boolean,
      default: false,
    },
    themeColor: {
      type: String,
    },
    maintainAspectRatio: {
      type: Boolean,
      default: true,
    },
    totalCampaignRevenue: {
      type: Number,
      default: 0,
    },
    supporters: {
      type: Number,
      default: 0,
    },
    supporterEmails: {
      type: [String],
      default: [],
    },
    story: {
      type: String,
    },
    campaignStatus: {
      type: String,
      enum: ['Active', 'Post-Campaign', 'Draft', 'Ended'],
      default: 'Draft',
    },
    customCampaignLink: {
      type: String,
    },
    isCampaignPublished: {
      type: Boolean,
      default: false,
    },
    isMoneyRaisedVisible: {
      type: Boolean,
      default: false,
    },
    feesRequired: {
      type: Boolean,
      default: true,
    },
    feesAmount: {
      type: Number,
      default: 0,
    },
    hasEnded: {
      type: Boolean,
      default: false,
    },
    coverPhoto: {
      type: String,
      default: '',
    },
    coverPhotoName: {
      type: String,
      default: '',
    },
    imgPreference: {
      type: String,
      default: 'object-contain',
    },
    subtitle: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', campaignSchema);
export default Campaign;
