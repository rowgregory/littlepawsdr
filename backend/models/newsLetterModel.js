import mongoose from "mongoose";

const newsletterSchema = mongoose.Schema(
  {
    newsletterEmail: {
      type: String,
      unique: true,
    },
  },  
  {
    timestamps: true,
  }
);

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
