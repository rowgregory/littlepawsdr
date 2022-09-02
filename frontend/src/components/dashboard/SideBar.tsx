import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DashboardIcon from '../svg/DashboardIcon';
import DonationsIcon from '../svg/DonationsIcon';
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
  background-color: ${({ theme }) => theme.input.bg};
  border-top: ${({ theme }) => `1px solid ${theme.separator}`};
  border-left: ${({ theme }) => `1px solid ${theme.separator}`};
  border-right: ${({ theme }) => `1px solid ${theme.separator}`};
`;

export const LinkContainer = styled.div<{ active?: string }>`
  background: ${({ active, theme }) =>
    active === 'true' ? theme.colors.tertiary : theme.bg};
  transition: 300ms;
  border-bottom: ${({ theme }) => `1px solid ${theme.separator}`};

  color: ${({ active, theme }) => (active === 'true' ? theme.white : '')};
  svg {
    path {
      fill: ${({ active, theme }) =>
        active === 'true' ? theme.white : theme.colors.white};
    }
    g {
      path {
        fill: ${({ active, theme }) =>
          active === 'true' ? theme.white : theme.colors.white};
      }
      g {
        path {
          fill: ${({ active, theme }) =>
            active === 'true' ? theme.white : theme.colors.white};
        }
      }
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    :hover {
      background: ${({ theme }) => theme.colors.tertiary};
      cursor: pointer;
      div {
        color: ${({ theme }) => theme.white};
      }
      svg {
        path {
          fill: ${({ theme }) => theme.white} !important;
        }
        g {
          path {
            fill: ${({ theme }) => theme.white} !important;
          }
          g {
            path {
              fill: ${({ theme }) => theme.white} !important;
            }
          }
        }
      }
    }
  }
`;

export const SideBarLink = styled(Link)<{ active?: string }>`
  background: ${({ active, theme }) =>
    active === 'true' ? theme.colors.secondary : '#fff'};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-family: 'Duru', sans-serif;
  letter-spacing: 0.1rem;
  :hover {
    text-decoration: none;
  }
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
    textKey: 'Donations',
    linkKey: '/admin/donationList',
    icon: <DonationsIcon />,
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

const SideBar = () => {
  const { pathname } = useLocation();
  return (
    <Container className='d-flex flex-column'>
      {sidebarData().map((obj: any, i: number) => (
        <SideBarLink key={i} to={obj?.linkKey}>
          <LinkContainer
            active={(obj?.linkKey === pathname).toString()}
            className='d-flex align-items-center p-4'
          >
            <div>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Container>
  );
};

export default SideBar;
