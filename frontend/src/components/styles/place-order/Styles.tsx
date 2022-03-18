import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 5rem auto 0;
  width: 100%;
  background: ${({ theme }) => theme.bg};
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .left-rail {
    order: 2;
  }
  .right-rail {
    order: 1;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    flex-direction: row;
    max-width: 1300px;
    margin: 0 auto 10rem;

    .left-rail {
      order: 1;
    }
    .right-rail {
      order: 2;
    }
  }
`;

export const LeftRail = styled(Col)`
  background: ${({ theme }) => theme.secondaryBg};
  padding: 1rem;

  margin-bottom: 10rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 3rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 4rem 5rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    padding: 4rem 9rem;
  }
`;

export const LeftRailSectionTitle = styled.div`
  font-weight: bold;
  font-size: 1.35rem;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.bg};
  padding: 0.875rem 1.125rem;
  color: ${({ theme }) => theme.text};
`;

export const LeftRailContainer = styled.div`
  max-width: 510px;
  width: 100%;
  margin: 0 auto 3rem;
`;

export const EnterAPaswordBtn = styled.div`
  color: ${({ theme }) => theme.colors.blue04};
  font-size: 0.8rem;
  cursor: pointer;
  margin-bottom: 1rem;
  :hover {
    filter: brightness(1.15);
  }
`;

export const RightRail = styled(Col)`
  margin: 0 auto;
  width: 100%;
  margin-bottom: 3rem;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    max-width: 300px;
  }
`;
