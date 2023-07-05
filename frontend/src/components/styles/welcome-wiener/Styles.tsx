import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.aside`
  min-height: 100vh;
  max-width: 100%;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background: #fff;
  position: fixed;
  z-index: 5001;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: 300ms;
  padding: 16px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.2);
  transform: translateY(-1386px);
  &.move-down {
    transform: translateY(0px);
    transition: 300ms;
    transition-easing: linear;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 48px;
    min-height: 400px;
    max-height: 500px;
    justify-content: flex-start;
    align-items: center;
    transform: translateY(-700px);
    &.move-down {
      transform: translateY(0px);
      transition: 300ms;
      transition-easing: linear;
    }
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    max-width: 860px;
    height: auto;
  }
`;

export const ItemWrapper = styled.div`
  margin-right: 0px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex: 1 0 60%;
    margin-right: 48px;
  }
`;

export const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex: 1 0 40%;
    margin-right: 48px;
  }
`;

export const ContineShoppingBtn = styled(Link)`
  border: 2px solid #000;
  background: #fff;
  padding: 10px 16px;
  font-size: 12px;
  color: #000;
  width: 100%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  transition: 300ms;
  :hover {
    text-decoration: none;
    color: #fff;
    background: #000;
  }
`;

export const CheckoutNowBtn = styled(Link)`
  background: #000;
  color: #fff;
  padding: 10px 16px;
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  transition: 300ms;
  border: 2px solid #000;
  :hover {
    text-decoration: none;
    color: #000;
    background: #fff;
  }
`;
