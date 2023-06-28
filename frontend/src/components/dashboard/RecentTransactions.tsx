import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Image, Spinner } from 'react-bootstrap';
import { Accordion } from '../styles/place-order/Styles';
import { Circles, UserInfoContainer, Wallet } from '../styles/DashboardStyles';
import { Text } from '../styles/Styles';
import OrdersIcon from '../svg/OrdersIcon';
import SettingsIcon from '../svg/SettingsIcon';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import Logout from '../svg/Logout';
import RecentTransactionItem from './RecentTransactionItem';
import UserAvatar from '../../components/assets/user-avatar.jpeg';
import {
  LinkContainer,
  SideBarAccordionBtn,
  SideBarLink,
} from './sidebar/styles';
import formatCurrency from '../../utils/formatCurrency';

const RecentTransactions = ({
  userInfo,
  loadingUserLogout,
  dashboardDetails,
  loading,
}: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [revealMyLinks, setRevealMyLinks] = useState(false);

  const viewTransaction = (item: any) => {
    history.push(`/admin/order/${item?._id}`);
  };

  return (
    <>
      <UserInfoContainer>
        <i className='fas fa-bell'></i>
        <div
          className='d-flex align-items-center'
          style={{ cursor: 'pointer' }}
        >
          <Text fontWeight={500} marginRight='10px'>
            {userInfo?.name}
          </Text>
          <Image
            onClick={() => setRevealMyLinks(!revealMyLinks)}
            src={userInfo?.avatar}
            roundedCircle
            width='40px'
            height='40px'
            style={{ objectFit: 'cover' }}
            alt={`Hey ${userInfo?.name}, how are you today? :)`}
            onError={(e: any) => (e.target.src = UserAvatar)}
          />
        </div>
      </UserInfoContainer>
      <div className='mb-4 mt-2'>
        <Accordion toggle={revealMyLinks} maxheight='190px'>
          <SideBarLink to='/my-orders'>
            <LinkContainer className='d-flex align-items-center px-3 py-3'>
              <OrdersIcon />
              <div className='ml-3'>My Orders</div>
            </LinkContainer>
          </SideBarLink>
          <SideBarLink to='/settings/profile'>
            <LinkContainer className='d-flex align-items-center px-3 py-3'>
              <SettingsIcon />
              <div className='ml-3'>Settings</div>
            </LinkContainer>
          </SideBarLink>
          <SideBarAccordionBtn onClick={() => dispatch(logout(userInfo))}>
            <LinkContainer className='d-flex align-items-center px-3 py-3'>
              <Logout />
              <div className='ml-3'>Sign{loadingUserLogout && 'ing'} Out</div>
            </LinkContainer>
          </SideBarAccordionBtn>
        </Accordion>
      </div>
      <Circles>
        <div className='circle circle-1'></div>
        <div className='circle circle-2'></div>
      </Circles>
      <Wallet>
        <div className='ring'></div>
        <Text color='#fff' marginBottom='0.5rem'>
          Wallet
        </Text>
        <Text color='#fff' fontSize='32px' fontWeight={400} letterSpacing='2px'>
          {loading ? (
            <Spinner animation='border' style={{ color: '#fff' }} />
          ) : (
            formatCurrency(Number(dashboardDetails?.walletTotal))
          )}
        </Text>
      </Wallet>
      <div className='d-flex align-items-baseline justify-content-between mb-4'>
        <Text fontWeight={500} fontSize='17px' color='#373737'>
          Recent Transactions
        </Text>
      </div>
      {dashboardDetails?.orders
        ?.map((item: any, i: number) => (
          <RecentTransactionItem
            viewTransaction={viewTransaction}
            item={item}
            key={i}
            loading={loading}
          />
        ))
        .filter((_: any, i: number) => i < 10)
        .reverse()}
    </>
  );
};

export default RecentTransactions;
