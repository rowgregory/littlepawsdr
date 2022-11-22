import { Row } from 'react-bootstrap';
import styled from 'styled-components';

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

export const TopRow = styled(Row)`
  margin-bottom: 2rem;
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
`;

export const ActionBtn = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  color: ${({ theme }) => theme.white};
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.quinary};
  margin-right: 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.separator};
  transition: 300ms;
  display: flex;
  align-items: end;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin-right: 16px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    display: none;
  }
  :hover {
    filter: brightness(1.3);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
`;

export const Middle = styled.div`
  padding: 32px;
  width: 100%;
  @media screen and (min-width: 875px) {
    width: calc(100vw - 365px);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  padding: 0;
  width: 100%;
  @media screen and (min-width: 1650px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const DataSquare = styled.div<{ loading?: string }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.input.bg};
  border-radius: 8px;
  justify-content: space-between;
  height: 100%;
  padding: 15.2px 21.6px;
  min-width: 215px;
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
`;

export const TopSellingProductsContainer = styled.div`
  padding: 24px;
  background: #fff;
  width: 100%;
  border-radius: 8px;
`;

export const TableBody = styled.tbody`
  tr {
    td {
      border: none;
      color: #c4c4c4;
      font-size: 13px;
      vertical-align: inherit;
      cursor: normal;
      &.dashboard {
        padding: 1rem 0.75rem;
      }
    }
  }
`;

export const TopSellingProducts = styled.div``;
export const TotalSalesContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 100%;
`;

export const RecentTransactions = styled.div`
  background: #fff;
  right: 0;
  padding: 32px 32px 24px;
  min-width: 350px !important;
  /* display: none; */
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    /* min-width: 384px !important; */
    /* display: block; */
  }
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

export const Circles = styled.div`
  position: absolute;

  .circle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(#9761aa, #a57fb3);
  }

  .circle-1 {
    height: 190px;
    width: 190px;
    top: -20px;
    left: -20px;
  }
  .circle-2 {
    height: 150px;
    width: 150px;
    top: 31px;
    left: 160px;
  }
`;

export const RecentTransactionItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* margin-bottom: 24px; */
  padding: 15px;
  :hover {
    background: #f6f9fe;
    cursor: pointer;
  }
`;

export const ItemName = styled.div`
  font-weight: 400;
  width: 155px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DonatorInitials = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.colors.quinary};
  color: ${({ theme }) => theme.colors.quinary};
  font-size: 20px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
