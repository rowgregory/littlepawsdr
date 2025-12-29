import { Routes, Route, Navigate } from 'react-router-dom';
import StoreItemDetails from './StoreItemDetails';
import Store from './Store';
import PersonalizeEcard from './PersonalizeEcard';

const StoreRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path=':id' element={<StoreItemDetails />} />
        <Route path='/ecards/:id' element={<PersonalizeEcard />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </>
  );
};

export default StoreRoutes;
