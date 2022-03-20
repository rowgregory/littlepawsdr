import { Button, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';

export const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem auto 0;
  max-width: 100rem;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: flex;
    flex-direction: row;
  }
`;

export const ProductPrice = styled.div`
  font-family: 'Roboto';
  font-size: 1rem;
  color: ${({ theme }) => theme.cart.productDetails.price};
`;

export const SelectInputContainer = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.border};
  margin-right: 1rem;
  width: 8.9375rem;
  display: flex;
  flex-direction: column;

  select {
    appearance: none;
    background: transparent;
    background-image: ${({ theme }) =>
      `url("data:image/svg+xml;utf8,<svg fill='${
        theme.mode === 'day' ? 'black' : 'white'
      }' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`} !important;
    background-repeat: no-repeat !important;
    background-position-x: 83% !important;
    background-position-y: 18px !important;
    padding: 1.5rem 2rem 1rem 1rem !important;
  }
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.purple05};

    color: ${({ theme }) => theme.colors.purple05};
  }
`;

export const Quantity = styled.div`
  font-size: 0.65rem;
  position: absolute;
  top: 9px;
  left: 16px;
  z-index: 6;
`;

export const SelectInput = styled(Form.Control)`
  width: 100%;
  border: none;
  background: none;
  height: 3.75rem !important;
  cursor: pointer;
  margin: 0 auto !important;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  :focus-visible {
    outline: none !important;
  }
  border: none !important;
`;

export const AddToCartBtn = styled(Button)`
  background: ${({ theme }) => theme.cart.productDetails.addToCartBtn.bg};
  width: inherit;
  border-radius: 0;
  border: 1px solid ${({ theme }) => theme.cart.productDetails.addToCartBtn.bg};
  color: #fff;
  font-family: 'Roboto';
  transition: 300ms;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  :hover {
    background: ${({ theme }) => theme.cart.productDetails.addToCartBtn.bg};
    border: 1px solid
      ${({ theme }) => theme.cart.productDetails.addToCartBtn.bg};
    filter: brightness(1.2);
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
  border-bottom: 1px solid ${({ theme }) => theme.separator};
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
    color: #fff;
  }
`;

export const WriteAReviewBtn = styled.div`
  width: 100%;
  margin: 0 auto 10rem;
  max-width: 22.5rem;
  height: 3.125rem;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 300ms;
  border: 1px solid ${({ theme }) => theme.border};
  :hover {
    background: ${({ theme }) => theme.colors.blue04};
    border: 1px solid ${({ theme }) => theme.colors.blue04};
    filter: brightness(1.1);
    color: #fff;
  }
`;

export const SizeContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const Size = styled.div<{ active: boolean }>`
  height: 40px;
  width: 50px;
  border: 1px solid
    ${({ theme, active }) => (active ? theme.colors.quaternary : theme.border)};
  color: ${({ theme, active }) =>
    active ? theme.colors.quaternary : theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ theme, active }) => (active ? theme.colors.blue04 : '')};
  transition: 300ms;
  :hover {
    color: #fff;
    border: 1px solid ${({ theme }) => theme.colors.blue04};
    background: ${({ theme }) => theme.colors.blue04};
  }
`;

export const ReviewsAndRatingsContainer = styled.div`
  margin-top: 10rem;
  background: ${({ theme }) => theme.bg};

  .column {
    max-width: 100rem;
    width: 100%;
    margin: 0 auto;
  }
`;
