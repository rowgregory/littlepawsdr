const headers = {
  'Content-Type': 'application/vnd.api+json',
  Authorization: `${process.env.REACT_APP_RESCUE_GROUPS_API_KEY}`,
  Accept: 'application/vnd.api+json',
};

const API = {
  availableDogs: async () => {
    try {
      const response = await fetch(
        'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/available/dogs?',
        {
          method: 'GET',
          headers,
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      console.log('error => ', err);
    }
  },
  getDachshundById: async (id: number) => {
    try {
      const response = await fetch(
        `https://api.rescuegroups.org/v5/public/orgs/5798/animals/${id}`,
        {
          method: 'GET',
          headers,
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      console.log('error => ', err);
    }
  },
  getPicturesStatusesAndVideo: async (criteria?: string | string) => {
    try {
      const response = await fetch(
        'https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?limit=250&sort=-%2Banimals.adoptedDate',
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            data: {
              filters: [
                {
                  fieldName: 'statuses.name',
                  operation: 'equal',
                  criteria,
                },
              ],
            },
          }),
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      console.log('error => ', err);
    }
  },
};

export default API;
