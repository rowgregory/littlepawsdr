import { Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  useFetchUserAnonStatusAndShippingAddressDetailsQuery,
  useUpdateUserMutation,
} from '../../redux/services/userApi';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { resetUserSuccess } from '../../redux/features/user/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserAuctionSettingsForm, {
  sectionLoadingStates,
} from '../../utils/hooks/useUserAuctionSettingsForm';
import UserAuctionSettingsModal from '../../components/modals/UserAuctionSettingsModal';
import ShippingAddressForm from '../../components/forms/ShippingAddressForm';

const UserAuctionSettings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(sectionLoadingStates);
  const [updateUser] = useUpdateUserMutation();
  const location = useLocation();
  const cameFromAuction = location?.state?.cameFromAuction === 'true';
  const customCampaignLink = location?.state?.customCampaignLink;
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);
  const [modal, setModal] = useState({ open: false, open2: false, text: '' });
  const openAddressModal = (text: string) => setModal({ open: true, open2: false, text });
  const openAuctionModal = (text: string) => setModal({ open: false, open2: true, text });
  const closeModal = () => {
    setModal({ open: false, open2: false, text: '' });
  };

  useFetchUserAnonStatusAndShippingAddressDetailsQuery(auth?.user?._id, {
    refetchOnMountOrArgChange: true,
  });

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
      openAddressModal('In order to participate in the auction, you need to enter your address');
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
              <p className='text-lg font-Matter-Medium text-slate-900'>User settings</p>
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
              <p className='text-lg font-Matter-Medium text-slate-900'>Address</p>
              <p className='font-Matter-Light text-sm tracking-wid text-slate-900'>
                Your address is required before you can engage with the campaign
              </p>
            </div>
            <ShippingAddressForm
              handleInput={handleInput}
              inputs={inputs}
              user={user}
              loading={loading}
              handleUpdateUser={handleUpdateUser}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAuctionSettings;
