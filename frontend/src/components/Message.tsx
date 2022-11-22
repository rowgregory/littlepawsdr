import { FC, ReactNode, useState } from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from './styles/Styles';
import ErrorIcon from './svg/ErrorIcon';
import ExclamationPoint from './svg/ExclamationPoint';
import InfoIcon from './svg/InfoIcon';
import SuccessIcon from './svg/SuccessIcon';

export const Container = styled(Alert)<{ color: string }>`
  max-width: ${({ theme }) => theme.breakpoints[1]};
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  height: 65px;
  border-right: 5px solid ${({ color }) => color};
  border-top: 1px solid ${({ color }) => color};
  border-bottom: 1px solid ${({ color }) => color};
  margin: 1rem 0;
  padding: 0;
  button {
    display: block;
  }
  div {
    flex-direction: flex-column;
  }
`;

const MsgType = styled.div<{ color: string }>`
  color: ${({ color }) => (color ? color : '')};
  font-size: 1.25rem;
`;

const IconType = styled.div<{ bg?: string }>`
  width: 65px;
  height: 65px;
  background: ${({ bg }) => (bg ? bg : '')};
  margin-right: 0.65rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MessageProps {
  children: ReactNode;
  variant: string;
}

const Message: FC<MessageProps> = ({ variant, children }) => {
  const [show, setShow] = useState(true);

  const text = {
    danger: {
      color: '#cc0000',
      textKey: 'Error',
      type: 'danger',
      icon: <ErrorIcon />,
    },
    info: {
      color: '#9761aa',
      textKey: 'Info',
      type: 'info',
      info: <InfoIcon />,
    },
    warning: {
      color: '#ff8801',
      textKey: 'Warning',
      type: 'warning',
      icon: <ExclamationPoint />,
    },
    success: {
      color: '#77b300',
      textKey: 'Success',
      type: 'success',
      icon: <SuccessIcon />,
    },
  } as any;

  if (show) {
    return (
      <Container
        show={show}
        variant={text[variant].type}
        dismissible
        onClose={() => setShow(false)}
        color={text[variant].color}
      >
        <IconType bg={text[variant].color}>{text[variant].icon}</IconType>
        <div>
          <MsgType color={text[variant].color}>{text[variant].textKey}</MsgType>
          <Text fontSize='0.8rem'>{children}</Text>
        </div>
      </Container>
    );
  }
  return <></>;
};

Message.defaultProps = {
  variant: 'danger',
};

export default Message;
