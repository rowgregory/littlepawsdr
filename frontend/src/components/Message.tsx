import { FC, ReactNode } from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { Text } from './styles/Styles';
import ErrorIcon from './svg/ErrorIcon';
import ExclamationPoint from './svg/ExclamationPoint';
import InfoIcon from './svg/InfoIcon';
import SuccessIcon from './svg/SuccessIcon';

const Container = styled(Alert)<{ color: string }>`
  max-width: ${({ theme }) => theme.breakpoints[1]};
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  height: 65px;
  border-right: 5px solid ${({ color }) => color};
  border-top: 1px solid ${({ color }) => color};
  border-bottom: 1px solid ${({ color }) => color};
  padding: 0;
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
      color: '#267653',
      textKey: 'Success',
      type: 'success',
      icon: <SuccessIcon />,
    },
  } as any;

  return (
    <Container variant={text[variant].type} color={text[variant].color}>
      <IconType bg={text[variant].color}>{text[variant].icon}</IconType>
      <div className='flex-column'>
        <MsgType color={text[variant].color}>{text[variant].textKey}</MsgType>
        <Text fontSize='0.8rem'>{children}</Text>
      </div>
    </Container>
  );
};

Message.defaultProps = {
  variant: 'danger',
};

export default Message;
