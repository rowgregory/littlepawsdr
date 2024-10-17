import { setMerchAndEcards } from '../features/merchAndEcardSlice';
import { api } from './api';

const BASE_URL = '/merch-and-ecards';

export const merchAndEcardsApi = api.injectEndpoints({
  endpoints: (build: any) => ({
    getMerchAndEcards: build.query({
      query: () => BASE_URL,
      providesTags: ['Merch-And-Ecards'],
      async onQueryStarted(_: any, { dispatch, queryFulfilled }: any) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setMerchAndEcards(data.merchAndEcards));
        } catch (error) {
          console.error('Error fetching merch and ecards:', error);
        }
      },
    }),
  }),
});

export const {
  useGetMerchAndEcardsQuery,
} = merchAndEcardsApi;
