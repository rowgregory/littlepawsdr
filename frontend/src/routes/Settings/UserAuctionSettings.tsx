import { Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useUpdateUserMutation } from '../../redux/services/userApi';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { resetUserSuccess } from '../../redux/features/user/userSlice';
import TailwindSpinner from '../../components/Loaders/TailwindSpinner';
import { STATES } from '../../utils/states';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useUserAuctionSettingsForm, {
  sectionLoadingStates,
} from '../../utils/hooks/useUserAuctionSettingsForm';
import UserAuctionSettingsModal from '../../components/modals/UserAuctionSettingsModal';

const UserAuctionSettings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(sectionLoadingStates);
  const [updateUser] = useUpdateUserMutation();
  const location = useLocation();
  const cameFromAuction = location?.state?.cameFromAuction === 'true';
  const customCampaignLink = location?.state?.customCampaignLink;
  const state = useSelector((state: RootState) => state);
  const user = state.user;
  const [modal, setModal] = useState({ open: false, open2: false, text: '' });
  const openAddressModal = (text: string) => setModal({ open: true, open2: false, text });
  const openAuctionModal = (text: string) => setModal({ open: false, open2: true, text });
  const closeModal = () => {
    setModal({ open: false, open2: false, text: '' });
  };

  const handleUpdateUser = async (e: any, section: string, data: any) => {
    e.preventDefault();
    setLoading({ ...sectionLoadingStates, [section]: true });

    await updateUser({
      id: user?.user?._id,
      type: section,
      data,
    })
      .unwrap()
      .then((updatedUser: any) => {
        if (updatedUser?.user?.shippingAddress && cameFromAuction) {
          openAuctionModal('Great! Your address can be updated anytime.');
          navigate(location.pathname, {
            state: {
              customCampaignLink,
            },
          });
        }
        setTimeout(() => {
          dispatch(resetUserSuccess());
          setLoading({ ...sectionLoadingStates });
        }, 3000);
      })
      .catch(() => setLoading({ ...sectionLoadingStates }));
  };

  const { inputs, handleInput } = useUserAuctionSettingsForm(user?.user);

  useEffect(() => {
    if (cameFromAuction) {
      openAddressModal(
        'In order to participate in the auction, you need to enter your address'
      );
    }
  }, [cameFromAuction]);

  return (
    <Fragment>
      <UserAuctionSettingsModal
        modal={modal}
        closeModal={closeModal}
        navigate={navigate}
        customCampaignLink={customCampaignLink}
      />
      <div className='w-full mx-auto pb-2'>
        <div className='bg-[#fff] border-[1px] border-gray-200 rounded-xl p-3 md:p-8'>
          <div className='grid grid-cols-12 gap-8 items-center'>
            <div className=' col-span-9 lg:col-span-4'>
              <p className='text-lg font-Matter-Medium text-slate-900'>
                User settings
              </p>
              <p className='font-Matter-Light text-sm tracking-wid text-slate-900'>
                Hide your name from all donations and bids
              </p>
            </div>
            <div className='col-span-3 lg:col-span-8'>
              <form className='flex flex-col gap-3 items-end'>
                <Form.Group controlId='anonymousBidding' className='mb-0'>
                  <Form.Check
                    type='switch'
                    checked={inputs.anonymousBidding || false}
                    onChange={(e: any) =>
                      handleUpdateUser(e, 'user', {
                        anonymousBidding: !inputs.anonymousBidding,
                      })
                    }
                    name='anonymousBidding'
                    id='anonymousBidding'
                  ></Form.Check>
                </Form.Group>
              </form>
            </div>
          </div>
          <div className='border-b border-[1px] border-gray-100 w-full my-10'></div>
          <div className='grid grid-cols-12 gap-8'>
            <div className='col-span-12 lg:col-span-4'>
              <p className='text-lg font-Matter-Medium text-slate-900'>
                Address
              </p>
              <p className='font-Matter-Light text-sm tracking-wid text-slate-900'>
                Your address is required before you can engage with the campaign
              </p>
            </div>
            <form className='col-span-12 lg:col-span-8'>
              <div className='flex flex-col mb-2'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='address'>
                  Address
                </label>
                <input
                  className='bg-[#fff] border-[1px] border-gray-200 rounded-md mb-2 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                  name='address'
                  onChange={handleInput}
                  type='text'
                  alt='Address'
                  value={inputs.address || ''}
                />
              </div>
              <div className='grid grid-cols-12 gap-3'>
                <div className='col-span-12 lg:col-span-6 flex flex-col'>
                  <label className='font-Matter-Medium text-sm' htmlFor='city'>
                    City
                  </label>
                  <input
                    className='bg-[#fff] border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                    name='city'
                    onChange={handleInput}
                    type='text'
                    alt='city'
                    value={inputs.city || ''}
                  />
                </div>
                <div className='col-span-12 lg:col-span-3 flex flex-col'>
                  <label className='font-Matter-Medium text-sm' htmlFor='state'>
                    State
                  </label>
                  <select
                    id='state'
                    name='state'
                    value={inputs.state || ''}
                    onChange={handleInput}
                    aria-label='Select state'
                    className='bg-[#fff] border-[1px] h-[46px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none text-sm cursor-pointer campaign-input'
                  >
                    {STATES.map((state: any, i: number) => (
                      <option className='text-zinc-300' key={i}>
                        {state.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='col-span-12 lg:col-span-3 flex flex-col'>
                  <label className='font-Matter-Medium text-sm' htmlFor='zipPostalCode'>
                    Zip code
                  </label>
                  <input
                    className='bg-[#fff] border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                    name='zipPostalCode'
                    onChange={handleInput}
                    type='text'
                    alt='zipPostalCode'
                    value={inputs.zipPostalCode || ''}
                  />
                </div>
              </div>
              <div className='flex items-center mt-5'>
                <button
                  className='flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer mr-3'
                  onClick={(e: any) =>
                    handleUpdateUser(e, 'address', {
                      shippingAddress: {
                        address: inputs.address,
                        city: inputs.city,
                        state: inputs.state,
                        zipPostalCode: inputs.zipPostalCode,
                      },
                    })
                  }
                >
                  {user?.success && user?.type === 'address' ? (
                    <i className='fas fa-check text-white'></i>
                  ) : loading.address ? (
                    <TailwindSpinner color='fill-white' />
                  ) : (
                    'Save'
                  )}
                </button>
                {location.state?.cameFromInstantBuy && user?.user?.shippingAddress && (
                  <Link
                    className='bg-yellow-to-green px-4 h-10 rounded-lg flex items-center justify-center font-Matter-Medium text-[#fff] hover:text-[#fff] hover:no-underline cursor-pointer hover:shadow-lg duration-200'
                    to={`/campaigns/${location.state?.customLinkId}/auction/item/${location.state?.auctionItemId}/buy`}
                  >
                    Take me back to item!
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAuctionSettings;
