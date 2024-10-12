import { Modal } from 'react-bootstrap';
import { STATES } from '../../utils/states';
import TailwindSpinner from '../Loaders/TailwindSpinner';
import {
  useGetUserShippingAddressQuery,
  useUpdateUserMutation,
} from '../../redux/services/userApi';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { usePlaceBidMutation } from '../../redux/services/campaignApi';
import useAuctionItemFormPublic from '../../utils/hooks/useAuctionItemFormPublic';
import useForm from '../../utils/hooks/useForm';
import { resetUserSuccess } from '../../redux/features/user/userSlice';
import validateShippingAddressForm from '../../validations/validateShippingAddressForm';
import { useState } from 'react';

const BidModal = ({
  openBidModal,
  handleClose,
  campaign,
  auctionItem,
  setOpenConfirmationModal,
}: any) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState({}) as any;
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);
  const theme = campaign.campaign.themeColor;
  const themeText = theme.text;
  const themeBorder = theme.border;
  const themeDarker = theme.darker;
  const themeDark = theme.dark;
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  useGetUserShippingAddressQuery();

  const handleUpdateUser = async (e: any, section: string, data: any) => {
    e.preventDefault();

    const errors = validateShippingAddressForm(fields);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      await updateUser({
        id: auth?.user?._id,
        type: section,
        data,
      })
        .unwrap()
        .then(() => {
          setTimeout(() => {
            dispatch(resetUserSuccess());
          }, 3000);
        })
        .catch(() => dispatch(resetUserSuccess()));
    }
  };

  const [placeBid, { isLoading: loadingPlacingBid }] = usePlaceBidMutation();

  const handlePlaceBidCb = async () => {
    await placeBid({
      auctionItemId: auctionItem?._id,
      auctionId: campaign?.campaign?.auction?._id,
      bidAmount: inputs.bidAmount,
    })
      .unwrap()
      .then(() => {
        handleClose();
        setOpenConfirmationModal(true);
      })
      .catch((err: any) => err);
  };

  const { inputs, handleInput, onSubmit } = useAuctionItemFormPublic(handlePlaceBidCb, auctionItem);

  const {
    inputs: fields,
    handleInput: handleAddressInput,
    handleSelect,
  } = useForm(['address', 'city', 'state', 'zipPostalCode']);

  return (
    <Modal show={openBidModal} centered onHide={handleClose}>
      {user?.hasShippingAddress ? (
        <div className='bg-white p-6 rounded-xl'>
          <form onSubmit={onSubmit}>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center'>
                <i className={`fa-solid fa-arrow-up-from-bracket text-2xl ${themeText} mr-3`}></i>
                <p className='font-Matter-Medium text-2xl'>Place a bid</p>
              </div>
              <i onClick={handleClose} className='fa-solid fa-xmark cursor-pointer'></i>
            </div>
            <div className='grid grid-cols-2 grid-rows-2 gap-2 mb-10'>
              <div className='flex items-center'>
                <p className='w-5/12 font-Matter-Medium text-xs text-gray-400'>CURRENT BID</p>
                <div className='ml-2 w-7/12 h-[0.5px] bg-gray-400'></div>
              </div>
              <div className='flex items-center'>
                <p className='w-5/12 font-Matter-Medium text-xs text-gray-400'>MINIMUM BID</p>
                <div className='ml-2 w-7/12 h-[0.5px] bg-gray-400'></div>
              </div>

              <p className='text-xl font-Matter-SemiBold'>
                {auctionItem?.totalBids === 0 ? 'No Bids' : `$${auctionItem?.currentBid}`}
              </p>
              <p className='text-xl font-Matter-SemiBold'>
                {auctionItem?.minimumBid
                  ? `$${auctionItem?.minimumBid}`
                  : auctionItem?.startingPrice}
              </p>
            </div>
            <p className='text-lg font-Matter-SemiBold mb-2'>Enter your bid amount</p>
            <div className='border-[1px] border-slate-300 rounded-lg py-3 px-2.5 flex items-center mb-4'>
              <p className={`${themeText} mr-2.5 text-2xl font-Matter-SemiBold`}>$</p>
              <input
                type='number'
                name='bidAmount'
                min={auctionItem?.startingPrice}
                onChange={handleInput}
                placeholder={
                  auctionItem?.minimumBid?.toString() ?? auctionItem?.startingPrice?.toString()
                }
                alt='Place your bid here'
                className={`font-Matter-Medium text-2xl ${themeText} focus:outline-none placeholder:text-gray-300 placeholder:font-Matter-Medium placeholder:text-2xl w-full`}
                value={inputs.bidAmount || ''}
              />
            </div>
            <div className='flex gap-3'>
              <button
                className={`w-4/12 border-2 ${themeText} ${themeBorder} rounded-lg py-2.5 font-Matter-Medium text-xl cursor-pointer duration-300 hover:${themeBorder} hover:${themeText}`}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                type='submit'
                className={`w-8/12 text-white ${themeDarker} rounded-lg py-2.5 font-Matter-Medium text-xl cursor-pointer duration-300 hover:${themeDark} disabled:cursor-not-allowed disabled:bg-gray-300`}
                disabled={
                  inputs.bidAmount === 0 ||
                  inputs.bidAmount < auctionItem?.minimumBid ||
                  inputs.bidAmount < auctionItem?.startingPrice
                }
              >{`Plac${loadingPlacingBid ? 'ing' : 'e'} ${
                inputs.bidAmount >= auctionItem?.currentBid ? `$${inputs.bidAmount}` : ''
              } bid`}</button>
            </div>
          </form>
        </div>
      ) : (
        <div className='bg-white p-6 rounded-xl'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <i className={`fa-solid fa-location-dot text-2xl ${themeText} mr-3`}></i>
              <p className='font-Matter-Medium text-2xl'>Save address to bid</p>
            </div>
            <i onClick={handleClose} className='fa-solid fa-xmark cursor-pointer'></i>
          </div>
          <form className='col-span-12 lg:col-span-8'>
            <div className='flex flex-col mb-2'>
              <label className='font-Matter-Medium text-sm mb-1' htmlFor='address'>
                Address
              </label>
              <input
                className='bg-[#fff] border-[1px] border-gray-200 rounded-md mb-2 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                name='address'
                onChange={handleAddressInput}
                type='text'
                alt='Address'
                value={fields.address || ''}
              />{' '}
              <p className='text-xs text-red-500'>{errors?.address}</p>
            </div>
            <div className='grid grid-cols-12 gap-3'>
              <div className='col-span-12 lg:col-span-6 flex flex-col'>
                <label className='font-Matter-Medium text-sm' htmlFor='city'>
                  City
                </label>
                <input
                  className='bg-[#fff] border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                  name='city'
                  onChange={handleAddressInput}
                  type='text'
                  alt='city'
                  value={fields.city || ''}
                />{' '}
                <p className='text-xs text-red-500'>{errors?.city}</p>
              </div>
              <div className='col-span-12 lg:col-span-3 flex flex-col'>
                <label className='font-Matter-Medium text-sm' htmlFor='state'>
                  State
                </label>
                <select
                  id='state'
                  name='state'
                  value={fields.state || ''}
                  onChange={handleSelect}
                  aria-label='Select state'
                  className='bg-[#fff] border-[1px] h-[46px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none text-sm cursor-pointer campaign-input'
                >
                  {STATES.map((state: any, i: number) => (
                    <option className='text-zinc-300' key={i}>
                      {state.value}
                    </option>
                  ))}
                </select>
                <p className='text-xs text-red-500'>{errors?.state}</p>
              </div>
              <div className='col-span-12 lg:col-span-3 flex flex-col'>
                <label className='font-Matter-Medium text-sm' htmlFor='zipPostalCode'>
                  Zip code
                </label>
                <input
                  className='bg-[#fff] border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                  name='zipPostalCode'
                  onChange={handleAddressInput}
                  type='text'
                  alt='zipPostalCode'
                  value={fields.zipPostalCode || ''}
                />
                <p className='text-xs text-red-500'>{errors?.zipPostalCode}</p>
              </div>
            </div>
            <div className='flex items-center mt-5'>
              <button
                className={`w-full text-white ${themeDarker} rounded-lg py-2.5 font-Matter-Medium text-xl cursor-pointer duration-300 hover:${themeDark} disabled:cursor-not-allowed disabled:bg-gray-300`}
                onClick={(e: any) =>
                  handleUpdateUser(e, 'address', {
                    shippingAddress: {
                      address: fields.address,
                      city: fields.city,
                      state: fields.state,
                      zipPostalCode: fields.zipPostalCode,
                    },
                  })
                }
              >
                {user?.success && user?.type === 'address' ? (
                  <i className='fas fa-check text-white'></i>
                ) : isLoading ? (
                  <TailwindSpinner color='fill-white' />
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default BidModal;
