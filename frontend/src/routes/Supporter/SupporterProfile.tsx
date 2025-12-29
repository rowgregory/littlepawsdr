import { useState, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MapPin,
  Edit2,
  Save,
  X,
  AlertTriangle,
  Trash2,
  Heart,
  Home,
  Package,
  IdCard,
  Gavel,
  ShoppingBag,
} from 'lucide-react';
import { useAppDispatch, useFormSelector, useUserSelector } from '../../redux/toolkitStore';
import {
  useDeleteUserAddressMutation,
  useUpdateUserProfileMutation,
} from '../../redux/services/userApi';
import { createFormActions, setInputs } from '../../redux/features/form/formSlice';
import { hydrateUserState } from '../../redux/features/userSlice';
import { showToast } from '../../redux/features/toastSlice';
import { useFormInitialize } from '../../hooks/useFormInitialize';
import { STATES } from '../../components/data/states';
import { Link } from 'react-router-dom';
import {
  ADDRESS_FORM_FIELDS,
  DACHSHUND_PREFERENCES_FORM_FIELDS,
  PERSONAL_FORM_FIELDS,
  PROFILE_GRADIENTS,
  YOUR_HOME_FORM_FIELDS,
} from '../../lib/constants/supporter';

const SupporterProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useUserSelector();
  const { profileForm } = useFormSelector();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressConfirm, setShowAddressConfirm] = useState(false);
  const [updateUserProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
  const [deleteUserAddress, { isLoading: isRemovingAddress }] = useDeleteUserAddressMutation();
  const { handleInput, handleToggle } = createFormActions('profileForm', dispatch);
  const [showGradientMenu, setShowGradientMenu] = useState(false);

  const inputs = profileForm?.inputs;

  // Get address data
  const shippingAddress = user?.shippingAddress;
  const addressRef = user?.addressRef;

  const hasAddressData = (addr: any): boolean => {
    if (!addr || typeof addr !== 'object') return false;
    const addressFields = ['address', 'city', 'state', 'zipPostalCode'];
    return addressFields.some((field) => addr[field] && addr[field].toString().trim() !== '');
  };

  const hasShipping = hasAddressData(shippingAddress);
  const hasRef = hasAddressData(addressRef);

  let selectedAddress: any = {};
  if (hasRef) {
    selectedAddress = addressRef;
  } else if (hasShipping) {
    selectedAddress = shippingAddress;
  }

  // Initialize form with hook
  const formData = {
    ...user,
    ...(hasRef || hasShipping
      ? selectedAddress
      : {
          address: '',
          addressLine2: '',
          city: '',
          state: '',
          zipPostalCode: '',
        }),
    jobTitle: user?.jobTitle || '',
    firstNameFirstInitial: user?.firstNameFirstInitial || '',
    lastNameFirstInitial: user?.lastNameFirstInitial || '',
    profileGradient: user?.profileGradient || '',
    workSchedule: user?.workSchedule || 'full-time',
    isPublic: Boolean(user?.isPublic) || false,
    homeType: user?.yourHome?.homeType || '',
    yardType: user?.yourHome?.yardType || '',
    hasYardFence: Boolean(user?.yourHome?.hasYardFence) || false,
    hasOtherDogs: Boolean(user?.yourHome?.hasOtherDogs) || false,
    numberOfDogs: user?.yourHome?.numberOfDogs || 0,
    willingToTrain: Boolean(user?.yourHome?.willingToTrain) || false,
    childrenInHome: Boolean(user?.yourHome?.childrenInHome) || false,
    childAges: user?.yourHome?.childAges || [],
    preferredSize: user?.dachshundPreferences?.preferredSize || '',
    preferredAge: user?.dachshundPreferences?.preferredAge || '',
    preferredCoat: user?.dachshundPreferences?.preferredCoat || [],
    preferredTemperament: user?.dachshundPreferences?.preferredTemperament || [],
    trainingExperience: Boolean(user?.dachshundPreferences?.trainingExperience) || false,
  };

  useFormInitialize({
    formName: 'profileForm',
    data: formData,
    shouldInitialize: !!user,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const currentUser = user;
      const currentAddress = currentUser?.addressRef || {};
      const formInputs = profileForm?.inputs;

      const getChangedFields = (original: any, updated: any, fieldsToCheck: string[]) => {
        const changes: any = {};
        fieldsToCheck.forEach((field) => {
          if (updated[field] !== original[field]) {
            changes[field] = updated[field];
          }
        });
        return changes;
      };

      const personalChanges = getChangedFields(currentUser, formInputs, PERSONAL_FORM_FIELDS);

      const addressChanges = getChangedFields(currentAddress, formInputs, ADDRESS_FORM_FIELDS);

      const yourHome = getChangedFields(
        currentUser?.yourHome || {},
        formInputs,
        YOUR_HOME_FORM_FIELDS
      );

      const dachshundPreferences = getChangedFields(
        currentUser?.dachshundPreferences || {},
        formInputs,
        DACHSHUND_PREFERENCES_FORM_FIELDS
      );

      const hasChanges =
        Object.keys({
          ...personalChanges,
          ...addressChanges,
          ...yourHome,
          ...dachshundPreferences,
        }).length > 0;

      if (!hasChanges) {
        dispatch(showToast({ message: 'No changes detected', type: 'info' }));
        setIsEditing(false);
        return;
      }

      const allChanges = {
        _id: currentUser?._id,
        ...personalChanges,
        ...addressChanges,
        ...(Object.keys(yourHome).length > 0 && {
          yourHome: { ...currentUser?.yourHome, ...yourHome },
        }),
        ...(Object.keys(dachshundPreferences).length > 0 && {
          dachshundPreferences: { ...currentUser?.dachshundPreferences, ...dachshundPreferences },
        }),
      };

      if (currentUser?.addressRef && Object.keys(addressChanges).length > 0) {
        allChanges.addressRef = currentUser?.addressRef;
      }

      const updatedUser = await updateUserProfile(allChanges).unwrap();
      dispatch(hydrateUserState(updatedUser));
      dispatch(showToast({ message: `Profile updated successfully!`, type: 'success' }));
      setIsEditing(false);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.data?.message || 'Error updating profile',
          type: 'error',
        })
      );
    }
  };

  const handleRemoveAddress = async () => {
    try {
      const updatedUser = await deleteUserAddress({
        userId: user?._id,
      }).unwrap();

      dispatch(hydrateUserState(updatedUser));
      dispatch(showToast({ message: 'Address deleted successfully', type: 'success' }));
      setShowAddressConfirm(false);
    } catch (error: any) {
      dispatch(
        showToast({
          message: error?.data?.message || 'Error removing address',
          type: 'error',
        })
      );
    }
  };

  const handleGradientChange = (gradient: string) => {
    handleInput({ target: { name: 'profileGradient', value: gradient } });
    setShowGradientMenu(false);
  };

  return (
    <div className='space-y-6'>
      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className='bg-white border border-gray-200 rounded-lg p-6'
      >
        <div className='flex flex-col lg:flex-row gap-6 items-center lg:items-start justify-between'>
          <div className='flex flex-col lg:flex-row gap-6 items-center flex-1'>
            {/* Profile Picture */}
            <div className='relative group'>
              <motion.p
                whileHover={isEditing ? { scale: 1.05 } : {}}
                className={`w-24 h-24 text-white tracking-tighter text-3xl font-bold bg-gradient-to-br ${
                  inputs?.profileGradient || 'from-blue-500 to-blue-700'
                } rounded-full flex items-center justify-center flex-shrink-0 ${
                  isEditing ? 'cursor-pointer' : 'cursor-default opacity-60'
                }`}
                onClick={() => isEditing && setShowGradientMenu(!showGradientMenu)}
              >
                {inputs?.firstNameFirstInitial} {inputs?.lastNameFirstInitial}
              </motion.p>

              {showGradientMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='absolute top-full mt-2 left-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10'
                >
                  <p className='text-xs font-semibold text-gray-900 mb-2'>Choose gradient:</p>
                  <div className='grid grid-cols-3 gap-2'>
                    {PROFILE_GRADIENTS.map((gradient) => (
                      <motion.button
                        key={gradient}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGradientChange(gradient)}
                        className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-full border-2 ${
                          inputs?.profileGradient === gradient
                            ? 'border-gray-900'
                            : 'border-transparent'
                        }`}
                        title={gradient}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Basic Info */}
            <div className='flex-1 text-center lg:text-left'>
              <div className='flex items-center gap-x-2'>
                <h2 className='text-2xl font-bold text-gray-900'>
                  {inputs?.firstName} {inputs?.lastName}
                </h2>
                {inputs?.hasAddress && (
                  <span className='w-5 h-5 flex items-center justify-center bg-teal-100 text-teal-700 text-xs font-semibold rounded-full'>
                    ✓
                  </span>
                )}
              </div>
              <p className='text-sm text-gray-600 mt-1'>{inputs?.email}</p>
            </div>
          </div>

          {/* Status and Buttons */}
          <div className='flex flex-col items-center lg:items-end gap-3'>
            <div className='flex flex-col gap-2 w-full lg:w-auto'>
              <motion.button
                type='button'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isEditing
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {isEditing ? (
                  <>
                    <X className='w-4 h-4' />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit2 className='w-4 h-4' />
                    Edit Profile
                  </>
                )}
              </motion.button>

              {isEditing && (
                <motion.button
                  type='submit'
                  onClick={handleSubmit}
                  disabled={isUpdating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50'
                >
                  {isUpdating ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className='w-4 h-4' />
                      Save Changes
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='order-2 lg:order-1 col-span-12 lg:col-span-3 space-y-6'
        >
          <div className='h-fit bg-white border border-gray-200 rounded-lg p-6'>
            <h3 className='text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2'>
              <IdCard className='w-4 h-4' />
              Contact
            </h3>
            <div className='space-y-3'>
              <div>
                <label className='block text-xs text-gray-600 mb-1'>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  value={inputs?.firstName || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                />
              </div>

              <div>
                <label className='block text-xs text-gray-600 mb-1'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={inputs?.lastName || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                />
              </div>

              <div>
                <label className='block text-xs text-gray-600 mb-1'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={inputs?.email || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                />
              </div>
            </div>

            {/* Job Title Section */}
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <h4 className='text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide'>
                Professional
              </h4>
              <div className='space-y-3'>
                <div>
                  <label className='block text-xs text-gray-600 mb-1'>Job Title</label>
                  <input
                    type='text'
                    name='jobTitle'
                    value={inputs?.jobTitle || ''}
                    onChange={handleInput}
                    disabled={!isEditing}
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                    placeholder='e.g., Software Engineer'
                  />
                </div>

                <div>
                  <label className='block text-xs text-gray-600 mb-1'>Work Schedule</label>
                  <select
                    name='workSchedule'
                    value={inputs?.workSchedule || ''}
                    onChange={handleInput}
                    disabled={!isEditing}
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                  >
                    <option value=''>Select...</option>
                    <option value='home'>Work from home</option>
                    <option value='part-time'>Part-time</option>
                    <option value='full-time'>Full-time</option>
                    <option value='retired'>Retired</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Visibility Section */}
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <h4 className='text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide'>
                Privacy
              </h4>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  name='isPublic'
                  checked={inputs?.isPublic || false}
                  onChange={handleToggle}
                  disabled={!isEditing}
                  className='w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600 disabled:opacity-50'
                />
                <span className='text-sm text-gray-900'>Make profile public</span>
              </label>
              <p className='text-xs text-gray-500 mt-2'>
                This feature is currently in beta. Even if enabled, your information is not publicly
                visible yet.
              </p>
            </div>
          </div>
          <div className='h-fit bg-white border border-gray-200 rounded-lg p-6'>
            <h3 className='text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide'>
              Quick Actions
            </h3>
            <div className='space-y-2'>
              <Link
                to='/donate'
                className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium rounded-lg transition-colors'
              >
                <Heart className='w-4 h-4' />
                Donate
              </Link>
              <Link
                to='/auctions'
                className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium rounded-lg transition-colors'
              >
                <Gavel className='w-4 h-4' />
                Auctions
              </Link>
              <Link
                to='/store'
                className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium rounded-lg transition-colors'
              >
                <ShoppingBag className='w-4 h-4' />
                Store
              </Link>
            </div>
          </div>
        </motion.div>

        {/*  Shipping Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='order-1 lg:order-2 col-span-12 lg:col-span-6 h-fit space-y-6'
        >
          <div className='bg-white border border-gray-200 rounded-lg p-6'>
            <h3 className='text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2'>
              <Package className='w-4 h-4' />
              Shipping Address
            </h3>
            {user?.hasAddress ? (
              <div className='text-xs text-green-700 bg-green-50 border border-green-200 rounded p-2 mb-4 flex items-center gap-x-2'>
                ✓ Address verified
              </div>
            ) : (
              <p className='text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 mb-4 flex items-center gap-x-2'>
                <AlertTriangle className='w-4 h-4' /> A shipping address is required to participate
                in auctions.
              </p>
            )}
            <div className='space-y-3'>
              <div>
                <label className='block text-xs text-gray-600 mb-1'>Street Address</label>
                <input
                  type='text'
                  name='address'
                  value={inputs?.address || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                />
              </div>
              <div>
                <label className='block text-xs text-gray-600 mb-1'>Address Line 2</label>
                <input
                  type='text'
                  name='addressLine2'
                  value={inputs?.addressLine2 || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                />
              </div>

              <div>
                <label className='block text-xs text-gray-600 mb-1'>City</label>
                <input
                  type='text'
                  name='city'
                  value={inputs?.city || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                />
              </div>

              <div>
                <label className='block text-xs text-gray-600 mb-1'>State</label>
                <select
                  name='state'
                  value={inputs?.state || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 disabled:opacity-50 disabled:bg-gray-50'
                >
                  {STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.text}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-xs text-gray-600 mb-1'>ZIP</label>
                <input
                  type='text'
                  name='zipPostalCode'
                  value={inputs?.zipPostalCode || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                />
              </div>
            </div>
          </div>

          {/* Address Management */}
          {user?.hasAddress && (
            <div className='h-fit bg-white border border-gray-200 rounded-lg p-6'>
              <div className='mb-6 pb-6 border-b border-gray-200'>
                <h3 className='text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide flex items-center gap-2'>
                  <MapPin className='w-4 h-4 ' />
                  Address Management
                </h3>
                <div>
                  <p className='text-xs text-gray-600 mt-1'>
                    Remove your saved address if no longer needed
                  </p>
                </div>
              </div>

              {/* Current Address Display */}
              <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                <h3 className='font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide'>
                  Current Address:
                </h3>
                <div className='text-xs text-gray-700'>
                  <p>
                    {inputs?.address} {inputs?.addressLine2 && `, ${inputs?.addressLine2}`}
                  </p>
                  <p>
                    {inputs?.city}, {inputs?.state} {inputs?.zipPostalCode}
                  </p>
                </div>
              </div>

              {/* Remove Address Section */}
              {!showAddressConfirm ? (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='bg-red-50 border border-red-200 rounded-lg p-4'
                  >
                    <div className='flex items-start gap-3'>
                      <AlertTriangle className='w-4 h-4 text-red-600 mt-0.5 flex-shrink-0' />
                      <div className='flex-1'>
                        <h3 className='text-sm font-medium text-red-800 mb-2 uppercase tracking-wide'>
                          Remove Address
                        </h3>
                        <p className='text-xs text-red-700 mb-3'>
                          Removing your address will prevent you from participating in auctions
                          until you add a new one.
                        </p>
                        <motion.button
                          type='button'
                          onClick={() => setShowAddressConfirm(true)}
                          disabled={isRemovingAddress}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors disabled:opacity-50'
                        >
                          <Trash2 className='w-4 h-4' />
                          Remove Address
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                /* Confirmation Dialog */

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='bg-red-50 border border-red-200 rounded-lg p-4'
                >
                  <div className='flex items-start gap-3'>
                    <AlertTriangle className='w-4 h-4 text-red-600 flex-shrink-0' />
                    <div className='flex-1'>
                      <h3 className='text-sm font-medium text-red-800 mb-2 uppercase tracking-wide'>
                        Confirm Address Removal
                      </h3>
                      <p className='text-xs text-red-700 mb-4'>
                        Are you sure you want to remove your address? This action cannot be undone
                        and you'll need to re-enter your address to participate in future auctions.
                      </p>
                      <div className='flex gap-3'>
                        <motion.button
                          type='button'
                          onClick={handleRemoveAddress}
                          disabled={isRemovingAddress}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors disabled:opacity-50'
                        >
                          {isRemovingAddress ? (
                            <>
                              <div className='w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin' />
                              Removing...
                            </>
                          ) : (
                            <>
                              <Trash2 className='w-4 h-4' />
                              Yes, Remove Address
                            </>
                          )}
                        </motion.button>
                        <motion.button
                          type='button'
                          onClick={() => setShowAddressConfirm(false)}
                          disabled={isRemovingAddress}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-colors'
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Right Column - Your Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='order-3 col-span-12 lg:col-span-3 space-y-6'
        >
          <div className='hit-fit bg-white border border-gray-200 rounded-lg p-6'>
            <h3 className='text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2'>
              <Home className='w-4 h-4' />
              Your Home
            </h3>
            <div className='space-y-3'>
              <div>
                <label className='block text-xs text-gray-600 mb-1'>Home Type</label>
                <select
                  name='homeType'
                  value={inputs?.homeType || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                >
                  <option value=''>Select...</option>
                  <option value='apartment'>Apartment</option>
                  <option value='house'>House</option>
                  <option value='farm'>Farm</option>
                  <option value='other'>Other</option>
                </select>
              </div>

              <div>
                <label className='block text-xs text-gray-600 mb-1'>Yard Type</label>
                <select
                  name='yardType'
                  value={inputs?.yardType || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                >
                  <option value=''>Select...</option>
                  <option value='none'>No yard</option>
                  <option value='small'>Small yard</option>
                  <option value='medium'>Medium yard</option>
                  <option value='large'>Large yard</option>
                </select>
              </div>

              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  name='hasYardFence'
                  checked={inputs?.hasYardFence || false}
                  onChange={handleToggle}
                  disabled={!isEditing}
                  className='w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600 disabled:opacity-50'
                />
                <span className='text-sm text-gray-900'>Yard is fenced</span>
              </label>

              <div>
                <label className='block text-xs text-gray-600 mb-1'>Have other dogs?</label>
                <select
                  name='hasOtherDogs'
                  value={inputs?.hasOtherDogs ? 'true' : 'false'}
                  onChange={(e) =>
                    handleInput({
                      target: { name: 'hasOtherDogs', value: e.target.value === 'true' },
                    })
                  }
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                >
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
              </div>

              {inputs?.hasOtherDogs && (
                <div>
                  <label className='block text-xs text-gray-600 mb-1'>How many?</label>
                  <input
                    type='number'
                    name='numberOfDogs'
                    value={inputs?.numberOfDogs || ''}
                    onChange={handleInput}
                    disabled={!isEditing}
                    min='0'
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                  />
                </div>
              )}

              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  name='willingToTrain'
                  checked={inputs?.willingToTrain || false}
                  onChange={handleToggle}
                  disabled={!isEditing}
                  className='w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600 disabled:opacity-50'
                />
                <span className='text-sm text-gray-900'>Willing to train</span>
              </label>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  name='childrenInHome'
                  checked={inputs?.childrenInHome || false}
                  onChange={handleToggle}
                  disabled={!isEditing}
                  className='w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600 disabled:opacity-50'
                />
                <span className='text-sm text-gray-900'>Children in home</span>
              </label>

              {inputs?.childrenInHome && (
                <div className='ml-6'>
                  <label className='block text-xs text-gray-600 mb-1'>Children ages</label>
                  <input
                    type='text'
                    name='childAges'
                    value={(inputs?.childAges || []).join(', ')}
                    onChange={(e) => {
                      const ages = e.target.value
                        .split(',')
                        .map((age) => parseInt(age.trim()))
                        .filter((age) => !isNaN(age));
                      dispatch(setInputs({ formName: 'profileForm', data: { childAges: ages } }));
                    }}
                    disabled={!isEditing}
                    placeholder='5, 8, 12'
                    className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                  />
                </div>
              )}
            </div>
          </div>
          {/* Dachshund Preferences Section */}
          <div className='h-fit bg-white border border-gray-200 rounded-lg p-6'>
            <h3 className='text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide flex items-center gap-2'>
              <Heart className='w-4 h-4' />
              Dachshund Preferences
            </h3>
            <div className='grid grid-cols-1 gap-6'>
              <div>
                <label className='block text-xs text-gray-600 mb-2 uppercase tracking-wide'>
                  Size
                </label>
                <select
                  name='preferredSize'
                  value={inputs?.preferredSize || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                >
                  <option value=''>Select...</option>
                  <option value='miniature'>Miniature</option>
                  <option value='standard'>Standard</option>
                  <option value='no-preference'>No preference</option>
                </select>
              </div>

              <div>
                <label className='block text-xs text-gray-600 mb-2 uppercase tracking-wide'>
                  Age
                </label>
                <select
                  name='preferredAge'
                  value={inputs?.preferredAge || ''}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:bg-gray-50'
                >
                  <option value=''>Select...</option>
                  <option value='puppy'>Puppy</option>
                  <option value='young-adult'>Young Adult</option>
                  <option value='adult'>Adult</option>
                  <option value='senior'>Senior</option>
                  <option value='no-preference'>No preference</option>
                </select>
              </div>

              <div>
                <label className='block text-xs text-gray-600 mb-2 uppercase tracking-wide'>
                  Coat Type
                </label>
                <div className='space-y-1'>
                  {['smooth', 'wirehaired', 'longhaired'].map((coat) => (
                    <label key={coat} className='flex items-center gap-2 cursor-pointer'>
                      <input
                        type='checkbox'
                        name='preferredCoat'
                        value={coat}
                        checked={(inputs?.preferredCoat || []).includes(coat)}
                        onChange={(e) => {
                          const current = inputs?.preferredCoat || [];
                          const updated = e.target.checked
                            ? [...current, coat]
                            : current.filter((c: string) => c !== coat);
                          dispatch(
                            setInputs({ formName: 'profileForm', data: { preferredCoat: updated } })
                          );
                        }}
                        disabled={!isEditing}
                        className='w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600 disabled:opacity-50'
                      />
                      <span className='text-xs text-gray-900 capitalize'>{coat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  <label className='block text-xs text-gray-600 mb-2'>Preferred Temperament</label>
                  <div className='space-y-2'>
                    {['friendly', 'calm', 'playful', 'independent'].map((temperament) => (
                      <label key={temperament} className='flex items-center gap-2 cursor-pointer'>
                        <input
                          type='checkbox'
                          name='preferredTemperament'
                          value={temperament}
                          checked={(inputs?.preferredTemperament || []).includes(temperament)}
                          onChange={(e) => {
                            const current = inputs?.preferredTemperament || [];
                            const updated = e.target.checked
                              ? [...current, temperament]
                              : current.filter((t: string) => t !== temperament);
                            handleInput({
                              target: { name: 'preferredTemperament', value: updated },
                            });
                          }}
                          disabled={!isEditing}
                          className='w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600 disabled:opacity-50'
                        />
                        <span className='text-xs text-gray-900 capitalize'>{temperament}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 pt-6 border-t border-gray-200'>
              <div className='space-y-2'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    name='trainingExperience'
                    checked={inputs?.trainingExperience || false}
                    onChange={handleToggle}
                    disabled={!isEditing}
                    className='w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-gray-600 disabled:opacity-50'
                  />
                  <span className='text-sm text-gray-900'>Have dog training experience</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupporterProfile;
