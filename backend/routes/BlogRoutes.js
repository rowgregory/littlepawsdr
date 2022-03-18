import express from 'express';
const router = express.Router();
import {
  getBlogs,
  createBlog,
  getBlogDetails,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getBlogs).post(protect, admin, createBlog);
router
  .route('/:id')
  .get(getBlogDetails)
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;
