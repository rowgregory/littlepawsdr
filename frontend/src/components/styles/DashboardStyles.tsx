import { Link } from 'react-router-dom';
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

export const HomeIcon = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.header.link.avatarbg};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #121212;
  :hover {
    color: #121212;
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

export const NameText = styled.div`
  color: #3b3b3c;
  font-size: 26px;
  padding: 0 0 0 8px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 16px 0 0 0;
  }
`;

export const GoBackAndTitleWrapper = styled.div`
  display: flex;
  align-itmes: center;
  margin-bottom: 24px;
`;

export const WelcomeText = styled.div`
  color: #3b3b3c;
  font-size: 26px;
`;
export const SubheaderText = styled.div`
  color: #3b3b3c;
  font-size: 12px;
  padding: 0 0 0 8px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    padding: 0 8px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
  }
`;

export const WelcomeTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const Middle = styled.div`
  width: 100%;
  padding: 0px;
  @media screen and (min-width: 875px) {
    width: calc(100vw - 350px);
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 16px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 32px;
    width: calc(100vw - 635px) !important;
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

export const LineChartContainer = styled.div`
  margin: 0;
  min-height: 230px;
  height: 100%;
  max-height: 230px;
`;

export const TotalSalesContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  overflow: hidden;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 16px;
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
  padding: 32px 24px 24px;
  width: 100%;
  @media screen and (min-width: 875px) {
    width: 350px;
  }
`;
