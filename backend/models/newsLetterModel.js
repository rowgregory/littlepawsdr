import mongoose from "mongoose";

const newsletterSchema = mongoose.Schema({
  newsletterEmail: {
    type: String,
    unique: true,
  },
});

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
