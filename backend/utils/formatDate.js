export const formatDate = (date) => {
  const firstPartOfDate = new Date(date).toString().slice(0, 15);
  const newDate = new Date(date).toString().slice(0, 24);
  let time = newDate.slice(16, 24)?.split(':');
  const hours = Number(time[0]);
  const minutes = Number(time[1]);
  const seconds = Number(time[2]);

  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = '' + hours;
  } else if (hours > 12) {
    timeValue = '' + (hours - 12);
  } else if (hours === 0) {
    timeValue = '12';
  }

  timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes;
  timeValue += seconds < 10 ? ':0' + seconds : ':' + seconds;
  timeValue += hours >= 12 ? ' P.M.' : ' A.M.';

  return `${firstPartOfDate}`;
};
