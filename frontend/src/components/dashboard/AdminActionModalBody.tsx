import styled from 'styled-components';
import SellingAccordion from './sidebar/SellingAccordion';
import PeopleAccordion from './sidebar/PeopleAccordion';
import MicellaneousAccordion from './sidebar/MicellaneousAccordion';
import OrdersIcon from '../svg/OrdersIcon';
import { LinkContainer, SideBarLink } from './sidebar/styles';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardIcon from '../svg/DashboardIcon';
import { openCloseDashboardModal } from '../../actions/dashboardActions';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
`;

export const setWhichSectionToReveal = (section: string, setReveal?: any) => {
  setReveal({
    selling: section === 'selling',
    miscellaneous: section === 'miscellaneous',
    people: section === 'people',
  });
};

const AdminActionModalBody = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [reveal, setReveal] = useState({
    selling: false,
    people: false,
    miscellaneous: false,
  });
  return (
    <Container>
      <SideBarLink
        to='/admin'
        onClick={() => {
          dispatch(openCloseDashboardModal(false));
          setWhichSectionToReveal('--', setReveal);
        }}
      >
        <LinkContainer
          active={('/admin' === pathname).toString()}
          className='d-flex align-items-center px-3 py-3 mb-2'
        >
          <div>
            <DashboardIcon />
          </div>
          <div className='ml-3'>Dashboard</div>
        </LinkContainer>
      </SideBarLink>
      <SellingAccordion
        reveal={reveal?.selling}
        setWhichSectionToReveal={setWhichSectionToReveal}
        setReveal={setReveal}
      />
      <SideBarLink
        to='/admin/orders'
        onClick={() => {
          dispatch(openCloseDashboardModal(false));
          setWhichSectionToReveal('--', setReveal);
        }}
      >
        <LinkContainer
          active={(pathname === '/admin/orders').toString()}
          className='d-flex align-items-center px-3 py-3 mb-2'
        >
          <div>
            <OrdersIcon />
          </div>
          <div className='ml-3'>Orders</div>
        </LinkContainer>
      </SideBarLink>
      <PeopleAccordion
        reveal={reveal?.people}
        setWhichSectionToReveal={setWhichSectionToReveal}
        setReveal={setReveal}
      />
      <MicellaneousAccordion
        reveal={reveal?.miscellaneous}
        setWhichSectionToReveal={setWhichSectionToReveal}
        setReveal={setReveal}
      />
    </Container>
  );
};

export default AdminActionModalBody;
