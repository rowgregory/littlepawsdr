import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

export const SelectInputContainer = styled.div`
  position: relative;
  margin-right: 16px;
  display: flex;
  flex-direction: column;

  select {
    appearance: none;
    background-image: ${({ theme }) =>
    `url("data:image/svg+xml;utf8,<svg fill='${theme.mode === 'day' ? 'black' : 'white'
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

export const SelectSizeContainer = styled.div`
  position: relative;
  margin-right: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  width: 84px;
  border: 0;
  select {
    appearance: none;
    background-image: ${({ theme }) =>
    `url("data:image/svg+xml;utf8,<svg fill='${theme.mode === 'day' ? 'black' : 'white'
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

export const SelectInput = styled(Form.Control) <{ bg?: any; color?: any }>`
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
    color: ${({ theme, color }) => (color ? color : theme.colors.quinary)} !important;
  }
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
