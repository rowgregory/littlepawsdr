import { Route, Routes } from 'react-router-dom';
import ECardList from './ECardList';
import ProductList from './ProductList';
import ProductEdit from './ProductEdit';
import AdminStoreLayout from '../../../components/layouts/AdminStoreLayout';
import AdminStoreHeader from '../../../components/admin/store/AdminStoreHeader';
import { lazy } from 'react';
import { LazyModulePromise } from '../../../types/common-types';
import EcardUpdateDrawer from '../../../components/drawers/EcardUpdateDrawer';
import EcardCreateDrawer from '../../../components/drawers/EcardCreateDrawer';

const WelcomeWieners = lazy((): LazyModulePromise => import('./WelcomeWieners'));

const StoreRoutes = () => (
  <AdminStoreLayout header={<AdminStoreHeader />}>
    <EcardUpdateDrawer />
    <EcardCreateDrawer />
    <Routes>
      <Route path='/ecards' element={<ECardList />} />
      <Route path='/products' element={<ProductList />} />
      <Route path='/products/:id?' element={<ProductEdit />} />
      <Route path='/welcome-wieners/*' element={<WelcomeWieners />} />
    </Routes>
  </AdminStoreLayout>
);

export default StoreRoutes;
