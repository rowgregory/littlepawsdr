import { useState, useEffect } from 'react';

const useSortableArray = (initialArray: any) => {
  const [sortedArray, setSortedArray] = useState(initialArray);
  const [isSortedAsc, setIsSortedAsc] = useState(true);

  const sortArray = (property: any) => {
    const sorted = [...sortedArray].sort((a, b) => {
      if (a[property] === b[property]) {
        return 0;
      }
      return isSortedAsc ? a[property] - b[property] : b[property] - a[property];
    });
    setSortedArray(sorted);
    setIsSortedAsc(!isSortedAsc);
  };

  useEffect(() => {
    setSortedArray(initialArray);
    setIsSortedAsc(true);
  }, [initialArray]);

  return [sortedArray, sortArray];
};

export default useSortableArray;
