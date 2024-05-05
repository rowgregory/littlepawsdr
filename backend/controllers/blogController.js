import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';
import Error from '../models/errorModel.js';

/**
 @desc    Get all blogs
 @route   GET /api/blog
 @access  Public
*/
const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', '_id name avatar');

    res.status(200).json({ blogs });
  } catch (err) {
    await Error.create({
      functionName: 'GET_BLOG_LIST_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error fetching blogs',
      sliceName: 'blogApi',
    });
  }
});

/**
 @desc    Get blog details
 @route   GET /api/blog/:id
 @access  Public
*/
const getBlogDetails = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', '_id name avatar');

    res.json({ blog });
  } catch (err) {
    await Error.create({
      functionName: 'GET_BLOG_BY_ID_PUBLIC',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).send({
      message: 'Error fetching blog',
      sliceName: 'blogApi',
    });
  }
});

/**
 @desc    Create a blog
 @route   POST /api/blog
 @access  Private/Admin
*/
const createBlog = asyncHandler(async (req, res) => {
  const { title, article, image } = req.body;
  try {
    await Blog.create({
      user: req.user._id,
      title,
      article,
      image,
      author: req.user.name,
      authorImg: req.user.avatar,
    });

    res.status(201).json({ message: 'Blog created', sliceName: 'blogApi' });
  } catch (err) {
    await Error.create({
      functionName: 'CREATE_BLOG_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error creating blog',
      sliceName: 'blogApi',
    });
  }
});

/**
 @desc    Update a blog
 @route   PUT /api/blog/:id
 @access  Private/Admin
*/
const updateBlog = asyncHandler(async (req, res) => {
  try {
    await Blog.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });

    res.json({ message: 'Blog updated', sliceName: 'blogApi' });
  } catch (err) {
    await Error.create({
      functionName: 'UPDATE_BLOG_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error updating blog',
      sliceName: 'blogApi',
    });
  }
});

/**
 @desc    Delete a blog
 @route   DELETE /api/blog/:id
 @access  Private/Admin
*/
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    await blog.deleteOne();

    res.json({ message: 'Blog deleted', sliceName: 'blogApi' });
  } catch (err) {
    await Error.create({
      functionName: 'DELETE_BLOG_ADMIN',
      name: err.name,
      message: err.message,
      user: { id: req?.user?._id, email: req?.user?.email },
    });

    res.status(500).json({
      message: 'Error deleting blog',
      sliceName: 'blogApi',
    });
  }
});

export { getBlogs, getBlogDetails, createBlog, updateBlog, deleteBlog };
