import {
  TOTAL_DACHSHUND_COUNT_FAIL,
  TOTAL_DACHSHUND_COUNT_REQUEST,
  TOTAL_DACHSHUND_COUNT_SUCCESS,
} from '../constants/dachshundConstants';
import { getPicturesAndVideos } from './getPicturesAndVideos';

const headers = {
  'Content-Type': 'application/vnd.api+json',
  Authorization: `${process.env.REACT_APP_RESCUE_GROUPS_API_KEY}`,
  Accept: 'application/vnd.api+json',
};

const apiEndpoints = [
  'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?sort=-animals.adoptedDate&page=1&limit=250',
  'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?sort=-animals.adoptedDate&page=2&limit=250',
  'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?sort=-animals.adoptedDate&page=3&limit=250',
  'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?sort=-animals.adoptedDate&page=4&limit=250',
  'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?sort=-animals.adoptedDate&page=5&limit=250',
  'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?sort=-animals.adoptedDate&page=6&limit=250',
  'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/available/dogs?',
];

const makeApiCall = async (endpoint: string) => {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`API Error: ${response.status}`);
    }
  } catch (err: any) {
    return { error: err.message };
  }
};

const fetchAllData = async () => {
  try {
    const results = await Promise.all(apiEndpoints.map(makeApiCall));

    return results;
  } catch (err) {
    return { message: 'Error fetching data' };
  }
};

const API = {
  getDachshundDataForSearchBar: async () => {
    const data = (await fetchAllData()) as any;

    const searchBarData = data?.flatMap((item: any) =>
      item.data?.flatMap((obj: any) => ({
        id: obj.id,
        name: obj.attributes.name,
        status: obj.relationships.statuses.data[0].id,
      }))
    );

    const dataZeroThroughFiveHere = data.slice(0, 6).map((item: any) => getPicturesAndVideos(item));
    const flattenedData = [].concat(...dataZeroThroughFiveHere);
    const flattenedDataArrays = flattenedData?.flatMap((item: any) => item.data);

    getPicturesAndVideos(data[6]);

    return { searchBarData, available: data[6], allDogs: flattenedDataArrays };
  },
  getTotalDachshundCount: () => async (dispatch: any) => {
    try {
      dispatch({ type: TOTAL_DACHSHUND_COUNT_REQUEST });
      const data = (await fetchAllData()) as any;

      function sumDataLengths(dataStructure: any) {
        return dataStructure.reduce((total: any, record: any) => total + record.data.length, 0);
      }

      const total = sumDataLengths(data);

      dispatch({ type: TOTAL_DACHSHUND_COUNT_SUCCESS, payload: total });
    } catch (error: any) {
      dispatch({
        type: TOTAL_DACHSHUND_COUNT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  },
};

export default API;
