import { Toast as T } from 'react-bootstrap';
import styled from 'styled-components';

const ToastContainer = styled(T)`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
`;
const Body = styled(T.Body)`
  color: #fff;
`;

const Toast = ({ showToast, setShowToast, headerText, bodyText }: any) => {
  return (
    <ToastContainer
      delay={3000}
      autohide
      show={showToast}
      onClose={() => {
        setShowToast(false);
      }}
    >
      <T.Header>
        <strong className='me-auto'>{headerText}</strong>
      </T.Header>
      <Body>{bodyText}</Body>
    </ToastContainer>
  );
};

export default Toast;
