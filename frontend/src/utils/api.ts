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
  getAllSuccessfulAdoptions: async () => {
    try {
      const response = await fetch(
        `https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs?include=pictures&sort=-%2Banimals.adoptedDate&page=1&limit=250`,
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
  getSanctuaryAndPassedAway: async () => {
    try {
      const response = await fetch(
        `https://api.rescuegroups.org/v5/public/orgs/5798/animals/search/dogs&sort=%2Banimals.name&page=4&limit=250`,
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
  getQuotes: async () => {
    try {
      const response = await fetch(`https://type.fit/api/quotes`, {
        method: 'GET',
        headers: {
          async: 'true',
          crossDomain: 'true',
        },
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.log('error => ', err);
    }
  },
};

export default API;
