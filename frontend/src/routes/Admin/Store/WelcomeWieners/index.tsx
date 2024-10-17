import { Route, Routes } from 'react-router-dom';
import AdminWelcomeWienerLayout from '../../../../components/layouts/AdminWelcomeWienerLayout';
import AdminWelcomeWienerSidebar from '../../../../components/admin/store/AdminWelcomeWienerSidebar';
import WelcomeWienerDachshundList from '../WelcomeWienerDachshundList';
import WelcomeWienerDachshundEdit from '../WelcomeWienerDachshundEdit';
import WelcomeWienerProductList from '../WelcomeWienerProductList';
import WelcomeWienerProductEdit from '../WelcomeWienerProductEdit';

const StoreWelcomeWienerRoutes = () => (
  <AdminWelcomeWienerLayout sidebar={<AdminWelcomeWienerSidebar />}>
    <Routes>
      <Route index element={<WelcomeWienerDachshundList />}></Route>
      <Route path=':create?/:id?' element={<WelcomeWienerDachshundEdit />} />
      <Route path='digital' element={<WelcomeWienerProductList />} />
      <Route path='digital/:create?/:id?' element={<WelcomeWienerProductEdit />} />
    </Routes>
  </AdminWelcomeWienerLayout>
);

export default StoreWelcomeWienerRoutes;
