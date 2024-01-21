import { useState } from 'react';
import { Text } from '../../styles/Styles';
import styled, { css, keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

const moveleft = keyframes`
0% {
  right: -100%;
}
50% {
  right: -0%;
  z-index:1000;
}
100% {
  right: 100%;
}
`;

const CodeCopied = styled.div<{ anim: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  padding: 7px 10px;
  color: #000;
  transition: all 0.5s;
  width: 100%;
  z-index: 1;
  cursor: pointer;
  height: 100%;

  &:before {
    content: '';
    position: absolute;
    overflow: hidden;
    animation: ${({ anim }) =>
    anim === 'true'
      ? css`
            ${moveleft} 1.2s ease-in-out forwards
          `
      : ''};
    top: 0;
    height: 100%;
    width: 100%;
    background: ${({ anim }) =>
    anim === 'true' ? 'linear-gradient(263deg, rgba(233,198,253,1) 50%, #cadbff 100%)' : ''};
    mix-blend-mode: difference;
    transition: all 0.5s;
  }
`;

const AdoptionApplicationBypassCode = () => {
  const state = useSelector((state: any) => state);
  const byPassCode = state.adoptionApplicationFeeBypassCode.bypassCode;
  let [clipbloard, setClipboard] = useState({
    loading: false,
    message: '',
  });

  const copyCode = () => {
    setClipboard({ loading: true, message: '' });
    navigator.clipboard.writeText(byPassCode).then(async () => {
      setClipboard({ loading: true, message: 'copied' });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClipboard({ loading: false, message: '' });
    });
  };

  return (
    <CodeCopied anim={clipbloard.loading.toString()} onClick={copyCode}>
      <Text fontFamily='Rust' fontSize='12px'>
        Adoption Application Bypass Code
      </Text>
      <Text fontFamily='Rust' textAlign='center' color='#fc5b82' fontSize='24px'>
        {clipbloard.loading ? 'Copied' : byPassCode}
      </Text>
    </CodeCopied>
  );
};

export default AdoptionApplicationBypassCode;
