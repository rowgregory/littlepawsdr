import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Image, Spinner } from 'react-bootstrap';
import ProductsIcon from '../svg/ProductsIcon';
import EcardIcon from '../svg/EcardIcon';
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

const myLinks = [
  {
    textKey: 'Welcome Wiener Donations',
    linkKey: '/my-orders',
    icon: <ProductsIcon />,
    state: 'products',
  },
  {
    textKey: 'Ecards',
    linkKey: '/my-orders',
    icon: <EcardIcon />,
    state: 'ecards',
  },
];

const PurchasesAccordion = ({ revealPurchases }: any) => {
  const { pathname } = useLocation();

  return (
    <Accordion toggle={revealPurchases} maxheight='130px'>
      {myLinks.map((obj: any, i: number) => (
        <SideBarLink key={i} to={{ pathname: obj?.linkKey, state: obj?.state }}>
          <LinkContainer
            active={(obj?.linkKey === pathname).toString()}
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

const RecentTransactions = ({
  userInfo,
  loadingUserLogout,
  dashboardDetails,
  loading,
}: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [revealMyLinks, setRevealMyLinks] = useState(false);
  const [revealPurchases, setRevealPurchases] = useState(false);

  const viewTransaction = (item: any) => {
    if (item?.orderItems) {
      history.push(`/welcome-wiener/order/${item?._id}`);
    } else {
      history.push({
        pathname: `/admin/order/ecard`,
        state: item,
      });
    }
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
        <Accordion
          toggle={revealMyLinks}
          maxheight={revealPurchases ? '320px' : '190px'}
        >
          <SideBarAccordionBtn
            onClick={() => {
              setRevealPurchases(!revealPurchases);
            }}
          >
            <LinkContainer
              active={revealPurchases.toString()}
              className='d-flex align-items-center'
            >
              <OrdersIcon />
              <div className='ml-3'>Purchases</div>
            </LinkContainer>
          </SideBarAccordionBtn>
          <PurchasesAccordion revealPurchases={revealPurchases} />
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
            formatCurrency(dashboardDetails?.walletTotal)
          )}
        </Text>
      </Wallet>
      <div className='d-flex align-items-baseline justify-content-between mb-4'>
        <Text fontWeight={500} fontSize='17px' color='#373737'>
          Recent Transactions
        </Text>
      </div>
      {dashboardDetails?.total
        ?.map((item: any, i: number) => (
          <RecentTransactionItem
            viewTransaction={viewTransaction}
            item={item}
            key={i}
            loading={loading}
          />
        ))
        .filter((_: any, i: number) => i < 10)}
    </>
  );
};

export default RecentTransactions;
