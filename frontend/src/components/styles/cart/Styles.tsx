import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CartContainer = styled.div`
  background: #ecf0f1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const Container = styled.div<{ emptycart?: boolean }>`
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 16px 18px 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 48px 28px 0 28px;
    min-height: 100vh;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 48px 64px 0 64px;
    min-height: 100vh;
  }
`;

export const ProductName = styled(Link)`
  color: ${({ theme }) => theme.card.text};
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.card.text};
  }
`;

export const Divider = styled.div`
  height: 30px;
  width: 1px;
  background: #c4c4c4;
  margin: 0 30px 0 20px;
`;

export const CartItemContainer = styled.table`
  margin-bottom: 16px;
  tr {
    height: 120px;
    background: #e5e9ea;
    border-bottom: 16px solid #ecf0f1;

    .remove-cart-item {
      background: #ecf0f1;
    }

    i {
      color: #909292;
    }
  }
`;

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

export const CartBtn = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #858382;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  transition: 300ms;
  cursor: pointer;
  &.plus {
    margin-bottom: 4px;
  }

  :hover {
    filter: brightness(0.9);
  }
`;
