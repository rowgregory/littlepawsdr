import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import Error from '../models/errorModel.js';

// @desc    Get all blogs
// @route   GET /api/blog
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', '_id name avatar');

    res.json(blogs);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_BLOG_LIST_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Get blog details
// @route   GET /api/blog/:id
// @access  Public
const getBlogDetails = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      'user',
      '_id name avatar'
    );

    res.json(blog);
  } catch (err) {
    const createdError = new Error({
      functionName: 'GET_BLOG_BY_ID_PUBLIC',
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Create a blog
// @route   POST /api/blog
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const { title, article, image } = req.body;
  try {
    const blog = new Blog({
      user: req.user._id,
      title,
      article,
      image,
      author: req.user.name,
      authorImg: req.user.avatar,
    });

    const createdBlog = await blog.save();

    res.status(201).json(createdBlog);
  } catch (err) {
    const createdError = new Error({
      functionName: 'CREATE_BLOG_ADMIN',
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Update a blog
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  try {
    const { title, article, image } = req.body;
    const blog = await Blog.findById(req.params.id);

    blog.title = title ?? blog.title;
    blog.article = article ?? blog.article;
    blog.image = image ?? blog.image;

    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } catch (err) {
    const createdError = new Error({
      functionName: 'UPDATE_BLOG_ADMIN',
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    await blog.deleteOne();

    res.json({ message: 'Blog removed' });
  } catch (err) {
    const createdError = new Error({
      functionName: 'DELETE_BLOG_ADMIN',
      user: {
        id: req?.user?._id,
        name: req?.user?.name,
        email: req?.user?.email,
      },
      detail: err.message,
      status: 500,
    });

    await createdError.save();
    res.status(500).send({
      message: '500 - Server Error',
    });
  }
});

export { getBlogs, getBlogDetails, createBlog, updateBlog, deleteBlog };
