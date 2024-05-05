import { Routes, Route, Navigate } from 'react-router-dom';
import DachshundDetails from './DachshundDetails';
import SponsorSanctuary from './SponsorSanctuary';
import SuccessfulAdoptions from './SuccessfulAdoptions';
import RainbowBridge from './RainbowBridge';
import DogsOnHold from './DogsOnHold';

const AboutUsRoutes = () => (
  <Routes>
    <Route path='hold' element={<DogsOnHold />} />
    <Route path='type/:id' element={<DachshundDetails />} />
    <Route path='sanctuary' element={<SponsorSanctuary />} />
    <Route path='rainbow-bridge' element={<RainbowBridge />} />
    <Route path='successful-adoptions' element={<SuccessfulAdoptions />} />
    <Route path='*' element={<Navigate to='/404' replace />} />
  </Routes>
);

export default AboutUsRoutes;
