import { createSlice } from '@reduxjs/toolkit';

interface TableState {
  text: string;
  filteredArray: any[];
  sortKey: string | null;
  sortDirection: 'asc' | 'desc';
}

const initialState: TableState = {
  text: '',
  filteredArray: [],
  sortKey: null,
  sortDirection: 'asc',
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSearchQuery: (state, { payload }) => {
      state.text = payload?.text;
      const query = payload?.text?.toLowerCase();

      state.filteredArray = payload?.arrayToFilter?.filter((data: any) =>
        [
          data?.auctionItem?.name?.toLowerCase(),
          String(data?.totalPrice),
          data?.winningBidPaymentStatus?.toLowerCase(),
          data?.name?.toLowerCase(),
          data?.shippingStatus?.toLowerCase(),
          data?.email?.toLowerCase(),
          data?.user?.name?.toLowerCase(),
          data?.user?._id?.toLowerCase(),
          data?.user?.email?.toLowerCase(),
          data?.status?.toLowerCase(),
          String(data?.currentBid),
          String(data?.buyNowPrice),
          data?._id?.toLowerCase(),
          data?.sellingFormat?.toLowerCase(),
          String(data?.totalBids),
        ].some((field) => field?.includes?.(query))
      );
    },
    setInitialArray: (state, { payload }) => {
      state.filteredArray = payload.arrayToFilter;
    },
    sortTable: (state, action) => {
      const { data, key } = action.payload;
      const direction = state.sortKey === key && state.sortDirection === 'asc' ? 'desc' : 'asc';

      state.sortKey = key;
      state.sortDirection = direction;

      const getValueFromObject = (obj: any, key: any) => {
        const keys = key?.split('.');
        return keys.reduce((acc: any, curr: any) => acc?.[curr], obj);
      };

      const sortedData = [...data].sort((a, b) => {
        let valueA: string | number, valueB: string | number;

        // Special case for price column
        if (key === 'buyNowPrice') {
          valueA = a.buyNowPrice ? a.buyNowPrice : -1;
          valueB = b.buyNowPrice ? b.buyNowPrice : -1;
        } else if (key === 'currentBid') {
          valueA = a.sellingFormat === 'auction' ? a.currentBid : -1;
          valueB = b.sellingFormat === 'auction' ? b.currentBid : -1;
        } else if (key === 'totalBids') {
          valueA = a.sellingFormat === 'auction' ? a.totalBids : -1;
          valueB = b.sellingFormat === 'auction' ? b.totalBids : -1;
        } else if (key === 'shippingCosts') {
          valueA = !a.isDigital ? a.shippingCosts : -1;
          valueB = !b.isDigital ? b.shippingCosts : -1;
        } else {
          valueA = getValueFromObject(a, key);
          valueB = getValueFromObject(b, key);
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return direction === 'asc'
            ? valueA.toLowerCase().localeCompare(valueB.toLowerCase())
            : valueB.toLowerCase().localeCompare(valueA.toLowerCase());
        }

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return direction === 'asc' ? valueA - valueB : valueB - valueA;
        }

        return 0;
      });
      state.filteredArray = sortedData;
    },
  },
});

export const { setSearchQuery, setInitialArray, sortTable } = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
