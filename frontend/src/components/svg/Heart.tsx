import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const shootUp = keyframes`
0%, {
  transform: translateY(0) scale(0);
  z-index:-1;
}
14% {
  transform: translateY(-15px) scale(0.3);
  z-index:-1;
}
28% {
  transform: translateY(-30px) scale(0.6);
  z-index:-1;
}
42% {
  transform: translateY(-45px) scale(0.9);
  z-index:1;
  -webkit-filter: drop-shadow(0px 5px 2px rgb(0 0 0 / 0.4));
  filter: drop-shadow(0px 5px 2px rgb(0 0 0 / 0.4));
}
56% {
  transform: translateY(0) scale(1.5);
  z-index:1;
  -webkit-filter: drop-shadow(0px 10px 4px rgb(0 0 0 / 0.4));
  filter: drop-shadow(0px 10px 4px rgb(0 0 0 / 0.4));
}
70% {
  transform: translateY(0) scale(4.25);
  -webkit-filter: drop-shadow(0px 15px 6px rgb(0 0 0 / 0.4));
  filter: drop-shadow(0px 15px 6px rgb(0 0 0 / 0.4));
  z-index:1;
}
84% {
  transform: translateY(0) scale(10);
  z-index:1;
  -webkit-filter: drop-shadow(0px 20px 8px rgb(0 0 0 / 0.4));
  filter: drop-shadow(0px 20px 8px rgb(0 0 0 / 0.4));
}
100% {
  transform: scale(60);
  z-index:1;
  -webkit-filter: drop-shadow(0px 25px 10px rgb(0 0 0 / 0.4));
  filter: drop-shadow(0px 25px 10px rgb(0 0 0 / 0.4));
}
`;

const StyledHeart = styled.svg<{ anim: any }>`
  margin-bottom: -50px;
  z-index: -1;
  animation: ${({ anim }) =>
    anim
      ? css`
          ${shootUp} 2s ease-in forwards
        `
      : ''};
`;

const Heart = ({ anim }: any) => {
  return (
    <StyledHeart
      anim={anim}
      xmlns='http://www.w3.org/2000/svg'
      width='50px'
      height='50px'
      x='0px'
      y='0px'
      viewBox='0 0 206.333 206.333'
    >
      <path
        fill='#cb1515'
        d='M206.333,76.952c0,25.365-13.967,46.069-42.7,63.297c-36.253,21.737-54.063,47.905-54.239,48.167
	c-1.393,2.076-3.729,3.321-6.228,3.321c-2.497,0-4.83-1.243-6.223-3.314C96.671,188.02,78.66,161.81,42.7,140.249
	C13.967,123.021,0,102.316,0,76.952c0-30.228,19.701-62.354,56.211-62.354c24.457,0,39.282,10.829,46.956,18.941
	c7.674-8.113,22.499-18.941,46.956-18.941C186.633,14.597,206.333,46.724,206.333,76.952z'
      />
    </StyledHeart>
  );
};

export default Heart;
