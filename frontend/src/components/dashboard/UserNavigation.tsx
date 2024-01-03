import { FC } from 'react';
import { Accordion } from '../styles/place-order/Styles';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Text } from '../styles/Styles';
import GearLoader from '../Loaders/Gear';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

export const DashboardAdminAvatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;
export const MobileWrapper = styled.div`
  display: block;
  @media screen and (min-width: 874px) {
    display: none;
  }
`;
export const DesktopWrapper = styled.div`
  display: none;
  @media screen and (min-width: 874px) {
    display: block;
  }
`;

export const DashboardLinkContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  flex-direction: column;
  width: 300px;
  border-radius: 8px;
  background-color: #fff;
  @media screen and (min-width: 874px) {
    background-color: #f6f9fe;
  }
`;

export const DashboardAdminLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  padding: 10px 14px;
  transition: 300ms;
  align-items: center;
  justify-content: end;
  i {
    color: #c4c4c4;
  }
  :hover {
    text-decoration: none;
    background: #ebf4ff;
    border-radius: 6px;
    i {
      color: #9761aa;
    }
  }
`;
export const DashboardAdminBtn = styled.div<{ loading: string }>`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 100%;
  padding: 10px 14px;
  transition: 300ms;
  align-items: center;
  justify-content: end;
  cursor: pointer;
  transform-origin: center;
  background: ${({ loading }) => (loading === 'true' ? '#ebf4ff' : '')};
  i {
    color: ${({ loading, theme }) =>
    loading === 'true' ? theme.colors.quinary : '#c4c4c4'};
  }
  :hover {
    text-decoration: none;
    background: #ebf4ff;
    border-radius: 6px;
    i {
      color: #9761aa;
    }
  }
`;

interface AdminLinkProps {
  showAdminLinks: boolean;
}

const UserNavigation: FC<AdminLinkProps> = ({ showAdminLinks }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const userInfo = state.userLogin.userInfo;
  const loadingUserLogout = state.userLogout.loading;

  return (
    <Accordion
      toggle={showAdminLinks}
      maxheight='135px'
      className='d-flex justify-content-end'
    >
      <DashboardLinkContainer>
        <DashboardAdminLink to='/my-orders'>
          <i className='fa-solid fa-boxes-packing'></i>
          <Text fontSize='15px' fontWeight={400}>
            My Orders
          </Text>
        </DashboardAdminLink>
        <DashboardAdminLink to='/settings/profile'>
          <i className='fa-solid fa-gears'></i>
          <Text fontSize='15px' fontWeight={400}>
            Settings
          </Text>
        </DashboardAdminLink>
        <DashboardAdminBtn
          loading={loadingUserLogout?.toString()}
          onClick={() => dispatch(logout(userInfo))}
        >
          <div>
            {loadingUserLogout ? (
              <GearLoader color='#926aa1' size='' />
            ) : (
              <i className='fa-solid fa-right-from-bracket'></i>
            )}
          </div>
          <Text fontSize='15px' fontWeight={400}>
            Sign{loadingUserLogout && 'ing'} Out{loadingUserLogout && '...'}
          </Text>
        </DashboardAdminBtn>
      </DashboardLinkContainer>
    </Accordion>
  );
};

export default UserNavigation;
