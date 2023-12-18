import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ContactUs from './ContactUs';
import Education from './Education';
import WhoWeAre from './TeamMembers';
import DachshundDetails from './DachshundDetails';
import Blog from './Blog';
import BlogDetails from './BlogDetails';
import SponsorSanctuary from './SponsorSanctuary';
import SuccessfulAdoptions from './SuccessfulAdoptions';
import RainbowBridge from './RainbowBridge';
import DogsOnHold from './DogsOnHold';

const AboutUsRoutes: FC = () => {
  return (
    <Routes>
      <Route path='team-members' element={<WhoWeAre />} />
      <Route path='contact-us' element={<ContactUs />} />
      <Route path='education' element={<Education />} />
      <Route path='hold' element={<DogsOnHold />} />
      <Route path='type/:id' element={<DachshundDetails />} />
      <Route path='sanctuary' element={<SponsorSanctuary />} />
      <Route path='rainbow-bridge' element={<RainbowBridge />} />
      <Route path='successful-adoptions' element={<SuccessfulAdoptions />} />
      <Route path='blog' element={<Blog />} />
      <Route path='blog/:id' element={<BlogDetails />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  );
};

export default AboutUsRoutes;
