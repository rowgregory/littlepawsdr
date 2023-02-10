import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
    to {
      background-position: 200% center;
    }
`;

const StyledText = styled.div<{
  gradient: any;
  fontSize: any;
  fontFamily: any;
}>`
  background: ${({ gradient }) => `-webkit-linear-gradient(left, ${gradient})`};
  background: ${({ gradient }) => `-o-linear-gradient(right, ${gradient})`};
  background: ${({ gradient }) => `-moz-linear-gradient(right, ${gradient})`};
  background: ${({ gradient }) => `linear-gradient(to right, ${gradient})`};
  font-size: ${({ fontSize }) => fontSize ?? ''};
  font-family: ${({ fontFamily }) => fontFamily ?? '50px'};
  filter: drop-shadow(0 35px 10px rgb(0 0 0 / 0.4));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: ${shine} 10s linear infinite;
`;

const GradientText: FC<{
  text: any;
  gradient: any;
  fontSize?: any;
  fontFamily?: any;
}> = ({ text, gradient, fontSize, fontFamily }: any) => {
  return (
    <StyledText gradient={gradient} fontSize={fontSize} fontFamily={fontFamily}>
      {text}
    </StyledText>
  );
};

export default GradientText;
