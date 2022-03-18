import { FC, ReactNode, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

interface MessageProps {
  variant?: string;
  children: ReactNode;
  height?: string;
  padding?: string;
  showMessage?: boolean;
  setShowMessage?: any;
  showCloseButton?: boolean;
}

const Message: FC<MessageProps> = ({
  variant,
  children,
  height,
  padding,
  showMessage,
  setShowMessage,
  showCloseButton,
}) => {
  const [show, setShow] = useState(true);

  if (show || showMessage) {
    return (
      <Alert
        onClose={() => setShow(false)}
        className='d-flex align-items-center justify-content-between'
        variant={variant}
        height={height ? height : ''}
        style={{
          padding: padding ? padding : '',
        }}
      >
        {children}
        {showCloseButton && (
          <Button
            className='bg-transparent border-0'
            onClick={() => {
              setShow(false);
              showMessage && setShowMessage(false);
            }}
          >
            <i className='fas fa-times'></i>
          </Button>
        )}
      </Alert>
    );
  }
  return <></>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
