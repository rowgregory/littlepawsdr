import { useSelector } from 'react-redux';

const StatusIndicator = () => {
  const status = useSelector((state: any) => state?.auth?.user?.onlineStatus);

  return (
    <div
      className={`${status === 'IDLE'
        ? 'bg-blue-to-purple'
        : status === 'OFFLINE'
          ? 'bg-orange-to-red'
          : 'bg-green-to-yellow'
        }} bg-green-to-yellow hidden lg:block lg:absolute lg:right-[70px] lg:top-[10px] lg:h-6 lg:w-6 lg:rounded-full`}
    ></div>
  );
};

export default StatusIndicator;
