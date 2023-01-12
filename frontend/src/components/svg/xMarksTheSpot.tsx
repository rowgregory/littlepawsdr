import styled from 'styled-components';

const StyledX = styled.svg`
  transition: 1000ms;
  :hover {
    transform: rotate(360deg);
  }
  cursor: pointer;
`;

const Path = styled.path`
  fill: ${({ theme }) => (theme.mode === 'night' ? '#fff' : '#121212')};
`;

export const XMarksTheSpot = ({ close }: any) => (
  <StyledX
    onClick={() => close()}
    width='48px'
    height='48px'
    viewBox='0 0 256 256'
    id='Flat'
    xmlns='http://www.w3.org/2000/svg'
  >
    <Path d='M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z' />
  </StyledX>
);
