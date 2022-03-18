/* eslint-disable array-callback-return */
export const speciesPromise = (dachshund: any, setTypeSpecies: any) =>
  new Promise((resolve, reject) => {
    if (dachshund !== undefined && dachshund !== false) {
      const speciesObj = dachshund?.included?.find((obj: any) => {
        if (obj.type === 'species') {
          return obj;
        }
      });
      if (speciesObj !== undefined) {
        resolve(speciesObj);
      }
    }
  }).then(
    (result: any) => {
      setTypeSpecies(result.attributes.singular);
    },
    (err) => {
      console.log(err);
    }
  );

export const colorsPromise = (dachshund: any, setTypeColors: any) =>
  new Promise((resolve, reject) => {
    if (dachshund !== undefined && dachshund !== false) {
      const colorsObj = dachshund?.included?.find((obj: any) => {
        if (obj.type === 'colors') {
          return obj;
        }
      });
      if (colorsObj !== undefined) {
        resolve(colorsObj);
      }
    }
  }).then(
    (result: any) => {
      setTypeColors(result.attributes.name);
    },
    (err) => {
      console.log(err);
    }
  );

export const patternsPromise = (dachshund: any, setTypePatterns: any) =>
  new Promise((resolve, reject) => {
    if (dachshund !== undefined && dachshund !== false) {
      const patternsObj = dachshund?.included?.find((obj: any) => {
        if (obj.type === 'patterns') {
          return obj;
        }
      });
      if (patternsObj !== undefined) {
        resolve(patternsObj);
      }
    }
  }).then(
    (result: any) => {
      setTypePatterns(result.attributes.name);
    },
    (err) => {
      console.log(err);
    }
  );

export const locationsPromise = (dachshund: any, setTypeLocations: any) => {
  new Promise((resolve, reject) => {
    if (dachshund !== undefined && dachshund !== false) {
      const locationsObj = dachshund?.included?.find((obj: any) => {
        if (obj.type === 'locations') {
          return obj;
        }
      });
      if (locationsObj !== undefined) {
        resolve(locationsObj);
      }
    }
  }).then(
    (result: any) => {
      setTypeLocations(result.attributes.name);
    },
    (err) => {
      console.log(err);
    }
  );
};
