import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Blog from './Blog';
import BlogDetails from './BlogDetails';

const BlogRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Blog />} />
      <Route path=':id' element={<BlogDetails />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default BlogRoutes;
