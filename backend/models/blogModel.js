import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
    },
    article: {
      type: String,
    },
    image: {
      type: String,
    },
    publicId: {
      type: String,
    },
    author: {
      type: String,
    },
    authorImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
