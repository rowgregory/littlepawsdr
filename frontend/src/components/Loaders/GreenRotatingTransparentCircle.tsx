import styled, { css, keyframes } from 'styled-components';

const rotation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Container = styled.div<{ loading: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ loading }) => loading === 'true' ? '10' : '-1'};;
`;

const Anim = styled.div<{ loading: string }>`
width: 48px;
height: 48px;
border: 5px solid;
border-color: #a7d82f transparent;
border-radius: 50%;
display: inline-block;
box-sizing: border-box;
animation:${({ loading }) => loading === 'true' ? css`${rotation} 1s linear infinite` : ''};
display:${({ loading }) => loading === 'true' ? 'block' : 'none'};
}

`;

const GreenRotatingTransparentCircle = ({ loading }: { loading: boolean }) => {
  return (
    <Container loading={(loading)?.toString()}>
      <Anim loading={(loading)?.toString()} />
    </Container>
  );
};

export default GreenRotatingTransparentCircle;
