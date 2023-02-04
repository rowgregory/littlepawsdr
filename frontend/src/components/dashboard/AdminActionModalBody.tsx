import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LinkContainer, SideBarLink } from './SideBar';
import DashboardIcon from '../svg/DashboardIcon';
import EcardIcon from '../svg/EcardIcon';
import EventsIcon from '../svg/EventsIcon';
import NewsletterEmailIcon from '../svg/NewsletterEmailIcon';
import OrdersIcon from '../svg/OrdersIcon';
import ProductsIcon from '../svg/ProductsIcon';
import RaffleWinnerIcon from '../svg/RaffleWinner';
import UsersIcon from '../svg/UsersIcon';
import NewsArticleIcon from '../svg/NewsArticleIcon';
import EducationTipIcon from '../svg/EducationTipIcon';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  padding: 1rem;
`;

export const sidebarData = (): {
  textKey: string;
  linkKey: string;
  icon?: JSX.Element;
  pathMatch?: string;
}[] => [
  {
    textKey: 'Dashboard',
    linkKey: '/admin',
    icon: <DashboardIcon />,
  },
  {
    textKey: 'ECards',
    linkKey: '/admin/eCardList',
    icon: <EcardIcon />,
    pathMatch: 'eCard',
  },
  {
    textKey: ' Newsletter Emails',
    linkKey: '/admin/newsletterEmailList',
    icon: <NewsletterEmailIcon />,
  },
  {
    textKey: 'Orders',
    linkKey: '/admin/orderList',
    icon: <OrdersIcon />,
  },
  {
    textKey: 'Products',
    linkKey: '/admin/productList',
    icon: <ProductsIcon />,
  },
  {
    textKey: 'Users',
    linkKey: '/admin/userList',
    icon: <UsersIcon />,
  },
  {
    textKey: 'Volunteers',
    linkKey: '/admin/manuallyAddedUserList',
    icon: <UsersIcon />,
  },
  {
    textKey: 'Events',
    linkKey: '/admin/eventList',
    icon: <EventsIcon />,
    pathMatch: 'event',
  },
  {
    textKey: 'Raffle Winners',
    linkKey: '/admin/raffleWinnerList',
    icon: <RaffleWinnerIcon />,
    pathMatch: 'raffleWinner',
  },
  {
    textKey: 'Blog',
    linkKey: '/admin/blogs',
    icon: <NewsArticleIcon />,
    pathMatch: 'blogs',
  },
  {
    textKey: 'Education',
    linkKey: '/admin/education-tips',
    icon: <EducationTipIcon />,
    pathMatch: 'educationTips',
  },
];

const AdminActionModalBody = ({ close }: any) => {
  const { pathname } = useLocation();
  return (
    <Container>
      {sidebarData().map((obj: any, i: number) => (
        <SideBarLink
          style={{ border: 'none' }}
          onClick={close}
          key={i}
          to={obj?.linkKey}
          active={(obj?.linkKey === pathname).toString()}
        >
          <LinkContainer
            style={{ border: 'none' }}
            active={(obj?.linkKey === pathname).toString()}
            className='d-flex align-items-center p-2'
          >
            <div>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Container>
  );
};

export default AdminActionModalBody;
