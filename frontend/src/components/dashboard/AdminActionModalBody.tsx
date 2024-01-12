import styled from 'styled-components';
import SellingAccordion from './sidebar/SellingAccordion';
import PeopleAccordion from './sidebar/PeopleAccordion';
import MicellaneousAccordion from './sidebar/MicellaneousAccordion';
import { LinkContainer, SideBarAccordionLink } from './sidebar/styles';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { openCloseDashboardModal } from '../../actions/dashboardActions';
import { useDispatch } from 'react-redux';
import { Text } from '../styles/Styles';

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
      <SideBarAccordionLink
        to='/'
        onClick={() => {
          dispatch(openCloseDashboardModal(false));
          setWhichSectionToReveal('--', setReveal);
        }}
      >
        <LinkContainer active={('/' === pathname).toString()}>
          <div className='ml-2'>
            <i className='fa-solid fa-home'></i>
          </div>
          <Text fontSize='15px' fontWeight={400}>
            Home
          </Text>
        </LinkContainer>
      </SideBarAccordionLink>
      <SideBarAccordionLink
        to='/admin'
        onClick={() => {
          dispatch(openCloseDashboardModal(false));
          setWhichSectionToReveal('--', setReveal);
        }}
      >
        <LinkContainer active={('/admin' === pathname).toString()}>
          <div className='ml-2'>
            <i className='fa-solid fa-gauge-high'></i>
          </div>
          <Text fontSize='15px' fontWeight={400}>
            Dashboard
          </Text>
        </LinkContainer>
      </SideBarAccordionLink>
      <SideBarAccordionLink
        to='/admin/orders'
        onClick={() => {
          dispatch(openCloseDashboardModal(false));
          setWhichSectionToReveal('--', setReveal);
        }}
      >
        <LinkContainer active={(pathname === '/admin/orders').toString()}>
          <div className='ml-2'>
            <i className='fa-solid fa-cube'></i>
          </div>
          <Text fontSize='15px' fontWeight={400}>
            Orders
          </Text>
        </LinkContainer>
      </SideBarAccordionLink>
      <SideBarAccordionLink
        to='/admin/archive'
        onClick={() => {
          dispatch(openCloseDashboardModal(false));
          setWhichSectionToReveal('--', setReveal);
        }}
      >
        <LinkContainer active={('/admin/archive' === pathname).toString()}>
          <div className='ml-2'>
            <i className="fa-solid fa-robot"></i>
          </div>
          <Text fontSize='15px' fontWeight={400}>
            Archive
          </Text>
        </LinkContainer>
      </SideBarAccordionLink>
      <SideBarAccordionLink
        to='/admin/action-history'
        onClick={() => {
          dispatch(openCloseDashboardModal(false));
          setWhichSectionToReveal('--', setReveal);
        }}
      >
        <LinkContainer active={('/admin/action-history' === pathname).toString()}>
          <div className='ml-2'>
            <i className="fa-solid fa-timeline"></i>
          </div>
          <Text fontSize='15px' fontWeight={400}>
            Action History
          </Text>
        </LinkContainer>
      </SideBarAccordionLink>
      <SellingAccordion
        reveal={reveal?.selling}
        setWhichSectionToReveal={setWhichSectionToReveal}
        setReveal={setReveal}
      />
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
