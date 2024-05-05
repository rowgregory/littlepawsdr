export const getPicturesAndVideos = (response: any) => {
  if (Array.isArray(response?.data)) {
    const pictures = [] as any;
    const videos = [] as any;

    response.data.forEach((obj: any) => {
      obj.attributes.photos = [];
      obj.attributes.videos = [];
    });

    const picturesUrl = response.included
      ?.filter((obj: any) => obj.type === 'pictures')
      ?.map((obj: any) => obj.attributes.original.url);

    const videoUrls = response.included
      ?.filter((obj: any) => obj.type === 'videourls')
      ?.map((obj: any) => ({
        url: obj.attributes.url,
        urlThumbnail: obj.attributes.urlThumbnail,
        id: obj.id,
      }));

    response.data.forEach((obj: any) => {
      picturesUrl?.forEach((url: any) => {
        if (url.includes(obj.id)) {
          pictures.push({ objId: obj.id, url });
        }
      });

      videoUrls?.forEach((video: any) => {
        if (obj?.relationships?.videourls?.data[0]?.id === video.id) {
          videos.push({ objId: obj.id, video });
        }
      });
    });

    response.data.forEach((obj: any) => {
      obj.attributes.photos = pictures
        .filter((p: any) => p.objId === obj.id)
        .map((p: any) => p.url);

      obj.attributes.videos = videos
        .filter((v: any) => v.objId === obj.id)
        .map((v: any) => v.video);
    });

    return response.data;
  } else {
    console.error('Error: No response data from Rescue Groups: ', response?.data);
  }
};
