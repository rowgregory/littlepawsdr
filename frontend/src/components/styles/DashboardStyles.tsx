import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export const DashboardContainer = styled.div`
  background: #f6f9fe;
  min-height: 100vh;
  margin: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  @media screen and (min-width: 875px) {
    flex-direction: row;
  }
`;

export const TopRow = styled.div`
  margin-bottom: 32px;
`;

export const MiddleRow = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;

export const WelcomeText = styled.div`
  color: #3b3b3c;
  font-size: 26px;
  padding: 16px 0 0 16px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    padding: 16px 0 0;
  }
`;
export const SubheaderText = styled.div`
  color: #3b3b3c;
  font-size: 12px;
  padding: 0 0 0 16px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    padding: 0;
  }
`;

export const WelcomeTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const ActionBtn = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.quinary};
  border-radius: 50%;
  transition: 300ms;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 501;
  height: 56px;
  width: 56px;

  :hover {
    i {
      transition: 300ms;
      transform: rotate(180deg);
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-right: 16px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: none;
  }

  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
`;

export const Middle = styled.div`
  width: 100%;
  padding: 0px;
  @media screen and (min-width: 875px) {
    width: calc(100vw - 365px);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 16px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 32px;
    width: calc(100vw - 670px) !important;
  }
`;

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 1rem;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    grid-template-columns: 1fr 250px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[5]}) {
    grid-template-columns: 1fr 300px;
  }
`;

export const DataSquareContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 0;
  width: 100%;
  grid-template-columns: 1fr;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1650px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const DataSquare = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.input.bg};
  border-radius: 8px;
  justify-content: space-between;
  height: 100%;
  padding: 15.2px 21.6px;
  min-width: 215px;
`;
export const DataSquareLink = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.input.bg};
  border-radius: 8px;
  justify-content: space-between;
  height: 100%;
  padding: 15.2px 21.6px;
  min-width: 215px;
  :hover {
    text-decoration: none;
    filter: brightness(0.98);
  }
`;

export const DataSquareTitle = styled.div`
  font-size: 13.6px;
  color: #bebebe;
  margin-left: 1rem;
`;

export const LineChartContainer = styled.div`
  margin: 0;
  min-height: 230px;
  height: 100%;
  max-height: 230px;
`;

export const TopSellingProductsContainer = styled.div`
  padding: 12px;
  background: #fff;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  @media screen and (min-width: 1408px) {
    padding: 24px;
    margin-bottom: 0;
  }
`;

export const TableBody = styled.tbody`
  tr {
    td {
      border: none;
      color: #c4c4c4;
      font-size: 13px;
      vertical-align: inherit;
      cursor: normal;
    }
  }
`;

export const TotalSalesContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 24px;
  }
`;

export const RecentTransactions = styled.div`
  background: #fff;
  right: 0;
  padding: 32px 32px 24px;
  min-width: 350px !important;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
    top: -20px;
    left: -20px;
    animation: ${float} 6s ease-in-out infinite;
  }
  .circle-2 {
    height: 150px;
    width: 150px;
    top: 31px;
    left: 160px;
    animation: ${float} 6s ease-in-out infinite;
    animation-delay: 2000ms;
  }
`;

export const RecentTransactionItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  :hover {
    background: #f6f9fe;
    cursor: pointer;
  }
`;

export const ItemName = styled.div`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  span {
    font-size: 13px;
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  background: #fff;
  right: 0;
  padding: 32px 32px 24px;
  min-width: 350px !important;
`;
