import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DashboardIcon from '../svg/DashboardIcon';
import DonationsIcon from '../svg/DonationsIcon';
import EcardIcon from '../svg/EcardIcon';
import EventsIcon from '../svg/EventsIcon';
import NewsletterEmailIcon from '../svg/NewsletterEmailIcon';
import OrdersIcon from '../svg/OrdersIcon';
import ProductsIcon from '../svg/ProductsIcon';
import UsersIcon from '../svg/UsersIcon';
import NewsArticleIcon from '../svg/NewsArticleIcon';
import EducationTipIcon from '../svg/EducationTipIcon';
import LogoDay from '../assets/dashboard-logo.png';
import { Image } from 'react-bootstrap';
import { Accordion } from '../styles/place-order/Styles';
import SellingIcon from '../svg/SellingIcon';
import ProceedsIcon from '../svg/ProceedsIcon';
import EcardOrdersIcon from '../svg/EcardOrdersIcon';
import MicellaneousIcon from '../svg/MicellaneousIcon';
import PeopleIcon from '../svg/PeopleIcon';

const Container = styled.div`
  background-color: ${({ theme }) => theme.input.bg};
  padding: 40px 20px 20px;
`;

export const LinkContainer = styled.div<{ active?: string }>`
  padding: 16px;
  background: ${({ active, theme }) =>
    active === 'true' ? '#f9f9f9' : theme.bg};
  transition: 300ms;
  div {
    color: ${({ active, theme }) =>
      active === 'true' ? theme.colors.quinary : '#c4c4c4'};
  }
  svg {
    path {
      fill: ${({ active, theme }) =>
        active === 'true' ? theme.colors.quinary : '#c4c4c4'};
    }
    g {
      path,
      circle {
        fill: ${({ active, theme }) =>
          active === 'true' ? theme.colors.quinary : '#c4c4c4'};
      }
      g {
        path {
          fill: ${({ active, theme }) =>
            active === 'true' ? theme.colors.quinary : '#c4c4c4'};
        }
      }
    }
  }

  :hover {
    background: #f9f9f9;
    div {
      color: ${({ theme }) => theme.colors.quinary};
    }
    svg {
      path {
        fill: ${({ theme }) => theme.colors.quinary};
      }
      g {
        path {
          fill: ${({ theme }) => theme.colors.quinary};
        }
        g {
          path {
            fill: ${({ theme }) => theme.colors.quinary};
          }
        }
      }
    }
  }
`;

export const SideBarLink = styled(Link)<{ active?: string }>`
  font-size: 13px;
  font-weight: 400;
  :hover {
    text-decoration: none;
  }
`;

export const SideBarAccordionBtn = styled.div`
  font-size: 13px;
  font-weight: 400;
  :hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

const miscellaneousLinks = [
  {
    textKey: 'Events',
    linkKey: '/admin/eventList',
    icon: <EventsIcon />,
    pathMatch: 'event',
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

const sellingLinks = [
  {
    textKey: 'ECards',
    linkKey: '/admin/eCardList',
    icon: <EcardIcon />,
    pathMatch: 'eCard',
  },
  {
    textKey: 'Products',
    linkKey: '/admin/productList',
    icon: <ProductsIcon />,
    pathMatch: 'product',
  },
];

const proceedsLinks = [
  {
    textKey: 'Donations',
    linkKey: '/admin/donationList',
    icon: <DonationsIcon />,
    pathMatch: 'donation',
  },
  {
    textKey: 'Product Orders',
    linkKey: '/admin/orderList',
    icon: <OrdersIcon />,
    pathMatch: 'productOrder',
  },
  {
    textKey: 'Ecard Orders',
    linkKey: '/admin/ecardOrderList',
    icon: <EcardOrdersIcon />,
    pathMatch: 'eCardOrder',
  },
];

const peopleLinks = [
  {
    textKey: ' Newsletter Emails',
    linkKey: '/admin/newsletterEmailList',
    icon: <NewsletterEmailIcon />,
  },
  {
    textKey: 'Users',
    linkKey: '/admin/userList',
    icon: <UsersIcon />,
    pathMatch: 'user',
  },
  {
    textKey: 'Board Members',
    linkKey: '/admin/manuallyAddedUserList',
    icon: <UsersIcon />,
    pathMatch: 'manuallyAddedUser',
  },
];

const SellingAccordion = ({ revealSelling }: any) => {
  const { pathname } = useLocation();
  return (
    <Accordion toggle={revealSelling} maxheight='150px'>
      {sellingLinks.map((obj: any, i: number) => (
        <SideBarLink key={i} to={obj?.linkKey}>
          <LinkContainer
            active={(
              obj?.linkKey === pathname ||
              obj.pathMatch === pathname.split('/')[2]
            ).toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div className='ml-3'>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Accordion>
  );
};

const ProceedsAccordion = ({ revealProceeds }: any) => {
  const { pathname } = useLocation();

  return (
    <Accordion toggle={revealProceeds} maxheight='200px'>
      {proceedsLinks.map((obj: any, i: number) => (
        <SideBarLink key={i} to={obj?.linkKey}>
          <LinkContainer
            active={(
              obj?.linkKey === pathname ||
              obj.pathMatch === pathname.split('/')[2]
            ).toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div className='ml-3'>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Accordion>
  );
};

const MicellaneousAccordion = ({ revealMicellaneous }: any) => {
  const { pathname } = useLocation();

  return (
    <Accordion toggle={revealMicellaneous} maxheight='250px'>
      {miscellaneousLinks.map((obj: any, i: number) => (
        <SideBarLink key={i} to={obj?.linkKey}>
          <LinkContainer
            active={(
              obj?.linkKey === pathname ||
              obj.pathMatch === pathname.split('/')[2]
            ).toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div className='ml-3'>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Accordion>
  );
};

const PeopleAccordion = ({ revealPeople }: any) => {
  const { pathname } = useLocation();

  return (
    <Accordion toggle={revealPeople} maxheight='200px'>
      {peopleLinks.map((obj: any, i: number) => (
        <SideBarLink key={i} to={obj?.linkKey}>
          <LinkContainer
            active={(
              obj?.linkKey === pathname ||
              obj.pathMatch === pathname.split('/')[2]
            )
              .toString()
              .toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div className='ml-3'>{obj?.icon}</div>
            <div className='ml-3'>{obj?.textKey}</div>
          </LinkContainer>
        </SideBarLink>
      ))}
    </Accordion>
  );
};

const SideBar = () => {
  const { pathname } = useLocation();
  const [revealSelling, setRevealSelling] = useState(false);
  const [revealProceeds, setRevealProceeds] = useState(false);
  const [revealMicellaneous, setRevealMicellaneous] = useState(false);
  const [revealPeople, setRevealPeople] = useState(false);

  useEffect(() => {
    if (pathname === '/admin') {
      setRevealSelling(false);
      setRevealProceeds(false);
      setRevealMicellaneous(false);
      setRevealPeople(false);
    }
  }, [pathname]);

  return (
    <>
      <Container className='d-flex flex-column'>
        <Link to='/' style={{ marginInline: 'auto', marginBottom: '2rem' }}>
          <Image
            src={LogoDay}
            alt='LPDR'
            style={{ width: '130px', objectFit: 'cover' }}
          />
        </Link>
        <SideBarLink
          to='/admin'
          onClick={() => {
            setRevealSelling(false);
            setRevealProceeds(false);
            setRevealMicellaneous(false);
            setRevealPeople(false);
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
        <SideBarAccordionBtn
          onClick={() => {
            setRevealSelling(!revealSelling);
            setRevealProceeds(false);
            setRevealMicellaneous(false);
            setRevealPeople(false);
          }}
        >
          <LinkContainer
            active={revealSelling.toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div>
              <SellingIcon />
            </div>
            <div className='ml-3'>Selling</div>
          </LinkContainer>
        </SideBarAccordionBtn>
        <SellingAccordion revealSelling={revealSelling} />
        <SideBarAccordionBtn
          onClick={() => {
            setRevealProceeds(!revealProceeds);
            setRevealSelling(false);
            setRevealMicellaneous(false);
            setRevealPeople(false);
          }}
        >
          <LinkContainer
            active={revealProceeds.toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div>
              <ProceedsIcon />
            </div>
            <div className='ml-3'>Proceeds</div>
          </LinkContainer>
        </SideBarAccordionBtn>
        <ProceedsAccordion revealProceeds={revealProceeds} />
        <SideBarAccordionBtn
          onClick={() => {
            setRevealPeople(!revealPeople);
            setRevealSelling(false);
            setRevealProceeds(false);
            setRevealMicellaneous(false);
          }}
        >
          <LinkContainer
            active={revealPeople.toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div>
              <PeopleIcon />
            </div>
            <div className='ml-3'>People</div>
          </LinkContainer>
        </SideBarAccordionBtn>
        <PeopleAccordion revealPeople={revealPeople} />
        <SideBarAccordionBtn
          onClick={() => {
            setRevealMicellaneous(!revealMicellaneous);
            setRevealSelling(false);
            setRevealProceeds(false);
            setRevealPeople(false);
          }}
        >
          <LinkContainer
            active={revealMicellaneous.toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div>
              <MicellaneousIcon />
            </div>
            <div className='ml-3'>Micellaneous</div>
          </LinkContainer>
        </SideBarAccordionBtn>
        <MicellaneousAccordion revealMicellaneous={revealMicellaneous} />
      </Container>
    </>
  );
};

export default SideBar;
