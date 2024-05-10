import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const CheckoutBtnColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #2e2e2e;
  justify-content: space-between;
  box-shadow: -15px -15px 40px 3px rgba(0, 0, 0, 0.35);
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    height: 100vh;
    width: 275px;
    min-width: 275px !important;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    height: 100vh;
    min-width: 350px !important;
    width: 350px;
    margin-top: 0;
  }
`;

export const CheckoutBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.quinary};
  color: #fff;
  min-height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  bos-shadow: none;
  border: 0;
  transition: 300ms;
  bottom: 0;
  :disabled {
    pointer-events: none;
    background: ${({ theme }) => theme.colors.quinary};
  }
  :hover {
    background: ${({ theme }) => theme.colors.quinary};
    text-decoration: none;
    color: #fff;
    letter-spacing: 3px;
  }
`;

export const SecondSubTotal = styled.div`
  width: 100%;
  padding: 32px 16px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 100px 40px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 100px 60px;
  }
`;
