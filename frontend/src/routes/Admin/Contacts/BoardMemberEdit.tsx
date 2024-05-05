import { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { CardTheme } from '../../../components/styles/admin/Styles';
import { themes } from '../../../utils/profileCardThemes';
import { STATES } from '../../../utils/states';
import { uploadFileToFirebase } from '../../../utils/uploadToFirebase';
import {
  useCreateBoardMemberMutation,
  useUpdateBoardMemberMutation,
} from '../../../redux/services/boardMemberApi';
import { Link } from 'react-router-dom';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';

const useBoardMemberEditForm = (callback?: any, data?: any) => {
  const values = {
    name: '',
    affiliation: '',
    email: '',
    image: '',
    profileCardTheme: '',
    location: '',
    bio: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data?.name,
        affiliation: data?.affiliation,
        email: data?.email,
        image: data?.image,
        profileCardTheme: data?.profileCardTheme || themes[0],
        location: data?.location,
        bio: data?.bio,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInput, setInputs, onSubmit };
};

const BoardMemberEdit = () => {
  const navigate = useNavigate();
  const {
    state: { boardMember, isEditMode },
  } = useLocation() as any;

  const [createBoardMember, { isLoading: loadingCreate }] =
    useCreateBoardMemberMutation();
  const [updateBoardMember, { isLoading: loadingUpdate }] =
    useUpdateBoardMemberMutation();

  const editBoardMemberCallback = async () => {
    if (isEditMode) {
      await updateBoardMember({
        _id: boardMember?._id,
        name: inputs.name,
        affiliation: inputs.affiliation,
        email: inputs.email,
        image: inputs.image,
        profileCardTheme: inputs.profileCardTheme,
        location: inputs.location,
        bio: inputs.bio,
      })
        .unwrap()
        .then(() => navigate('/admin/contacts/board-members'))
        .catch((err: any) => err);
    } else {
      await createBoardMember({
        name: inputs.name,
        affiliation: inputs.affiliation,
        email: inputs.email,
        image: inputs.image,
        profileCardTheme: inputs.profileCardTheme,
        location: inputs.location,
        bio: inputs.bio,
      })
        .unwrap()
        .then(() => navigate('/admin/contacts/board-members'))
        .catch((err: any) => err);
    }
  };

  const { inputs, handleInput, onSubmit, setInputs } = useBoardMemberEditForm(
    editBoardMemberCallback,
    boardMember
  );

  const editPhotoHandler = async (e: any) => {
    const imgData: any = await uploadFileToFirebase(e.target.files[0], true);
    setInputs((prev: any) => ({
      ...prev,
      image: imgData?.url,
    }));
    e.target.value = '';
  };

  return (
    <div className='flex flex-col gap-y-6'>
      <Link
        to={`/admin/contacts/board-members`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to board members</p>
      </Link>
      <form className='bg-white border-[1px] border-gray-200 rounded-xl py-4 px-2.5 md:p-8'>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>Main details</p>
          </div>
          <div className='col-span-12 md:col-span-8'>
            <div className='flex flex-col lg:flex-row gap-3 '>
              <div className='flex flex-col w-full'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='name'>
                  Name
                </label>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='name'
                  onChange={handleInput}
                  type='text'
                  alt='name'
                  value={inputs.name || ''}
                />
              </div>
              <div className='flex flex-col w-full'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='email'>
                  Email
                </label>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='email'
                  onChange={handleInput}
                  type='email'
                  alt='email'
                  value={inputs.email || ''}
                />
              </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-3'>
              <div className='flex flex-col w-full'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='location'>
                  State
                </label>
                <select
                  className='bg-white border-[1px] h-[46px] border-gray-200 rounded-md mb-4  py-2.5 px-4 font-Matter-Regular focus:outline-none'
                  id='location'
                  name='location'
                  value={inputs.location || ''}
                  onChange={handleInput}
                  aria-label='Select state'
                >
                  {STATES.map((state: any, i: number) => (
                    <option className='text-zinc-300' key={i} value={state.value}>
                      {state.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col w-full'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='affiliation'>
                  Affiliation
                </label>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='affiliation'
                  onChange={handleInput}
                  type='text'
                  alt='affiliation'
                  value={inputs.affiliation || ''}
                />
              </div>
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='bio' className='font-Matter-Medium text-sm mb-0'>
                Bio
              </label>
              <textarea
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                id='bio'
                name='bio'
                rows={5}
                value={inputs.bio || ''}
                onChange={handleInput}
                aria-label='Enter bio'
              ></textarea>
            </div>
          </div>
        </div>
        <div className='border-b border-[1px] border-gray-50 w-full my-10'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>Board memeber image</p>
            <p className='font-Matter-Light text-sm tracking-wid text-slate-900 dark:text-slate-400'>
              This image will be visible to the public
            </p>
          </div>
          <div className='col-span-12 md:col-span-8'>
            <Form.File
              id='image-file'
              label={
                <div className='w-64 h-64 aspect-square rounded-sm border-[1px] border-dashed border-gray-200 flex flex-col items-center justify-center p-3 cursor-pointer'>
                  {inputs.image ? (
                    <img
                      src={inputs.image}
                      alt=''
                      className={`object-contain cursor-pointer h-full w-full bg-gray-100 rounded-lg`}
                    />
                  ) : (
                    <>
                      <i className='fa-solid fa-cloud-arrow-up fa-xl mb-2 rounded-full bg-gray-200 text-blue-700 flex items-center justify-center h-12 w-12'></i>
                      <p className='font-Matter-Regular underline text-gray-400'>
                        Click to add photo
                      </p>
                    </>
                  )}
                </div>
              }
              onChange={editPhotoHandler}
            ></Form.File>
          </div>
        </div>
        <div className='border-b border-[1px] border-gray-50 w-full my-10'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>Profile card theme</p>
          </div>
          <div className='col-span-12 md:col-span-8'>
            <Form.Group controlId='profileCardTheme'>
              <label
                htmlFor='profileCardTheme'
                className='font-Matter-Medium text-sm mb-0'
              >
                Profile card theme
              </label>
              <div className='flex flex-wrap overflow-y-scroll h-[300px]'>
                {themes.map((theme: string, i: number) => (
                  <CardTheme
                    name='profileCardTheme'
                    key={i}
                    selected={theme === inputs.profileCardTheme}
                    inline
                    label={
                      <Image
                        className='w-20 h-20 object-cover cursor-pointer'
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
              className='mt-5 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
              onClick={onSubmit}
            >
              {loadingCreate || loadingUpdate ? (
                <TailwindSpinner color='fill-white' />
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BoardMemberEdit;
