import { Routes, Route } from 'react-router-dom';
import AvailableDachshunds from './AvailableDachshunds';
import NotAvailableForAdoptionYet from './NotAvailableForAdoptionYet';
import SurrenderToUs from './SurrenderToUs';
import DachshundDetails from './DachshundDetails';

const DachshundRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<AvailableDachshunds />} />
      <Route path='/hold' element={<NotAvailableForAdoptionYet />} />
      <Route path='/surrender' element={<SurrenderToUs />} />
      <Route path=':id' element={<DachshundDetails />} />
    </Routes>
  );
};

export default DachshundRoutes;
