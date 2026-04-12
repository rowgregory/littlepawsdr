import { Routes, Route, Navigate } from 'react-router-dom';
import NewsletterIssues from './NewslettersIssues';

const NewsletterIssueRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<NewsletterIssues />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default NewsletterIssueRoutes;
