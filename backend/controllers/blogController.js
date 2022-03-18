import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// @desc    Get all blogs
// @route   GET /api/blog
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate('user', '_id name avatar');

  res.json(blogs);
});

// @desc    Get blog details
// @route   GET /api/blog/:id
// @access  Public
const getBlogDetails = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    'user',
    '_id name avatar'
  );

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Create a blog
// @route   POST /api/blog
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    user: req.user._id,
    title: 'Sample title',
    article: 'Sample article',
    image:
      'https://res.cloudinary.com/doyd0ewgk/image/upload/v1641507406/img-placeholder.png',
    publicId: '',
    author: req.user.name,
    authorImg: req.user.avatar,
  });

  const createdBlog = await blog.save();

  res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, article, image, publicId } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.article = article || blog.article;
    blog.image = image || blog.image;
    blog.publicId = publicId || blog.publicId;

    const updatedBlog = await blog.save();

    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

export { getBlogs, getBlogDetails, createBlog, updateBlog, deleteBlog };
