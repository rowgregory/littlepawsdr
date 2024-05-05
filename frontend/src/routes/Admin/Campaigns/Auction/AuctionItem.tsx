import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Spinner } from 'react-bootstrap';
import { Fragment } from 'react';
import { uploadMultipleFilesToFirebase } from '../../../../utils/uploadToFirebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/toolkitStore';
import {
  useCreateAuctionItemMutation,
  useDeleteAuctionItemPhotoMutation,
  useUpdateAuctionItemMutation,
} from '../../../../redux/services/campaignApi';
import TailwindSpinner from '../../../../components/Loaders/TailwindSpinner';
import useAuctionItemForm from '../../../../utils/hooks/useAuctionItemForm';

const AuctionItem = () => {
  const navigate = useNavigate();
  const campaign = useSelector((state: RootState) => state.campaign);
  const params = useParams() as any;
  const auctionItemId = params.auctionItemId;
  const isEditMode = params['*'].split('/')[1] === 'edit';
  const [createAuctionItem, { isLoading: loadingCreate }] =
    useCreateAuctionItemMutation();
  const [updateAuctionItem, { isLoading: loadingUpdate }] =
    useUpdateAuctionItemMutation();
  const [deleteAuctionItemPhoto, { isLoading: loadingDelete }] =
    useDeleteAuctionItemPhotoMutation();

  const auctionItem = campaign.campaign.auction.items.find(
    (item: any) => item._id === auctionItemId
  );

  const editPhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setInputs((inputs: any) => ({ ...inputs, photoAmount: Number(newFiles.length) }));
    const images = await uploadMultipleFilesToFirebase(newFiles, true);
    setInputs((inputs: any) => ({
      ...inputs,
      photos: [...inputs.photos, ...images],
      photoAmount: 0,
    }));
  };

  const deleteImageHandler = async (file: any) => {
    if (file?._id) {
      setInputs((inputs: any) => ({ ...inputs, photoIdToDelete: file?._id }));
      deleteAuctionItemPhoto({ photoId: file._id, auctionItemId: inputs._id });
    } else {
      setInputs((inputs: any) => ({
        ...inputs,
        photos: inputs.photos.filter((photo: any) => photo.url !== file.url),
      }));
    }
  };

  const saveAuctionItem = async (e: any) => {
    e.preventDefault();
    if (isEditMode) {
      await updateAuctionItem({
        id: auctionItemId,
        auction: campaign.campaign.auction._id,
        name: inputs.name,
        description: inputs.description,
        photos: inputs.photos,
        sellingFormat: inputs.sellingFormat,
        totalQuantity: inputs.totalQuantity,
        requiresShipping: inputs.requiresShipping,
        shippingCosts: inputs.shippingCosts,
        ...(inputs.sellingFormat === 'fixed' && {
          buyNowPrice: inputs.buyNowPrice,
          isFixed: true,
          isAuction: false,
        }),
        ...(inputs.sellingFormat === 'auction' && {
          startingPrice: inputs.startingPrice,
          currentPrice: inputs.startingPrice,
          currentBid: inputs.startingPrice,
          minimumBid: inputs.startingPrice,
          isFixed: false,
          isAuction: true,
        }),
        itemBtnText: inputs.sellingFormat === 'fixed' ? 'Buy Now' : 'Place Bid',
      })
        .unwrap()
        .then(() => navigate(`/admin/campaigns/${campaign?.campaign?._id}/auction/items`))
        .catch((err: any) => err);
    } else {
      await createAuctionItem({
        auction: campaign.campaign.auction._id,
        photos: inputs.photos,
        name: inputs.name,
        description: inputs.description,
        sellingFormat: inputs.sellingFormat,
        startingPrice: inputs.startingPrice,
        buyNowPrice: inputs.buyNowPrice,
        currentPrice: inputs.startingPrice,
        totalQuantity: inputs.totalQuantity,
        requiresShipping: inputs.requiresShipping,
        shippingCosts: inputs.shippingCosts,
        currentBid: inputs.startingPrice,
        minimumBid: inputs.startingPrice,
      })
        .unwrap()
        .then(() => navigate(`/admin/campaigns/${campaign?.campaign?._id}/auction/items`))
        .catch((err: any) => err);
    }
  };

  const { inputs, handleSwitch, handleInput, setInputs } =
    useAuctionItemForm(auctionItem);

  return (
    <div className='flex flex-col gap-y-8'>
      <Link
        to={`/admin/campaigns/${campaign?.campaign?._id}/auction/items`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to items</p>
      </Link>
      <div className='bg-white border border-slate-100 rounded-xl p-3 lg:p-8 grid gap-y-8'>
        <div className='font-Matter-Medium text-2xl'>New Item Details</div>
        <form className='flex flex-col gap-y-8'>
          <div>
            <label htmlFor='name' className='font-Matter-Medium'>
              Name
            </label>
            <input
              autoComplete='off'
              type='text'
              id='name'
              name='name'
              onChange={handleInput}
              className='font-Matter-Light focus:outline-none border px-3 py-2 rounded-lg w-full'
              value={inputs.name || ''}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='description' className='font-Matter-Medium'>
              Description
            </label>
            <div className='border rounded-lg w-full p-2 px-3 py-2'>
              <textarea
                autoComplete='off'
                name='description'
                id='description'
                rows={12}
                placeholder='Write your content here...'
                className='font-Matter-Light placeholder:font-Matter-Light placeholder:text-sm w-full border-0 focus:outline-none'
                value={inputs.description || ''}
                onChange={handleInput}
              ></textarea>
            </div>
          </div>
          <div>
            <label htmlFor='multiple-images' className='font-Matter-Medium'>
              Photos
            </label>
            <p className='font-Matter-Light mb-2'>
              Add detailed images of your auction item.
            </p>
            <div className='border border-slate-100 border-dashed rounded-lg'>
              <Form.File
                className='auction-item'
                multiple
                type='file'
                id='multiple-images'
                label={
                  <div className='flex justify-center items-center cursor-pointer pt-8'>
                    <div className=' w-full text-center'>
                      <div className='h-32 flex flex-col items-center justify-center'>
                        <div className='h-12 w-12 rounded-full bg-slate-100 flex justify-center items-center mb-2'>
                          <i className='fa-solid fa-cloud-arrow-up fa-xl'></i>
                        </div>
                        <div className='text-[#3366ff] font-Matter-Regular underline text-base'>
                          Click to add photos
                        </div>
                      </div>
                    </div>
                  </div>
                }
                onChange={editPhotoHandler}
              ></Form.File>
              <div className='flex flex-wrap px-8 pb-4 gap-2'>
                {Array.from(inputs.photos)?.map((file: any, i: number) => (
                  <div
                    key={i}
                    className='w-36 h-36 lg:w-56 lg:h-56 rounded-md border border-dashed border-gray-100 flex items-center justify-center pt-10 pb-6 px-3 lg:px-9 cursor-pointer bg-[#0b0b0b] relative'
                  >
                    {loadingDelete && file._id === inputs.photoIdToDelete ? (
                      <Spinner
                        animation='border'
                        size='sm'
                        className='text-teal-400 absolute top-3.5 left-2.5 z-2'
                      />
                    ) : (
                      <i
                        onClick={() => deleteImageHandler(file)}
                        className='fas fa-times fa-sm text-white absolute top-5 left-3.5 z-2 cursor-pointer'
                      ></i>
                    )}
                    <div className='absolute z-2 top-2 left-8 text-white text-xs truncate w-32'>
                      {file.name}
                    </div>
                    <div className='absolute z-2 top-6 left-8 text-xs text-gray-500'>
                      {file.size}KB
                    </div>
                    <img
                      className='w-full h-full object-cover'
                      src={file.url}
                      alt='auction-item'
                    />
                  </div>
                ))}
                {inputs.photoAmount > 0 &&
                  Array.from({ length: inputs.photoAmount })?.map((_: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className='w-36 h-36 lg:w-56 lg:h-56 rounded-md border border-dashed border-gray-100 flex items-center justify-center pt-10 pb-6 px-3 lg:px-9 cursor-pointer bg-[#0b0b0b] relative'
                      >
                        <TailwindSpinner color='fill-teal-400' />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div>
            <div className='font-Matter-Medium mb-3'>Selling Format</div>
            <div className='grid grid-cols-12 gap-3'>
              <label
                htmlFor='auction'
                className={` ${inputs.sellingFormat === 'auction'
                  ? 'border-2 border-sky-600'
                  : 'border-2 border-slate-100'
                  } col-span-12 md:col-span-6 bg-slate-50 rounded-lg p-3 flex font-Matter-Medium cursor-pointer`}
              >
                <div className='w-16'>
                  <input
                    autoComplete='off'
                    type='radio'
                    name='sellingFormat'
                    value='auction'
                    className='selling-format h-fit mt-1'
                    id='auction'
                    onChange={handleInput}
                    checked={inputs.sellingFormat === 'auction' || false}
                  />
                </div>
                <div className='flex flex-col ml-1'>
                  <div className='font-Matter-Medium mb-0.5'>Auction Style</div>
                  <div className='font-Matter-Light'>
                    Item is sold to the highest bidder or purchased at an optional
                    Buy-It-Now price.
                  </div>
                </div>
              </label>
              <label
                htmlFor='fixed'
                className={`${inputs.sellingFormat === 'fixed'
                  ? 'border-2 border-sky-600'
                  : 'border-2 border-slate-100'
                  } col-span-12 md:col-span-6 bg-slate-50 rounded-lg p-3 flex font-Matter-Medium cursor-pointer`}
              >
                <div className='w-16'>
                  <input
                    autoComplete='off'
                    type='radio'
                    name='sellingFormat'
                    value='fixed'
                    className='h-fit mt-1'
                    id='fixed'
                    onChange={handleInput}
                    checked={inputs.sellingFormat === 'fixed' || false}
                  />
                </div>
                <div className='flex flex-col ml-1'>
                  <div className='font-Matter-Medium mb-0.5'>Fixed Price</div>
                  <div className='font-Matter-Light'>
                    Item can only be purchased at a fixed Buy-It-Now price.
                  </div>
                </div>
              </label>
              {inputs.sellingFormat === 'auction' ? (
                <div className='col-span-12 md:col-span-6 '>
                  <label htmlFor='startingPrice' className='font-Matter-Medium'>
                    Starting Price
                  </label>
                  <div className='flex items-center border border-slate-100 rounded-lg px-3 py-2'>
                    <div className='font-Matter-regular mr-2'>$</div>
                    <input
                      autoComplete='off'
                      type='number'
                      id='startingPrice'
                      min={1}
                      name='startingPrice'
                      value={inputs.startingPrice}
                      className='border-0 rounded-xl p-0 focus:outline-0'
                      onChange={handleInput}
                    />
                  </div>
                </div>
              ) : (
                <Fragment>
                  <div className='col-span-12 md:col-span-6'>
                    <label htmlFor='buyNowPrice' className='font-Matter-Medium'>
                      Buy Now Price
                    </label>
                    <div className='flex items-center border border-slate-100 rounded-lg px-3 py-2'>
                      <div className='font-Matter-regular mr-2'>$</div>
                      <input
                        autoComplete='off'
                        type='number'
                        id='buyNowPrice'
                        min={1}
                        name='buyNowPrice'
                        value={inputs.buyNowPrice || ''}
                        className='border-0 p-0 focus:outline-0'
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className='col-span-12 md:col-span-6'>
                    <label htmlFor='totalQuantity' className='font-Matter-Medium'>
                      Total Quantity
                    </label>
                    <div className='flex items-center border border-slate-100 rounded-lg px-3 py-2'>
                      <input
                        type='number'
                        id='totalQuantity'
                        min={1}
                        name='totalQuantity'
                        value={inputs.totalQuantity || ''}
                        className='border-0 p-0 focus:outline-0'
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
          <div className='flex flex-col mt-8'>
            <div className='flex justify-between items-center w-full h-6'>
              <div className='font-Matter-Medium'>Requires Shipping</div>
              <Form.Group controlId='requiresShipping' className='mb-0'>
                <Form.Check
                  className='auction'
                  type='switch'
                  id='requiresShipping'
                  checked={inputs.requiresShipping || false}
                  onChange={handleSwitch}
                  name='requiresShipping'
                ></Form.Check>
              </Form.Group>
            </div>
            <label htmlFor='requiresShipping' className='font-Matter-Light'>
              Indicates the item needs to be fulfilled by mail.
            </label>
            <div className='grid grid-cols-12'>
              <div className='col-span-12 md:col-span-6 mt-3.5'>
                <label htmlFor='shippingCosts' className='font-Matter-Light'>
                  Shipping Costs
                </label>
                <div className='flex items-center border border-slate-100 rounded-lg px-3 py-2'>
                  <div className='font-Matter-regular mr-2'>$</div>
                  <input
                    type='number'
                    id='shippingCosts'
                    min={0}
                    name='shippingCosts'
                    value={inputs.shippingCosts || ''}
                    className='border-0 p-0 focus:outline-0'
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='font-Matter-Medium mb-2.5'>Visibility</div>
            <div className='border-[1px] border-sky-500 rounded-lg p-3 flex items-baseline bg-[#eff4ff]'>
              <label htmlFor='visibility' className='d-flex mb-0'>
                <div className='w-9 mr-1'>
                  <input
                    type='radio'
                    autoComplete='off'
                    id='visibility'
                    checked={true}
                    value='public'
                    className='selling-format h-fit mt-1'
                    onChange={(e: any) => { }}
                  />
                </div>
                <div>
                  <div className='font-Matter-Medium'>Public</div>
                  <div className='font-Matter-Light'>
                    This item will be viewable by everyone.
                  </div>
                </div>
              </label>
            </div>
          </div>
          <button
            className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
            onClick={saveAuctionItem}
          >
            {loadingUpdate || loadingCreate ? (
              <TailwindSpinner color='text-[#fff]' />
            ) : (
              'Save'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuctionItem;
