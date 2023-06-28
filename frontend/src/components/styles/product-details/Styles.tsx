import { Button, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';

export const PriceContainer = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: flex;
  }
`;

export const ProductDetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  margin-inline: auto;
  margin-top: 18px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 40% 30% 20%;
    justify-content: center;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    grid-template-columns: 50% 30% 20%;
    justify-content: center;
  }
`;

export const ProductPrice = styled.div`
  font-family: 'Roboto';
  font-size: 16px;
  color: ${({ theme }) => theme.cart.productDetails.price};
`;

export const SelectInputContainer = styled.div`
  position: relative;
  margin-right: 16px;
  display: flex;
  flex-direction: column;

  select {
    appearance: none;
    background-image: ${({ theme }) =>
      `url("data:image/svg+xml;utf8,<svg fill='${
        theme.mode === 'day' ? 'black' : 'white'
      }' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`} !important;
    background-repeat: no-repeat !important;
    background-position-x: 60px !important;
    background-position-y: 18px !important;
    padding: 24px 32px 16px 16px !important;
  }
  :hover {
    div {
      color: ${({ theme }) => theme.colors.quinary} !important;
    }
  }
`;

export const Quantity = styled.div`
  font-size: 10.4px;
  position: absolute;
  top: 9px;
  left: 16px;
  z-index: 6;
  color: ${({ theme }) => theme.text};
  :hover {
    color: ${({ theme }) => theme.colors.quinary} !important;
  }
`;

export const SelectInput = styled(Form.Control)<{ bg?: any; color?: any }>`
  width: 90px;
  height: 65px !important;
  border: none;
  cursor: pointer;
  background: ${({ bg }) => (bg ? bg : '')};
  border: 1px solid #ededed;
  font-size: 16px;
  color: ${({ theme, color }) => (color ? color : theme.text)} !important;
  :focus-visible {
    outline: none !important;
  }
  :hover {
    color: ${({ theme, color }) =>
      color ? color : theme.colors.quinary} !important;
  }
`;

export const ThirdColumnWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.input.border};
  height: fit-content;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  padding: 18px 14px;
`;

export const AddToCartBtn = styled(Button)`
  background: ${({ theme }) => theme.colors.yellow} !important;
  color: ${({ theme }) => theme.black};
  width: 100%;
  border-radius: 0.75rem;
  border: none;
  transition: 300ms;

  font-size: 0.9rem;
  outline: none;
  :hover {
    color: ${({ theme }) => theme.text};
    background: #f3ce13 !important;
    outline: none;
  }
  :focus,
  :active {
    outline: none;
    box-shadow: none;
    border: none;
  }
  :disabled {
    color: ${({ theme }) => theme.black};
  }
`;

export const CollapseOnMobile = styled(Col)`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: block;
  }
`;

export const HorizontalLine = styled.div<{
  margin?: string;
  width?: string;
  padding?: string;
}>`
  width: ${({ width }) => width ?? '100%'};
  padding: ${({ padding }) => padding ?? ''};
  border-bottom: 1px solid ${({ theme }) => theme.input.border};
  margin: ${({ margin }) => (margin ? margin : '1.875rem 0')};
`;

export const DetailsBtn = styled.div`
  color: ${({ theme }) => theme.text2};
  font-size: 0.9375rem;
  font-weight: bold;
`;

export const DetailsContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  padding: 2.5rem 1.875rem;
  margin-bottom: 5rem;
`;

export const PlusMinusBtn = styled.div<{ active: boolean }>`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme, active }) => (active ? `2px dashed #fff` : '')};
  i {
    color: ${({ theme }) => theme.text};
  }
`;

export const SizeContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const Size = styled.div<{ active?: boolean }>`
  height: 40px;
  width: 50px;
  border: 1px solid ${({ theme }) => theme.colors.quinary};
  color: ${({ theme, active }) =>
    active ? theme.white : theme.colors.quinary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ theme, active }) => (active ? theme.colors.quinary : '')};
  transition: 300ms;
  :hover {
    color: ${({ theme, active }) => theme.white};
    background: ${({ theme, active }) => (active ? '' : theme.colors.quinary)};
  }
`;

export const ReviewsAndRatingsContainer = styled.div`
  margin-top: 10rem;
  background: ${({ theme }) => theme.bg};

  .column {
    width: 100%;
    margin: 0 auto;
  }
`;
