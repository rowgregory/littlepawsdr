import { Route, Routes } from 'react-router-dom';
import ECardList from './ECardList';
import ECardEdit from './ECardEdit';
import ProductList from './ProductList';
import ProductEdit from './ProductEdit';
import AdminStoreLayout from '../../../components/layouts/AdminStoreLayout';
import AdminStoreHeader from '../../../components/admin/store/AdminStoreHeader';
import { lazy } from 'react';
import { LazyModulePromise } from '../../../types/common-types';

const WelcomeWieners = lazy((): LazyModulePromise => import('./WelcomeWieners'));

const StoreRoutes = () => (
  <AdminStoreLayout header={<AdminStoreHeader />}>
    <Routes>
      <Route path='/ecards' element={<ECardList />} />
      <Route path='/ecards/:id?' element={<ECardEdit />} />
      <Route path='/products' element={<ProductList />} />
      <Route path='/products/:id?' element={<ProductEdit />} />
      <Route path='/welcome-wieners/*' element={<WelcomeWieners />} />
    </Routes>
  </AdminStoreLayout>
);

export default StoreRoutes;
