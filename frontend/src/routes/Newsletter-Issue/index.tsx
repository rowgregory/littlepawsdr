import { Routes, Route, Navigate } from 'react-router-dom';
import NewsletterIssues from './NewslettersIssues';
import NewsletterIssue from './NewsletterIssue';

const NewsletterIssueRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<NewsletterIssues />} />
      <Route path=':id' element={<NewsletterIssue />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default NewsletterIssueRoutes;
