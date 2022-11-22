import { Col, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled.div`
  margin-inline: auto;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  background: ${({ theme }) => theme.bg};
  padding-top: 64px;
`;

export const SubContainer = styled(Row)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  .left-rail {
    order: 2;
  }
  .right-rail {
    order: 1;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    flex-direction: row;

    .left-rail {
      order: 1;
    }
    .right-rail {
      order: 2;
    }
  }
`;

export const Checkout = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  width: 291px;
`;

export const LogoCheckout = styled(Image)`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 76px;
`;

export const LeftRail = styled(Col)`
  background: ${({ theme }) => theme.bg};
  padding: 1rem;
  width: 100%;
  border: 1px solid #ededed;
  margin-bottom: 2rem;
  margin-right: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin-right: 1.5rem;
    border-radius: 0.5rem;
  }
`;

export const LeftRailSectionTitle = styled.div`
  font-weight: bold;
  font-size: 1.35rem;
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.secondaryBg};
  padding: 0.875rem 1.125rem;
  color: ${({ theme }) => theme.text};
`;

export const LeftRailContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const RightRail = styled(Col)`
  padding: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  height: fit-content;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border: 1px solid #ededed;
  }
`;

export const Accordion = styled.div<{ toggle: boolean; maxheight?: string }>`
  max-height: ${({ toggle, maxheight }) => (toggle ? maxheight : '0px')};
  overflow: hidden;
  transition: max-height 300ms ease-out;
`;

export const QuestionContainer = styled.div`
  background: #ededed;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;
