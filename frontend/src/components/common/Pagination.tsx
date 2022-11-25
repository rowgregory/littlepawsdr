import { Pagination } from 'react-bootstrap';

export const rangeV2 = (
  arr: any,
  paginatedPage: any,
  setPaginatedPage: any,
  amountPerPage?: number
) => {
  const amountOfPagesArr = [];

  if (Math.ceil(arr?.length / 10 + 1) > 2) {
    for (
      let i = 1;
      i < Math.ceil(arr?.length / (amountPerPage ?? 10) + 1);
      i++
    ) {
      amountOfPagesArr.push(
        <Pagination.Item
          active={i === Number(paginatedPage)}
          key={i}
          value={i}
          onClick={(e) => {
            if (+paginatedPage !== i) {
              setPaginatedPage(i);
              window.scrollTo(0, 500);
            }
          }}
        >
          {i}
        </Pagination.Item>
      );
    }
  }
  return amountOfPagesArr;
};
