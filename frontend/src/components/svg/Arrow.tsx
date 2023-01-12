import styled from 'styled-components';

const StyledArrow = styled.svg<{ rotate: any }>`
  transition: 300ms;
  fill: ${({ rotate, theme }) =>
    rotate === 'true' ? theme.colors.quinary : theme.text};
  transform: ${({ rotate }) =>
    rotate !== 'true' ? 'rotate(90deg)' : 'rotate(420deg)'};
  :hover {
    transform: ${({ rotate }) => (rotate === 'true' ? 'rotate(440deg)' : '')};
  }
`;

export const Arrow = ({ rotate, hide, w }: any) => (
  <StyledArrow
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 0 489.967 489.967'
    width={w < 992 ? '18px' : '28px'}
    height={w < 992 ? '18px' : '28px'}
    rotate={rotate}
    style={{ display: hide === 'true' ? 'none' : 'block' }}
  >
    <path
      id='XMLID_104_'
      d='M481.065,257.197c5.305-1.714,8.902-6.648,8.902-12.218c0-5.569-3.597-10.502-8.902-12.217L16.78,83.075
		c-4.933-1.591-10.352-0.052-13.711,3.898c-3.358,3.953-4.014,9.55-1.645,14.164c18.539,36.218,30.102,87.237,30.102,143.843
		c0,56.605-11.573,107.624-30.12,143.853c-2.358,4.615-1.715,10.202,1.654,14.162c3.359,3.952,8.77,5.49,13.713,3.898
		L481.065,257.197z'
    />
  </StyledArrow>
);
