import { Routes, Route, Navigate } from 'react-router-dom';
import StoreItemDetails from './StoreItemDetails';
import Store from './Store';
import FilterDrawer from '../../components/store/FilterDrawer';
import PersonalizeEcard from './PersonalizeEcard';
import EcardPreview from './EcardPreview';
import { Fragment } from 'react';

const StoreRoutes = () => {
  return (
    <Fragment>
      <FilterDrawer />
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path=':id' element={<StoreItemDetails />} />
        <Route path='/ecards/:id' element={<PersonalizeEcard />} />
        <Route path='/ecards/:id/preview' element={<EcardPreview />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Routes>
    </Fragment>
  );
};

export default StoreRoutes;
