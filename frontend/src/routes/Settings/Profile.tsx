import { FormEvent, useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/toolkitStore';
import { openToast } from '../../redux/features/toastSlice';
import { Save } from 'lucide-react';
import { clearInputs, createFormActions, setInputs } from '../../redux/features/form/formSlice';
import { STATES } from '../../components/data/states';
import validateProfileForm from '../../validations/validateProfileForm';
import WelcomeDrawer from '../../components/WelcomeDrawer';
import { hydrateUserState } from '../../redux/features/user/userSlice';
import { useRemoveUserAddressMutation, useUpdateUserProfileMutation } from '../../redux/services/userApi';
import ProfileHeader from '../../components/settings/profile/ProfileHeader';
import PersonalInfoSection from '../../components/settings/profile/PersonalInfoSection';
import AddressManagementSection from '../../components/settings/profile/AddressManagementSection';
import AddressInfoSection from '../../components/settings/profile/AddressInfoSection';

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const { profileForm } = useAppSelector((state: RootState) => state.form);
  const [isEditing, setIsEditing] = useState(false);
  const { handleInput, setErrors } = createFormActions('profileForm', dispatch);

  const hasAddressData = (addr: any): boolean => {
    if (!addr || typeof addr !== 'object') return false;

    // Check if any of the core address fields have content
    const addressFields = ['address', 'city', 'state', 'zipPostalCode', 'name'];
    return addressFields.some((field) => addr[field] && addr[field].toString().trim() !== '');
  };

  useEffect(() => {
    if (user) {
      const shippingAddress = user?.user?.shippingAddress;
      const addressRef = user?.user?.addressRef;

      // Check which address sources have actual data
      const hasShipping = hasAddressData(shippingAddress);
      const hasRef = hasAddressData(addressRef);

      // Priority: addressRef > shippingAddress > empty object
      let selectedAddress: any = {};
      let addressSource = 'none';

      if (hasRef) {
        selectedAddress = addressRef;
        addressSource = 'addressRef';
      } else if (hasShipping) {
        selectedAddress = shippingAddress;
        addressSource = 'shippingAddress';
      }

      // Build form data
      const formData = {
        ...user?.user,
        // Only include address fields if we found a valid address
        ...(addressSource !== 'none'
          ? selectedAddress
          : {
              // Explicitly clear address fields if no address found
              address: '',
              city: '',
              state: '',
              zipPostalCode: '',
              name: '',
            }),
      };

      dispatch(
        setInputs({
          formName: 'profileForm',
          data: formData,
        })
      );
    }
  }, [user, dispatch]);

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [removeUserAddress, { isLoading: isRemovingAddress }] = useRemoveUserAddressMutation();

  // Helper function to detect changes
  const getChangedFields = (original: any, updated: any, fieldsToCheck: string[]) => {
    const changes: any = {};

    fieldsToCheck.forEach((field) => {
      if (updated[field] !== original[field]) {
        changes[field] = updated[field];
      }
    });

    return changes;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateProfileForm(profileForm?.inputs, setErrors);

    if (!isValid) {
      dispatch(
        openToast({
          message: 'Please fix the errors below',
          type: 'warning',
          position: 'bc',
        })
      );
      return;
    }

    try {
      const currentUser = user?.user;
      const currentAddress = currentUser?.addressRef || {};
      const formInputs = profileForm?.inputs;

      // Check for changes in personal info
      const personalChanges = getChangedFields(currentUser, formInputs, ['firstName', 'lastName', 'email']);

      // Check for changes in address info
      const addressChanges = getChangedFields(currentAddress, formInputs, ['address', 'city', 'state', 'zipPostalCode']);

      // Combine all changes
      const allChanges = {
        _id: currentUser?._id,
        ...personalChanges,
        ...addressChanges,
      };

      // Include addressRef if it exists or if we're updating address fields
      if (currentUser?.addressRef && Object.keys(addressChanges).length > 0) {
        allChanges.addressRef = currentUser?.addressRef;
      }

      // Check if any actual changes were made
      const hasChanges = Object.keys({ ...personalChanges, ...addressChanges }).length > 0;

      if (!hasChanges) {
        dispatch(
          openToast({
            message: 'No changes detected',
            type: 'info',
            position: 'bc',
          })
        );
        setIsEditing(false);
        return;
      }

      const updatedUser = await updateUserProfile(allChanges).unwrap();

      dispatch(hydrateUserState(updatedUser));
      dispatch(
        openToast({
          message: `Profile updated successfully! (${Object.keys({ ...personalChanges, ...addressChanges }).length} field${
            Object.keys({ ...personalChanges, ...addressChanges }).length > 1 ? 's' : ''
          } changed)`,
          type: 'success',
          position: 'bc',
        })
      );
      setIsEditing(false);
    } catch (error: any) {
      dispatch(
        openToast({
          message: error?.data?.message || 'Error updating profile, please try again',
          type: 'error',
          position: 'bc',
        })
      );
    }
  };

  const handleRemoveAddress = async () => {
    try {
      const updatedUser = await removeUserAddress({
        userId: user?.user?._id,
      }).unwrap();

      // Clear address fields from form
      dispatch(clearInputs({ formName: 'profileForm' }));

      dispatch(hydrateUserState(updatedUser));
      dispatch(
        openToast({
          message: 'Address removed successfully',
          type: 'success',
          position: 'bc',
        })
      );
    } catch (error: any) {
      dispatch(
        openToast({
          message: error?.data?.message || 'Error removing address, please try again',
          type: 'error',
          position: 'bc',
        })
      );
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    // Clear errors when toggling edit mode
    if (!isEditing) {
      setErrors({});
    }
  };

  return (
    <>
      <WelcomeDrawer userName={user?.user?.firstName || 'User'} />
      <div className='bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <ProfileHeader
            firstName={profileForm?.inputs?.firstName}
            lastName={profileForm?.inputs?.lastName}
            email={profileForm?.inputs?.email}
            isEditing={isEditing}
            onToggleEdit={toggleEdit}
          />

          <div className='bg-white rounded-2xl shadow-sm border border-gray-200'>
            <div className='p-8'>
              <form onSubmit={handleSubmit} className='space-y-8'>
                <PersonalInfoSection
                  inputs={profileForm?.inputs || {}}
                  errors={profileForm?.errors || {}}
                  handleInput={handleInput}
                  isEditing={isEditing}
                />

                <AddressInfoSection
                  inputs={profileForm?.inputs || {}}
                  errors={profileForm?.errors || {}}
                  handleInput={handleInput}
                  isEditing={isEditing}
                  states={STATES}
                />

                {/* Address Management Section - Only show when not editing and user has address */}
                {!isEditing && (
                  <AddressManagementSection
                    hasAddress={user?.user?.hasAddress || false}
                    addressData={user?.user?.addressRef || profileForm?.inputs}
                    onRemoveAddress={handleRemoveAddress}
                    isLoading={isRemovingAddress}
                  />
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className='flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-100'>
                    <button
                      type='button'
                      onClick={toggleEdit}
                      className='w-full sm:w-auto px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 rounded-xl hover:bg-gray-50'
                    >
                      Cancel Changes
                    </button>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className='w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]'
                    >
                      {isLoading ? (
                        <>
                          <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin'></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className='w-4 h-4' />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
