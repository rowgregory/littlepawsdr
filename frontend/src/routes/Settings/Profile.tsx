import { Fragment, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { themes } from '../../utils/profileCardThemes';
import { CardTheme } from '../../components/styles/admin/Styles';
import { STATES } from '../../utils/states';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { useUpdateUserMutation } from '../../redux/services/userApi';
import { resetUserSuccess } from '../../redux/features/user/userSlice';
import TailwindSpinner from '../../components/Loaders/TailwindSpinner';
import useProfileForm, {
  sectionLoadingStates,
  validateProfileForm,
} from '../../utils/hooks/useProfileForm';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(sectionLoadingStates);
  const [modal, setModal] = useState({ toggle: false, text: '' });
  const isAdmin = user.user?.isAdmin || false;
  const openModal = (text: string) => setModal({ toggle: true, text });
  const closeModal = () => setModal({ toggle: false, text: '' });
  const location = useLocation();
  const userJustCreatedAnAccount = location?.state?.accountWasJustCreated;
  const navigate = useNavigate();

  const [updateUser] = useUpdateUserMutation();

  const handleUpdateUser = async (e: any, section: string, data: any) => {
    e.preventDefault();
    setLoading({ ...sectionLoadingStates, [section]: true });

    const valid = validateProfileForm({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
    });

    if (valid) {
      await updateUser({
        id: user.user?._id,
        type: section,
        data,
      })
        .unwrap()
        .then(() => {
          setTimeout(() => {
            dispatch(resetUserSuccess());
            setLoading({ ...sectionLoadingStates });
          }, 3000);
        })
        .catch(() => setLoading({ ...sectionLoadingStates }));
    } else {
      openModal('error');
      setLoading({ ...sectionLoadingStates });
    }
  };

  const { inputs, handleInput, setInputs } = useProfileForm(user.user);

  const editPhotoHandler = async (e: any) => {
    const downloadUrl: any = await uploadFileToFirebase(e.target.files[0], false);
    setInputs((prev: any) => ({ ...prev, avatar: downloadUrl }));
    e.target.value = '';
  };

  return (
    <Fragment>
      <Modal show={modal.toggle || userJustCreatedAnAccount} onHide={closeModal} centered>
        <div className='bg-white rounded-xl p-8 w-full'>
          <i
            onClick={closeModal}
            className='fa-solid fa-xmark fa-sm text-gray-500 flex justify-end mb-4 cursor-pointer'
          ></i>
          {modal.text === 'error' && (
            <>
              <i className='fa-solid fa-circle-exclamation text-red-500 fa-2x flex justify-center mb-3'></i>
              <p className='text-red-500 text-sm font-Matter-Medium text-center mb-2'>
                Incorrect credentials
              </p>
            </>
          )}
        </div>
      </Modal>
      <Modal show={userJustCreatedAnAccount} onHide={closeModal} centered>
        <div className='bg-white rounded-xl p-8 w-full'>
          <i
            onClick={closeModal}
            className='fa-solid fa-xmark fa-sm text-gray-500 flex justify-end mb-4 cursor-pointer'
          ></i>
          {userJustCreatedAnAccount && (
            <div className='flex flex-col justify-center items-center'>
              <i className='fa-solid fa-envelope-circle-check text-teal-500 fa-2x flex justify-center'></i>
              <p className='font-Matter-Medium text-xl text-center mb-3 mt-2'>
                Email confirmed!
              </p>
              <p className='font-Matter-Regular text-center'>
                Your account has been successfully created. Welcome to your profile, where
                you can access all your purchases and manage your account details.
              </p>
              <button
                onClick={() => {
                  navigate(location.pathname, { state: null });
                  closeModal();
                }}
                className='mt-5 px-4 py-2 rounded-lg bg-teal-400 text-[#fff] font-matter-Medium text-lg duration-200 hover:bg-teal-500 hover:shadow-xl'
              >
                Lets go see
              </button>
            </div>
          )}
        </div>
      </Modal>
      <div className='pb-3'>
        <div className='w-full mx-auto'>
          <div className='bg-[#fff]  border-[1px] border-gray-200 rounded-xl p-3 md:p-8'>
            <div className='grid grid-cols-12 gap-3'>
              <div className='col-span-12 md:col-span-4'>
                <p className='text-lg font-Matter-Medium text-slate-900 '>
                  Profile details
                </p>
                <p className='font-Matter-Light text-sm tracking-wid text-slate-900 '>
                  Update your information
                </p>
              </div>
              <div className='col-span-12 md:col-span-8 md:col-start-6'>
                <form className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-3 md:flex-row'>
                    <div className='flex flex-col w-full'>
                      <label
                        className='font-Matter-Medium text-sm mb-0'
                        htmlFor='firstName'
                      >
                        First name
                      </label>
                      <input
                        className='user-input bg-[#fff] border-[1px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none'
                        name='firstName'
                        onChange={handleInput}
                        type='text'
                        alt='First Name'
                        value={inputs.firstName || ''}
                      />
                    </div>
                    <div className='flex flex-col w-full'>
                      <label
                        className='font-Matter-Medium text-sm mb-0'
                        htmlFor='lastName'
                      >
                        Last name
                      </label>
                      <input
                        className='user-input bg-[#fff] border-[1px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none'
                        name='lastName'
                        onChange={handleInput}
                        type='text'
                        alt='Last Name'
                        value={inputs.lastName || ''}
                      />
                    </div>
                  </div>
                  {isAdmin && (
                    <Fragment>
                      <div className='flex flex-col gap-3 md:flex-row'>
                        <div className='flex flex-col w-full'>
                          <label
                            className='font-Matter-Medium text-sm mb-0'
                            htmlFor='volunteerTitle'
                          >
                            Volunteer Position
                          </label>
                          <input
                            className='user-input bg-[#fff] border-[1px] border-gray-200 rounded-md  py-2.5 px-4 font-Matter-Regular focus:outline-none'
                            name='volunteerTitle'
                            onChange={handleInput}
                            type='text'
                            alt='Volunteer Position'
                            value={inputs.volunteerTitle || ''}
                          />
                        </div>
                        <div className='flex flex-col w-full'>
                          <label
                            className='font-Matter-Medium text-sm mb-1'
                            htmlFor='location'
                          >
                            State
                          </label>
                          <select
                            className='user-input bg-[#fff] border-[1px] h-[46px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none text-sm cursor-pointer campaign-input'
                            id='location'
                            name='location'
                            value={inputs.location || ''}
                            onChange={handleInput}
                            aria-label='Select state'
                          >
                            {STATES.map((state: any, i: number) => (
                              <option
                                className='text-zinc-300'
                                key={i}
                                value={state.value}
                              >
                                {state.text}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className='flex flex-col w-full'>
                        <label htmlFor='bio' className='font-Matter-Medium text-sm mb-0'>
                          Bio
                        </label>
                        <textarea
                          className='user-input bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                          id='bio'
                          name='bio'
                          rows={5}
                          value={inputs.bio || ''}
                          onChange={handleInput}
                          aria-label='Enter bio'
                        ></textarea>
                      </div>
                    </Fragment>
                  )}
                  <button
                    className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular'
                    onClick={(e: any) =>
                      handleUpdateUser(
                        e,
                        'details',
                        isAdmin
                          ? {
                            firstName: inputs.firstName,
                            lastName: inputs.lastName,
                            volunteerTitle: isAdmin ? inputs.volunteerTitle : '',
                            location: isAdmin ? inputs.location : '',
                            bio: isAdmin ? inputs.bio : '',
                          }
                          : { firstName: inputs.firstName, lastName: inputs.lastName }
                      )
                    }
                  >
                    {user?.success && user?.type === 'details' ? (
                      <i className='fas fa-check text-white'></i>
                    ) : loading.details ? (
                      <TailwindSpinner color='fill-white' />
                    ) : (
                      'Save'
                    )}
                  </button>
                </form>
              </div>
            </div>
            {isAdmin && (
              <Fragment>
                <div className='border-b border-[1px] border-gray-50 w-full my-10'></div>
                <div className='grid grid-cols-12 gap-3'>
                  <div className='col-span-12 md:col-span-4'>
                    <p className='text-lg font-Matter-Medium text-slate-900 '>
                      Profile picture
                    </p>
                    <p className='font-Matter-Light text-sm tracking-wid text-slate-900 '>
                      This image will be visible to the public
                    </p>
                  </div>
                  <div className='col-span-12 md:col-span-8 md:col-start-6'>
                    <form className='flex flex-col'>
                      <Form.File
                        id='image-file'
                        label={
                          <div className='w-64 h-64 aspect-square rounded-sm border-[1px] border-gray-200 flex flex-col items-center justify-center p-3 cursor-pointer'>
                            {inputs.avatar ? (
                              <img
                                src={inputs.avatar}
                                alt=''
                                className={`object-contain cursor-pointer h-full w-full bg-gray-100 rounded-lg`}
                              />
                            ) : (
                              <>
                                <i className='fa-solid fa-cloud-arrow-up fa-xl mb-2 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center h-12 w-12'></i>
                                <p className='font-Matter-Regular underline text-blue-400'>
                                  Click to add photo
                                </p>
                              </>
                            )}
                          </div>
                        }
                        onChange={editPhotoHandler}
                      ></Form.File>
                      {inputs.avatar && (
                        <button
                          onClick={(e: any) =>
                            handleUpdateUser(e, 'photo', {
                              avatar: '',
                            })
                          }
                          className='bg-red-500 text-white font-Matter-Medium w-fit rounded-md px-3.5 py-1.5'
                        >
                          Remove profile photo
                        </button>
                      )}
                      <button
                        className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
                        onClick={(e: any) =>
                          handleUpdateUser(e, 'photo', {
                            avatar: inputs.avatar,
                          })
                        }
                      >
                        {user?.success && user?.type === 'photo' ? (
                          <i className='fas fa-check text-white'></i>
                        ) : loading.photo ? (
                          <TailwindSpinner color='fill-white' />
                        ) : (
                          'Save'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
                <div className='border-b border-[1px] border-gray-50 w-full my-10'></div>
                <div className='grid grid-cols-12 gap-3'>
                  <div className='col-span-12 md:col-span-4'>
                    <p className='text-lg font-Matter-Medium text-slate-900 '>
                      Card theme
                    </p>
                    <p className='font-Matter-Light text-sm tracking-wid text-slate-900'>
                      Choose image to display as board member card background
                    </p>
                  </div>
                  <div className='col-span-12 md:col-span-8 md:col-start-6'>
                    <form className='flex flex-col'>
                      <Form.Group controlId='profileCardTheme'>
                        <div className='flex flex-wrap overflow-y-scroll h-[300px]'>
                          {themes.map((theme: string, i: number) => (
                            <CardTheme
                              name='profileCardTheme'
                              key={i}
                              selected={theme === inputs.profileCardTheme}
                              inline
                              label={
                                <img
                                  className='h-16 w-16 md:h-20 md:w-20 object-cover cursor-pointer'
                                  src={theme}
                                  alt={`${theme}-${i}`}
                                />
                              }
                              type='radio'
                              id={`inline-radio-${i} bgColor`}
                              value={theme || ''}
                              checked={inputs.profileCardTheme === theme}
                              onChange={handleInput}
                            />
                          ))}
                        </div>
                      </Form.Group>
                      <button
                        className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
                        onClick={(e: any) =>
                          handleUpdateUser(e, 'theme', {
                            profileCardTheme: inputs.profileCardTheme,
                          })
                        }
                      >
                        {user?.success && user?.type === 'theme' ? (
                          <i className='fas fa-check text-white'></i>
                        ) : loading.theme ? (
                          <TailwindSpinner color='fill-white' />
                        ) : (
                          'Save'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
