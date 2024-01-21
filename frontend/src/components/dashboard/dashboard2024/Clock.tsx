import { useEffect, useState } from 'react';
import { Flex, Text } from '../../styles/Styles';

const getFormattedDate = () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];

  return `${dayOfWeek}, ${dayOfMonth} ${month}`;
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes();
  const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <div style={{ gap: 0 }}>
      <Flex alignItems='baseline' justifyContent='center' style={{ gap: 0 }} height='fit-content'>
        <Text fontSize='60px' fontFamily='Rust' lineHeight='1'>
          {hours}:{minutesDisplay}
        </Text>
      </Flex>
      <Text textTransform='uppercase' fontFamily='Rust' lineHeight='' fontSize='14px' textAlign='center'>
        {getFormattedDate()}
      </Text>
    </div>
  );
};

export default Clock;
