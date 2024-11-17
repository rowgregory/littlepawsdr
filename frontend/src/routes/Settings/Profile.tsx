import { FormEvent, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import {
  useFetchUserProfileDetailsQuery,
  useUpdateUserProfileDetailsMutation,
} from '../../redux/services/userApi';
import { useLocation } from 'react-router-dom';
import AccountCreatedModal from '../../components/modals/AccountCreatedModal';
import { hydrateAuthUserState } from '../../redux/features/auth/authSlice';
import UserProfileDetailsForm from '../../components/forms/UserProfileDetailsForm';
import useForm from '../../hooks/useForm';
import validateProfileDetailsForm from '../../validations/validateProfileDetailsForm';
import { openToast } from '../../redux/features/toastSlice';

const Profile = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const auth = useSelector((state: RootState) => state.auth);
  const userJustCreatedAnAccount = location?.state?.accountWasJustCreated;
  const [toggleModal, setToggleModal] = useState(userJustCreatedAnAccount);
  const closeModal = () => setToggleModal(false);

  const [updateUserProfileDetails, { isLoading }] = useUpdateUserProfileDetailsMutation();
  useFetchUserProfileDetailsQuery(auth?.user?._id, {
    refetchOnMountOrArgChange: true,
  });

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateProfileDetailsForm(inputs);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      await updateUserProfileDetails({
        _id: auth.user?._id,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
      })
        .unwrap()
        .then((data: any) => {
          dispatch(hydrateAuthUserState(data.user));
          dispatch(openToast({ message: 'User profile updated', success: true, open: true }));
        })
        .catch(() => {
          dispatch(openToast({ message: 'Error, please try again', success: false, open: true }));
        });
    }
  };

  const { inputs, errors, handleInput, setErrors } = useForm(['firstName', 'lastName'], user.user);

  return (
    <Fragment>
      <AccountCreatedModal accountCreated={toggleModal} closeModal={closeModal} />
      <div className='grid grid-cols-12 gap-3 bg-white w-full mx-auto pb-3 border-[1px] border-gray-200 rounded-xl p-3 md:p-8'>
        <div className='col-span-12 md:col-span-4'>
          <p className='text-lg font-Matter-Medium text-slate-900 '>Profile details</p>
          <p className='font-Matter-Light text-sm tracking-wid text-slate-900 '>
            Update your information
          </p>
        </div>
        <div className='col-span-12 md:col-span-8 md:col-start-6'>
          <UserProfileDetailsForm
            inputs={inputs}
            handleInput={handleInput}
            handleUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            errors={errors}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
