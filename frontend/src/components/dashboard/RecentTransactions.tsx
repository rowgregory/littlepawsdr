import { Spinner } from 'react-bootstrap';
import { Text } from '../styles/Styles';
import RecentTransactionItem from './RecentTransactionItem';
import formatCurrency from '../../utils/formatCurrency';
import UserNavigation, {
  DashboardAdminAvatar,
  DesktopWrapper,
} from './UserNavigation';
import styled, { keyframes } from 'styled-components';
import { HomeIcon } from '../styles/DashboardStyles';

export const Wallet = styled.div`
  padding: 24px;
  margin-bottom: 32px;
  height: 160px;
  width: 300px;
  position: relative;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  .ring {
    position: absolute;
    height: 400px;
    width: 400px;
    border-radius: 50%;
    background: transparent;
    border: 30px solid rgb(255 255 255/0.1);
    bottom: -155px;
    left: 198px;
    box-sizing: border-box;
  }
`;

const float = keyframes`
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-15px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
`;

export const Circles = styled.div`
  position: absolute;
  .circle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(#9761aa, #a57fb3);
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
  }

  .circle-1 {
    height: 190px;
    width: 190px;
    top: -97px;
    right: -21px;
    animation: ${float} 6s ease-in-out infinite;
  }
  .circle-2 {
    height: 150px;
    width: 150px;
    top: -78px;
    animation: ${float} 6s ease-in-out infinite;
    animation-delay: 2000ms;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    .circle-1 {
      height: 190px;
      width: 190px;
      top: -4px;
      right: -21px;
      animation: ${float} 6s ease-in-out infinite;
    }
    .circle-2 {
      height: 150px;
      width: 150px;
      top: 31px;
      animation: ${float} 6s ease-in-out infinite;
      animation-delay: 2000ms;
    }
  }
`;

export const WalletWrapper = styled.div`
  margin-top: 32px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    justify-content: start;
  }
`;

const RecentTransactions = ({
  userInfo,
  dashboardDetails,
  loading,
  setShowAdminLinks,
  showAdminLinks,
}: any) => {
  return (
    <>
      <DesktopWrapper>
        <div className='d-flex justify-content-between mb-2'>
          <HomeIcon to='/'>
            <i className='fa-solid fa-house-chimney'></i>
          </HomeIcon>
          <DashboardAdminAvatar
            onClick={() => setShowAdminLinks(!showAdminLinks)}
            src={userInfo?.avatar}
            alt={`Hey ${userInfo?.name}! We appreciate you! Love from LPDR`}
          />
        </div>
        <UserNavigation showAdminLinks={showAdminLinks} />
      </DesktopWrapper>
      <WalletWrapper>
        <Circles>
          <div className='circle circle-1'></div>
          <div className='circle circle-2'></div>
        </Circles>
        <Wallet>
          <div className='ring'></div>
          <Text color='#fff' marginBottom='0.5rem'>
            Wallet
          </Text>
          <Text
            color='#fff'
            fontSize='32px'
            fontWeight={400}
            letterSpacing='2px'
          >
            {loading ? (
              <Spinner animation='border' style={{ color: '#fff' }} />
            ) : (
              formatCurrency(Number(dashboardDetails?.walletTotal))
            )}
          </Text>
        </Wallet>
      </WalletWrapper>
      <div className='d-flex align-items-baseline justify-content-between mb-4 mt-5'>
        <Text fontWeight={500} fontSize='14px' color='#373737'>
          10 MOST RECENT TRANSACTIONS
        </Text>
      </div>
      {dashboardDetails?.orders
        ?.slice()
        ?.reverse()
        ?.map((item: any, i: number) => (
          <RecentTransactionItem item={item} key={i} loading={loading} />
        ))
        .filter((_: any, i: number) => i < 10)}
    </>
  );
};

export default RecentTransactions;
