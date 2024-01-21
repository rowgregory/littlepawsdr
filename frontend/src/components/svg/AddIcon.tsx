import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const Add = styled.svg<{ loading: string }>`
  animation: ${({ loading }) =>
    loading === 'true' ? css`${rotate} 2000ms linear infinite` : ``};
`;

export const AddIcon = ({ loading }: { loading?: any }) => {
  return (
    <Add
      loading={loading?.toString()}
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 512 512'
      width='18pt'
      className='mr-2'
    >
      <g>
        <g>
          <path
            fill='#fff'
            d='M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M384,283.429H283.429V384
			h-54.857V283.429H128v-54.857h100.571V128h54.857v100.571H384V283.429z'
          />
        </g>
      </g>
    </Add>
  );
};
