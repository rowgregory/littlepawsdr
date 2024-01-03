import styled from 'styled-components';
import './styles.css';
import { Text } from '../../styles/Styles';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  background: rgb(0 0 0/0.75);
`;

const ContactLoader = ({ text }: { text: string }) => {
  return (
    <Container>
      <div className='loader'>
        <div className='inner one'></div>
        <div className='inner two'></div>
        <div className='inner three'></div>
      </div>
      <Text color='#fff' marginTop='48px' fontWeight={400} fontStyle='16px'>{text}</Text>
    </Container>
  );
};

export default ContactLoader;
