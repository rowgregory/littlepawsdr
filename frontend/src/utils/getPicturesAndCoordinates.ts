export const getPicturesAndCoordinates = (response: any) => {
  // add photos and coordinates fields to attributes object
  if (response?.data?.length > 0) {
    // eslint-disable-next-line array-callback-return
    response?.data?.map((obj: any) => {
      obj.attributes.photos = [];
      obj.attributes.coordinates = {};
    });
  } else {
    console.log('Error: No response data from RG -->', response?.data);
  }

  // isolate objects with type picture to
  // return the original size url string
  // eslint-disable-next-line array-callback-return
  const includedArray = response?.included?.map((obj: any) => {
    if (obj.type === 'pictures') {
      return obj.attributes.original.url;
    }
  });

  // eslint-disable-next-line array-callback-return
  const includedArrayLocations = response?.included?.filter((obj: any) => {
    if (obj.type === 'locations') {
      return { id: obj.id, lat: obj.attributes.lat, lon: obj.attributes.lon };
    }
  });

  // select only the data we need
  // @ts-ignore
  const urlImgLinkArray = includedArray?.filter((e) => typeof e === 'string');
  // eslint-disable-next-line array-callback-return
  const coordinatesArray = includedArrayLocations?.filter((e: any) => {
    let newArr = [];
    if (e !== undefined) {
      return newArr.push(e);
    }
  });

  // if animal id is part of imageUrl
  // put url into photos array
  if (response?.data?.length >= 1) {
    response?.data?.filter((obj: any) => {
      urlImgLinkArray?.filter((link: any) => {
        if (link.includes(obj.id)) {
          obj.attributes.photos.push(link);
        }

        return urlImgLinkArray;
      });

      coordinatesArray?.filter((newObj: any) => {
        if (newObj.id === obj.relationships.locations.data[0].id) {
          obj.attributes.coordinates.lat = newObj.attributes.lat;
          obj.attributes.coordinates.lon = newObj.attributes.lon;
        }
        return coordinatesArray;
      });

      return response;
    });
  }

  return response;
};
