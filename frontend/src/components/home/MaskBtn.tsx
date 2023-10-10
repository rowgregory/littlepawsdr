import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

interface MixinsProps {
  maskUrl: string;
  x1: string;
  y1: string;
  bor: string;
  col: string;
}

const mixins: MixinsProps = {
  maskUrl:
    'https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png',
  x1: '7100%',
  y1: '100%',
  bor: 'none',
  col: '#fff',
};

const ani = keyframes`
 from {
  -webkit-mask-position: 100% 0;
  mask-position: 100% 0;
 }

 to {
  -webkit-mask-position: 0 0;
  mask-position: 0 0;
 }
`;
const ani2 = keyframes`
  from {
  -webkit-mask-position: 0 0;
  mask-position: 0 0;
 }

 to {
  -webkit-mask-position: 100% 0;
  mask-position: 100% 0;
 }
`;

const Container = styled(Link)<{ linkkey: string }>`
  position: relative;
  width: fit-content;
  overflow: hidden;
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  padding: 16px 32px;
  border: 1px solid
    ${({ theme, linkkey }) =>
      linkkey === '/merch' ? '#d89253' : theme.colors.quinary};
  box-sizing: border-box;
  :hover {
    text-decoration: none;
  }

  span {
    color: ${({ theme, linkkey }) =>
      linkkey === '/merch' ? '#d89253' : theme.colors.quinary};
    text-align: center;
    width: auto;
    font-weight: 300;
    font-size: 11px;
    overflow: hidden;
    font-weight: bold;
  }

  button {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    font-weight: 300;
    font-size: 11px;
    letter-spacing: 1px;
    font-weight: bold;
    background-color: ${({ theme, linkkey }) =>
      linkkey === '/merch' ? '#d89253' : theme.colors.quinary};
    -webkit-mask: url(${mixins.maskUrl});
    mask: url(${mixins.maskUrl});
    -webkit-mask-size: ${mixins.x1} ${mixins.y1};
    mask-size: ${mixins.x1} ${mixins.y1};
    color: ${mixins.col};
    cursor: pointer;
    -webkit-animation: ani2 0.7s steps(70) forwards;
    animation: ${ani2} 0.7s steps(70) forwards;
    border: none;
    &:hover {
      -webkit-animation: ani 0.7s steps(70) forwards;
      animation: ${ani} 0.7s steps(70) forwards;
    }
  }
`;

const MaskBtn = ({
  linkKey,
  textKey,
}: {
  linkKey: string;
  textKey: string;
}) => {
  return (
    <Container to={linkKey} linkkey={linkKey}>
      <span>{textKey}</span>
      <button>{textKey}</button>
    </Container>
  );
};

export default MaskBtn;
