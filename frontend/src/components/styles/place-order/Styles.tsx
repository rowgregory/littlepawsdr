import { Col, Image, Row } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled.div`
  margin-inline: auto;
  width: 100%;
  max-width: ${({ theme }) => theme.breakpoints[3]};
  background: ${({ theme }) => theme.bg};
  padding-top: 28px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding-top: 120px;
  }
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
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: block;
    position: absolute;
    top: 5px;
    right: 0;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    width: 291px;
    font-size: 28px;
  }
`;

export const LogoCheckout = styled(Image)`
  width: 130px;
  padding-top: 16px;
  margin-inline: auto;
  position: relative;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    position: absolute;
    left: 0px;
  }
`;

export const LeftRail = styled(Col)`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  margin-bottom: 2rem;
  margin-right: 0;
  padding: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 1rem;
    border: 1px solid #ededed;
    margin-right: 1.5rem;
    border-radius: 0.5rem;
  }
`;

export const LeftRailSectionTitle = styled.div`
  font-size: 22px;
  margin-bottom: 24px;
  background: ${({ theme }) => theme.secondaryBg};
  padding: 14px 18px;
  color: ${({ theme }) => theme.text};
  border-top: 0.75px solid #e1e1e1;
  border-bottom: 0.75px solid #e1e1e1;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border: 0;
  }
`;

export const LeftRailContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const RightRailContainer = styled(Col)`
  padding: 16px 0;
  width: 100%;
  border-radius: 0.5rem;
  height: fit-content;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    border: 1px solid #ededed;
    padding: 1rem;
  }
`;

export const Accordion = styled.div<{ toggle: boolean; maxheight?: string }>`
  max-height: ${({ toggle, maxheight }) => (toggle ? maxheight : '0px')};
  overflow: hidden;
  transition: max-height 300ms ease-out;
`;

export const AccordionX = styled.div<{ toggle: boolean; maxwidth?: string }>`
  max-width: ${({ toggle, maxwidth }) => (toggle ? maxwidth : '0px')};
  overflow: hidden;
  transition: max-width 300ms ease-out;
`;

export const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
`;

export const QuestionContainer = styled.div`
  background: #ededed;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;
export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-inline: 16px;
`;

export const PaypalBtnContainer = styled.div`
  padding-inline: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding-inline: 0px;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-inline: 16px;
`;
