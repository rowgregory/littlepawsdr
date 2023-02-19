import axios from 'axios';

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
      console.log('data: ', data);
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
      return { message: 'Rescue Groups Error' };
    }
  },
  uploadImageToImgbb: async (formData: any) => {
    try {
      let response = axios
        .post(
          'https://api.imgbb.com/1/upload?key=a704ca29c0200fd79511918c24fd90d6',
          formData
        )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error;
        });

      return response;
    } catch (err: any) {
      return err.message;
    }
  },
  deleteImage: async (path: any) => {
    try {
      let response = axios
        .post('/api/remove-upload', { publicId: path })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return error;
        });

      return response;
    } catch (err: any) {
      return err.message;
    }
  },
};

export default API;
