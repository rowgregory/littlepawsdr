import styled from 'styled-components';

const DashboardContainer2024 = styled.div`
  width: 100%;
  background: #e8e8e5;
  min-height: 100vh;
  padding: 0px 24px 24px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 62px 62px 62px min-content 125px 125px min-content 285px 285px min-content min-content;
  gap: 18px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 62px 150px 150px 100px 150px 340px 260px;

  }
`;

const GrayIcon = styled.i`
  color: gray;
`;
const WhiteIcon = styled.i`
  color: #fff;
`;

export { DashboardContainer2024, GrayIcon, WhiteIcon };
