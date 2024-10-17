import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import AvailableDachshunds from './AvailableDachshunds';
import NotAvailableForAdoptionYet from './NotAvailableForAdoptionYet';
import SurrenderToUs from './SurrenderToUs';
import DachshundDetails from './DachshundDetails';

const DachshundRoutes: FC = () => {
  return (
    <div className='min-h-[calc(100vh-540px)] pb-60 mt-[65px]'>
      <Routes>
        <Route path='/' element={<AvailableDachshunds />} />
        <Route path='/hold' element={<NotAvailableForAdoptionYet />} />
        <Route path='/surrender' element={<SurrenderToUs />} />
        <Route path=':id' element={<DachshundDetails />} />
      </Routes>
    </div>
  );
};

export default DachshundRoutes;
