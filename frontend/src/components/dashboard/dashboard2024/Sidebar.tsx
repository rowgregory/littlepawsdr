import styled from 'styled-components';
import { Text } from '../../styles/Styles';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import StatusIndicator from './StatusIndicator';
import { NavLink } from 'react-router-dom';
import { SET_BUBBLE_LINKS } from '../../../constants/dashboardConstants';
import SplitTextToChars from '../../../utils/SplitTextToChars';

const Container = styled.div`
  background: #171f2a;
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  section {
    width: 100%;
    :nth-child(2) {
      border-top: 0.5px solid #fff;
    }
  }
`;
const LogoText = styled(NavLink)`
  background: rgb(116,209,69);
  background: linear-gradient(229deg, rgba(116,209,69,1) 66%, rgba(163,216,47,1) 100%);
  color: #fff;
  font-size: 30px;
  letter-spacing: 1px;
  font-weight={500}
  text-align: center;
  font-family: Rust;
  padding-block: 16px;
  line-height: 1;
  width: 100%;
:hover {
  color: #fff;
  text-decoration: none;
}
  &:after {
    content: '';
    position: absolute;
    width: 62px;
    height: 62px;
    top: 0; right: 0;
    clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
    background: rgb(183,217,43);
    background: linear-gradient(86deg, rgba(183,217,43,1) 66%, rgba(183,214,49,1) 100%);
}
`;

const AdminAvatar = styled(Image)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
  margin-inline: auto;
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

export const Link = styled(NavLink) <{ active?: string }>`
  padding: 10px 20px;
  background: ${({ active }) =>
    active === 'true' ? 'linear-gradient(90deg, rgba(156,254,253,1) 0%, rgba(207,253,251,1) 100%)' : ''};
  text-decoration: none;
  display: grid;
  grid-template-columns: 0.9fr 3fr;
  align-items: center;

  div,
  i {
    color: ${({ active }) => (active === 'true' ? '#504f4a' : '#fff')};
  }

  :hover {
    text-decoration: none;
    background: linear-gradient(90deg, rgba(156, 254, 253, 1) 0%, rgba(207, 253, 251, 1) 100%);
    div,
    i {
      color: #504f4a;
    }
    &:after {
      content: '';
      position: absolute;
      width: 47px;
      height: 47px;
      right: 0;
      clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
      background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
    }
  }

  &:after {
    content: ${({ active }) => (active === 'true' ? "''" : 'none')};
    position: absolute;
    width: 47px;
    height: 47px;
    right: 0;
    clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
    background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
  }
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
  }
`;

export const sidebarLinkData = (link: any) => [
  {
    active: link.dashboard,
    linkKey: '/admin',
    icon: 'fa-solid fa-gauge-high fa-xl mr-2',
    textKey: 'Dashboard',
  },
  {
    active: link.orders,
    linkKey: '/admin/orders',
    icon: 'fa-solid fa-cube fa-xl mr-2',
    textKey: 'Orders',
  },
  {
    active: link.actionHistory,
    linkKey: '/admin/action-history',
    icon: 'fa-solid fa-timeline fa-xl mr-2',
    textKey: 'Action History',
  },
  {
    active: link.selling,
    linkKey: '/admin/selling',
    icon: 'fa-solid fa-store fa-xl mr-2',
    textKey: 'Virtual Store',
  },
  {
    active: link.adoptionApplicationFees,
    linkKey: '/admin/adoption-application-fee/list',
    icon: 'fa-solid fa-hand-holding-dollar fa-xl mr-2',
    textKey: 'Adoption Application Fees',
  },
  {
    active: link.archive,
    linkKey: '/admin/archive',
    icon: 'fa-solid fa-robot fa-xl mr-2',
    textKey: 'Archive',
  },
  {
    active: link.people,
    icon: 'fa-solid fa-people-group fa-xl mr-2',
    textKey: 'People',
    bubbleLink: 'people',
  },
  {
    active: link.misc,
    icon: 'fa-brands fa-discord fa-xl mr-2',
    textKey: 'Miscellaneous',
    bubbleLink: 'misc',
  },
];

const convertToStr = (str: boolean) => str.toString();

export const activeLink = (path: string, bubbleLink?: string) => ({
  dashboard: convertToStr(path === '/admin'),
  orders: convertToStr(path === '/admin/orders'),
  archive: convertToStr(path === '/admin/archive'),
  actionHistory: convertToStr(path === '/admin/action-history'),
  selling: convertToStr(path === '/admin/selling'),
  adoptionApplicationFees: convertToStr(path === '/admin/adoption-application-fee/list'),
  people: convertToStr(bubbleLink === 'people'),
  misc: convertToStr(bubbleLink === 'misc'),
});

const Sidebar = () => {
  const { pathname: path } = useLocation();
  const state = useSelector((state: any) => state);
  const userInfo = state.userLogin.userInfo;
  const dispatch = useDispatch();
  const bubbleLink = state.dashboard.bubbleLink;

  return (
    <Container>
      <LogoText to='/'>LITTLE PAWS</LogoText>
      <LinkContainer>
        <section style={{ position: 'relative' }}>
          <AdminAvatar
            src={userInfo?.avatar}
            alt={`Hey ${userInfo?.name}! We appreciate you! Love from LPDR`}
          />
          <StatusIndicator />
          <SplitTextToChars
            text={userInfo?.name}
            color='#fff'
            fontFamily='Rust'
            fontSize='26px'
            justifyContent='center'
            mt='10px'
          />
          <div className='mt-4'>
            {sidebarLinkData(activeLink(path, bubbleLink)).map((obj: any, i: number) => (
              <Link
                key={i}
                active={obj.active}
                to={obj.linkKey}
                onClick={() => {
                  if (obj.bubbleLink === 'people') {
                    dispatch({ type: SET_BUBBLE_LINKS, payload: bubbleLink === 'people' ? '' : 'people' });
                  } else if (obj.bubbleLink === 'misc') {
                    dispatch({ type: SET_BUBBLE_LINKS, payload: bubbleLink === 'misc' ? '' : 'misc' });
                  }
                }}
              >
                <i className={obj.icon}></i>
                <Text fontSize='18px' fontFamily='Rust' fontWeight={400}>
                  {obj.textKey}
                </Text>
              </Link>
            ))}
          </div>
        </section>
        <section className='mt-5'>
          <Link to='/sign-out'>
            <i className='fa-solid fa-power-off fa-xl mr-2'></i>
            <Text fontSize='18px' fontFamily='Rust' fontWeight={400}>
              Sign Out
            </Text>
          </Link>
        </section>
      </LinkContainer>
    </Container>
  );
};

export default Sidebar;
