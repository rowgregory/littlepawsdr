import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Status = styled.div<{ status: string }>`
  position: absolute;
  right: 70px;
  top: 69px;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background: rgb(136,209,73);
  background: ${({ status }) =>
    status === 'IDLE'
      ? "linear-gradient(132deg, rgba(255, 165, 0, 1) 0%, rgba(255, 87, 34, 1) 100%)"
      : status === 'OFFLINE'
        ? 'linear-gradient(132deg, rgba(255, 0, 0, 1) 0%, rgba(139, 0, 0, 1) 100%)'
        : 'linear-gradient(132deg, rgba(136,209,73,1) 18%, rgba(99,172,76,1) 100%)'}
`;

const StatusIndicator = () => {
  const status = useSelector((state: any) => state?.userLogin?.userInfo?.onlineStatus);

  return <Status status={status}></Status>;
};

export default StatusIndicator;
