import { FC, Fragment, useState } from 'react';

type AuctionItemImgAndDescSectionProps = {
  auctionItem: { description: string; photos: any };
};

const AuctionItemImgAndDescSection: FC<AuctionItemImgAndDescSectionProps> = ({ auctionItem }) => {
  const [mainPhoto, setMainPhoto] = useState(null);
  const [objectCover, setObjectCover] = useState(false);
  return (
    <Fragment>
      <div className='col-span-12 h-fit lg:col-span-1 flex lg:flex-col order-2 lg:order-1 gap-3'>
        {auctionItem?.photos?.length > 1 &&
          auctionItem?.photos?.map((photo: any) => (
            <div
              key={photo?._id}
              className='p-2 flex items-center justify-center bg-white aspect-square rounded-lg mb-1'
              onMouseOver={() => setMainPhoto(photo?.url)}
            >
              <img
                src={photo?.url}
                alt='Little Paws Auction'
                className='w-20 h-20 rounded-lg object-cover'
              />
            </div>
          ))}
      </div>
      <div className='col-span-12 lg:col-span-6 order-1 lg:order-2'>
        <div className='bg-white col-start-3 col-span-10 p-2  lg:p-6 rounded-lg'>
          <img
            onClick={() => setObjectCover(!objectCover)}
            src={mainPhoto ?? auctionItem?.photos[0]?.url}
            className={`${
              objectCover ? 'object-cover' : 'object-contain'
            } w-full aspect-square h-auto lg:h-[340px]`}
            alt='Little Paws Auction'
          />
        </div>
        {auctionItem?.description && (
          <p className='font-Matter-Regular px-0 lg:px-3 py-4'>{auctionItem?.description}</p>
        )}
      </div>
    </Fragment>
  );
};

export default AuctionItemImgAndDescSection;
