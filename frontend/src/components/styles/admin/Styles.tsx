import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #e8e8e5;
  min-height: 100vh;
  padding: 0px 24px 24px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 62px 62px 150px 150px auto;
  gap: 18px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 62px 150px auto;
  }
`;

export const GridItem = styled.div`
  background: #e8e8e5;
  min-height: 100vh;
  padding: 0px 24px 24px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 62px 150px 150px 150px 150px 150px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 62px 150px 150px 150px 150px 150px;
  }
`;

export const TableHead = styled.thead<{ bg?: string }>`
  font-size: 16px;
  tr {
    width: 100%;
    height: 45px;
    padding: 12px 30px;
    display: table-row;
    background: #d6d6d6;
    th {
      border: none !important;
      text-align: center;
      color: #888888;
      font-family: Rust;
    }
  }
`;

export const CreateLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Rust;
  font-size: 20px;
  border: none;
  height: 100%;
  width: 100%;
  transition: 300ms;
  color: #fff;
  border-radius: 0.75rem;
  text-decoration: none;
  :active {
    color: #fff;
  }
  :hover {
    color: #fff;
    text-decoration: none;
    svg {
      transform: rotate(360deg);
      transition: 4000ms;
    }
  }
  :focus {
    box-shadow: none;
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

export const CreateBtnV2 = styled.button<{ loading?: string }>`
  display: flex;
  flex-direction: column;
  background: transparent;
  justify-content: center;
  align-items: center;
  font-family: Rust;
  font-size: 20px;
  border: none;
  height: 100%;
  width: 100%;
  transition: 300ms;
  color: #fff;
  text-decoration: none;
  i {
    animation: ${({ loading }) =>
    loading === 'true'
      ? css`
            ${rotate} 2000ms linear infinite
          `
      : ``};
  }
  :active {
    color: #fff;
  }
  :hover {
    color: #fff;
    text-decoration: none;
    svg {
      transform: rotate(360deg);
      transition: 4000ms;
    }
  }
  :focus {
    box-shadow: none;
  }
`;

export const SearchInput = styled(Form.Control)`
  background: #eaeaea !important;
  border-radius: 20px !important;
  height: 37px !important;
  border: none !important;
  color: #a9a9a9 !important;
  font-family: Rust !important;
  z-index: 2;
  width: 100%;
  caret-color: ${({ theme }) => theme.colors.secondary};
  ::placeholder {
    color: #a9a9a9;
    font-family: Rust;
  }
  :focus {
    outline: none;
  }

  &:focus,
  &:active {
    &:-webkit-autofill {
      transition: background-color 5000s ease-in-out 0s;
      -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
      box-shadow: 0 0 0px 1000px transparent inset !important;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: #cbd7db;
    }
  }
`;

export const FormFile = styled(Form.File)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  font-weight: 300;
  transition: 300ms;
  padding-right: 8px;
  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #c4c4c4;
    margin-bottom: 0;
  }
`;

const BorderDance = keyframes`
  0% {
    background-position: 0px 0px, 100px 97px, 0px 100px, 97px 24px;
  }
  100% {
    background-position:212px 0px, 0px 97px, 0px 0px, 97px 100px;
  }
`;

export const UploadImageSquare = styled.div<{ uploading?: any }>`
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(90deg, #c4c4c4 50%, transparent 50%), linear-gradient(0deg, #c4c4c4 50%, transparent 50%),
    linear-gradient(0deg, #c4c4c4 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 16px 3px, 16px 3px, 3px 16px, 3px 16px;
  background-position: 0px 0px, 100px 97px, 0px 100px, 97px 24px;
  transition: background-position 10s;

  &.anim {
    animation: ${BorderDance} 15s infinite linear;
  }
`;

export const FormLabel = styled(Form.Label)`
  font-family: Rust;
  margin-bottom: 4px;
`;
export const FormGroup = styled(Form.Group)`
  font-family: Rust;
  width: 100%;
`;

export const FormControl = styled(Form.Control)`
  font-family: Rust !important;
  width: 100%;
  background: #d6d6d6 !important;
  border: none !important;
  margin-top: 0 !important;
  &:focus,
  &:active {
    outline: none;
  }
`;


export const TableContainer = styled.div`
  table {
    thead {
      tr {
        width: 100%;
        height: 45px;
        // padding: 12px 30px;
        display: table-row;
        background: #d6d6d6;
        th {
          text-align: center;
          border: none !important;
          color: #757575;
          font-family: Rust;
          vertical-align: middle !important;
        }
      }
    }
  }
  width: calc(100vw - 48px);
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: calc(100vw - 298px);
  }
`;

export const fadein = keyframes`
0% {  opacity: 0; border-bottom: 0;}
100% {  opacity: 1;  border-bottom: 1px solid #d6d6d6}
`;

export const Row = styled.tr<{ i: number }>`
  height: 60px;
  opacity: 0;
  animation: ${fadein} 300ms forwards ease-out;
  animation-delay: ${({ i }) => `${i * 90}ms`};

  :last-child {
    border-bottom: 0 !important;
  }

  td {
    // padding-block: 12px;
    color: #121212;
    text-align: center;
    border-top: none !important;
    vertical-align: middle;

    font-family: Rust !important;
    font-size: 16px;

    img {
      width: 30px;
      height: 30px;
    object-fit: cover;
    }
  }
`;

export const OrangeEditPen = styled.i`
  cursor: pointer;
  color: #fec723;
`;

export const RedDeleteTrash = styled.i`
  cursor: pointer;
  color: #cc0000;
`;

export const GreenViewBinoculars = styled.i`
  background: -webkit-gradient(linear, left top, left bottom, from(#a7d82f), to(#e8d830));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

export const BluePurpleGradientBtn = styled.i`
  background: -webkit-gradient(linear, left top, left bottom, from(#84c1e8), to(#ebc3ff));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: all 300ms;
  position: relative;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const slideright = keyframes`
0% {  transform: translate(0px)}
100% {  transform: translate(10px) }
`;

export const WelcomeWienerLink = styled(Link)`
font-size: 14px;
color: #504f4a;
font-family: Rust;
padding: 6px 0px;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
background: linear-gradient(263deg, rgba(157,253,255,1) 18%, rgba(233,198,253,1) 100%);
position: relative;
transition: 300ms;
:hover {
  text-decoration: none;
  color: #504f4a;
  i {
   animation: ${slideright} 300ms ease-out forwards;

  }
}
&:after {
  content: '';
  position: absolute;
  width: 33px;
  height: 33px;
  right: 0;
  top: 0;
  clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
  background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
}
`

export const StyledGoBackLink = styled.div`
display: flex;
align-items: center;
font-size: 14px;
padding-top: 16px;
padding-bottom: 8px;
a {
  color: #121212;
}
:hover {
  a {
    text-decoration: none;
  }
}
`

export const GoBackLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <StyledGoBackLink>
      <i className='fa-solid fa-angles-left mr-2'></i>
      <Link to={to}>{text}</Link>
    </StyledGoBackLink>
  );
};