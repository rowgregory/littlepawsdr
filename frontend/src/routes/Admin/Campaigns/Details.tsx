import styled from 'styled-components';
import { Button, Form, FormFile } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import { uploadFileToFirebase } from '../../../utils/uploadToFirebase';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/toolkitStore';
import { useParams } from 'react-router-dom';
import { useUpdateCampaignMutation } from '../../../redux/services/campaignApi';
import { resetSuccess } from '../../../redux/features/campaign/campaignSlice';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';

const UploadImageBox = styled.div`
  width: 250px;
  height: 250px;
  aspect-ration: 1 / 1;
  border-radius: 12px;
  border: 1px dashed #d3d3d3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  cursor: pointer;
  i {
    background: #e4e4e7;
    border-radius: 50%;
    color: #505050;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 48px;
  }
`;

const themeColors = [
  {
    text: 'text-blue-700',
    darker: 'bg-blue-700',
    dark: 'bg-blue-500',
    xlight: 'bg-blue-50',
    light: 'bg-blue-100',
    gradient: 'bg-g-blue',
    border: 'border-blue-700',
    fill: 'fill-blue-700',
  },
  {
    text: 'text-cyan-700',
    darker: 'bg-cyan-700',
    dark: 'bg-cyan-500',
    xlight: 'bg-cyan-50',
    light: 'bg-cyan-100',
    gradient: 'bg-g-cyan',
    border: 'border-cyan-700',
    fill: 'fill-cyan-700',
  },
  {
    text: 'text-teal-700',
    darker: 'bg-teal-700',
    dark: 'bg-teal-500',
    xlight: 'bg-teal-50',
    light: 'bg-teal-100',
    gradient: 'bg-g-teal',
    border: 'border-teal-700',
    fill: 'fill-teal-700',
  },
  {
    text: 'text-green-700',
    darker: 'bg-green-700',
    dark: 'bg-green-600',
    xlight: 'bg-green-50',
    light: 'bg-green-100',
    gradient: 'bg-g-green',
    border: 'border-green-700',
    fill: 'fill-green-700',
  },
  {
    text: 'text-lime-700',
    text2: 'text-lime-500',
    darker: 'bg-lime-700',
    dark: 'bg-lime-400',
    xlight: 'bg-lime-50',
    light: 'bg-lime-100',
    gradient: 'bg-g-lime',
    border: 'border-lime-700',
    border2: 'border-lime-400',
    borderLight: 'border-lime-400',
    fill: 'fill-lime-700',
  },
  {
    text: 'text-yellow-700',
    darker: 'bg-yellow-700',
    dark: 'bg-yellow-400',
    xlight: 'bg-yellow-50',
    light: 'bg-yellow-100',
    gradient: 'bg-g-yellow',
    border: 'border-yellow-700',
    fill: 'fill-yellow-700',
  },
  {
    text: 'text-orange-700',
    darker: 'bg-orange-700',
    dark: 'bg-orange-500',
    xlight: 'bg-orange-50',
    light: 'bg-orange-100',
    gradient: 'bg-g-orange',
    border: 'border-orange-700',
    fill: 'fill-orange-700',
  },
  {
    text: 'text-red-700',
    darker: 'bg-red-700',
    dark: 'bg-red-600',
    xlight: 'bg-red-50',
    light: 'bg-red-100',
    gradient: 'bg-g-red',
    border: 'border-red-700',
    fill: 'fill-red-700',
  },
  {
    text: 'text-pink-600',
    darker: 'bg-pink-700',
    dark: 'bg-pink-600',
    light: 'bg-pink-100',
    xlight: 'bg-pink-50',
    gradient: 'bg-g-pink',
    border: 'border-pink-700',
    fill: 'fill-pink-700',
  },
  {
    text: 'text-purple-700',
    darker: 'bg-purple-700',
    dark: 'bg-purple-600',
    xlight: 'bg-purple-50',
    light: 'bg-purple-100',
    gradient: 'bg-g-purple',
    border: 'border-purple-700',
    fill: 'fill-purple-700',
  },
  {
    text: 'text-indigo-700',
    darker: 'bg-indigo-700',
    dark: 'bg-indigo-600',
    xlight: 'bg-indigo-50',
    light: 'bg-indigo-100',
    gradient: 'bg-g-indigo',
    border: 'border-indigo-700',
    fill: 'fill-indigo-700',
  },
  {
    text: 'text-slate-700',
    darker: 'bg-slate-700',
    dark: 'bg-slate-400',
    xlight: 'bg-slate-50',
    light: 'bg-slate-100',
    gradient: 'bg-g-slate',
    border: 'border-slate-700',
    fill: 'fill-slate-700',
  },
  {
    text: 'text-gray-700',
    darker: 'bg-gray-700',
    dark: 'bg-gray-600',
    xlight: 'bg-gray-50',
    light: 'bg-gray-100',
    gradient: 'bg-g-gray',
    border: 'border-gray-700',
    fill: 'fill-gray-700',
  },
  {
    text: 'text-zinc-700',
    darker: 'bg-zinc-900',
    dark: 'bg-zinc-800',
    light: 'bg-zinc-100',
    xlight: 'bg-zinc-50',
    gradient: 'bg-g-zinc',
    border: 'border-zinc-700',
    fill: 'fill-zinc-700',
  },
];

const initialValues = {
  title: '',
  subtitle: '',
  goal: 0,
  isTheme: false,
  themeColor: {
    light: '',
    dark: '',
    darker: '',
    text: '',
    text2: '',
    gradient: '',
    border: '',
    border2: '',
    xlight: '',
    fill: '',
  },
  coverPhoto: '',
  coverPhotoName: '',
  maintainAspectRatio: false,
  story: '',
};

const sectionLoadingStates = {
  details: false,
  photo: false,
  coverPhoto: false,
  story: false,
  imageUpload: false,
};

export const useCampaignDetailsForm = (data?: any) => {
  const [inputs, setInputs] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        title: data?.title,
        subtitle: data?.subtitle,
        goal: data?.goal,
        isTheme: data?.isTheme,
        themeColor: data?.themeColor,
        coverPhoto: data?.coverPhoto,
        coverPhotoName: data?.coverPhotoName,
        maintainAspectRatio: data?.maintainAspectRatio,
        story: data?.story,
        imgPreference: data.imgPreference,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value,
    }));
  };

  const handleSwitch = (e: any) => {
    const { name, checked } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: checked,
    }));
  };

  return { inputs, handleInput, handleSwitch, setInputs };
};

const Details = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const campaign = useSelector((state: RootState) => state.campaign);
  const [loading, setLoading] = useState(sectionLoadingStates);

  const [updateCampaign] = useUpdateCampaignMutation();

  const genericUpdateCampaign = async (e: any, section: string, data: any) => {
    e.preventDefault();
    setLoading({ ...sectionLoadingStates, [section]: true });

    await updateCampaign({
      id,
      type: section,
      data,
    })
      .unwrap()
      .then(() =>
        setTimeout(() => {
          dispatch(resetSuccess());
          setLoading({ ...sectionLoadingStates });
        }, 3000)
      )
      .catch(() => setLoading({ ...sectionLoadingStates }));
  };

  const editPhotoHandler = async (e: any) => {
    setLoading((prev: any) => ({ ...prev, imageUpload: true }));
    const imgData: any = await uploadFileToFirebase(e.target.files[0], true);
    setInputs((prev: any) => ({
      ...prev,
      coverPhoto: imgData?.url,
      coverPhotoName: imgData?.name,
    }));
    setLoading((prev: any) => ({ ...prev, imageUpload: false }));
    e.target.value = '';
  };

  const { inputs, handleInput, handleSwitch, setInputs } = useCampaignDetailsForm(
    campaign?.campaign
  );

  return (
    <div className='bg-white border-[1px] border-gray-200 rounded-xl py-4 px-2.5 md:p-8'>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12 md:col-span-4'>
          <p className='text-lg font-Matter-Medium'>Main details</p>
          <p className='font-Matter-Light text-sm tracking-wide'>
            Choose a title and theme color for your campaign.
          </p>
        </div>
        <div className='col-span-12 md:col-span-8 md:col-start-6'>
          <form className='flex flex-col gap-3'>
            <div className='flex flex-col'>
              <label className='font-Matter-Medium text-sm mb-1' htmlFor='title'>
                Title
              </label>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                name='title'
                onChange={handleInput}
                type='text'
                alt='title'
                value={inputs.title || ''}
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-Matter-Medium text-sm mb-1' htmlFor='subtitle'>
                Subtitle
              </label>
              <div className='text-sm font-Matter-Light'>
                Large, bold text that appears at the top of the page.
              </div>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                name='subtitle'
                onChange={handleInput}
                type='text'
                alt='subtitle'
                value={inputs.subtitle || ''}
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-Matter-Medium text-sm mb-1' htmlFor='subtitle'>
                Goal
              </label>
              <div className='text-sm font-Matter-Light'>
                Add a goal and progress bar to your page.
              </div>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none campaign-input'
                name='goal'
                onChange={handleInput}
                type='number'
                alt='goal'
                value={inputs.goal || ''}
              />
            </div>
            <div className='flex flex-col  w-full mt-2 my-3'>
              <div className='flex items-center justify-between mb-2'>
                <p className='font-Matter-Medium'>Theme color</p>
                <Form.Group controlId='isTheme' className='mb-0'>
                  <Form.Check
                    className='auction'
                    type='switch'
                    checked={inputs.isTheme || false}
                    onChange={handleSwitch}
                    name='isTheme'
                  ></Form.Check>
                </Form.Group>
              </div>
              {inputs.isTheme && (
                <div className='flex flex-wrap gap-0.5 h-fit'>
                  {themeColors.map((obj: any, i: number) => (
                    <div
                      onClick={() =>
                        setInputs((prev: any) => ({ ...prev, themeColor: obj }))
                      }
                      key={i}
                      className={`${obj.dark} rounded-md h-8 w-8 flex items-center justify-center cursor-pointer`}
                    >
                      {inputs.themeColor.dark === obj.dark && (
                        <div className='bg-white h-2 w-2 rounded-full'></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
              onClick={(e: any) =>
                genericUpdateCampaign(e, 'details', {
                  title: inputs.title,
                  subtitle: inputs.subtitle,
                  goal: inputs.goal,
                  isTheme: inputs.isTheme,
                  themeColor: inputs.themeColor,
                })
              }
            >
              {campaign.success && campaign.type === 'details' ? (
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
      <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12 md:col-span-4'>
          <p className='text-lg font-Matter-Medium'>Cover Photo</p>
          <p className='font-Matter-Light text-sm'>Add a cover photo to your campaign.</p>
        </div>
        <div className='col-span-12 md:col-span-8 md:col-start-6'>
          <form className='flex flex-col'>
            <FormFile
              id='image-file'
              label={
                <UploadImageBox>
                  {inputs.coverPhoto ? (
                    <img
                      src={inputs.coverPhoto}
                      alt='Campaign cover'
                      className={`${inputs.maintainAspectRatio ? 'object-contain' : 'object-cover'
                        } cursor-pointer h-full w-full bg-gray-100 rounded-lg`}
                    />
                  ) : loading.imageUpload ? (
                    <TailwindSpinner color={campaign.campaign.themeColor.fill} />
                  ) : (
                    <Fragment>
                      <i className='fa-solid fa-cloud-arrow-up fa-xl mb-2'></i>
                      <p className='font-Matter-Regular underline text-blue-700'>
                        Click to add photos
                      </p>
                    </Fragment>
                  )}
                </UploadImageBox>
              }
              onChange={editPhotoHandler}
            ></FormFile>
            {inputs.coverPhoto && (
              <Button
                variant='danger'
                onClick={(e: any) =>
                  genericUpdateCampaign(e, 'cover-photo', {
                    coverPhoto: '',
                    coverPhotoName: '',
                  })
                }
                className='bg-red-500 text-white font-Matter-Medium w-fit rounded-lg'
              >
                Remove cover photo
              </Button>
            )}
            <div className='flex justify-between items-center w-full h-6 mt-2 my-3'>
              <p className=' font-Matter-Medium'>Maintain aspect ratio</p>
              <Form.Group controlId='maintainAspectRatio' className='mb-0'>
                <Form.Check
                  className='auction'
                  type='switch'
                  checked={inputs.maintainAspectRatio || false}
                  onChange={handleSwitch}
                  name='maintainAspectRatio'
                ></Form.Check>
              </Form.Group>
            </div>
            <button
              className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
              onClick={(e: any) =>
                genericUpdateCampaign(e, 'cover-photo', {
                  coverPhoto: inputs.coverPhoto,
                  coverPhotoName: inputs.coverPhotoName,
                  maintainAspectRatio: inputs.maintainAspectRatio,
                  imgPreference: inputs?.maintainAspectRatio
                    ? 'object-contain'
                    : 'object-cover',
                })
              }
            >
              {campaign.success && campaign.type === 'cover-photo' ? (
                <i className='fas fa-check text-white'></i>
              ) : loading.coverPhoto ? (
                <TailwindSpinner color='fill-white' />
              ) : (
                'Save'
              )}
            </button>
          </form>
        </div>
      </div>
      <div className='px-4 border-b-[0.5px] border-gray-100 w-full my-5'></div>
      <div className='w-100'>
        <form className='flex flex-col'>
          <div className='flex flex-col md:flex-row md:justify-between mb-2'>
            <div className='flex flex-col'>
              <div className='font-Matter-Regular text-lg'>Story</div>
              <div className='font-Matter-Light text-sm'>
                Add a story to your campaign. This appears <br /> directly below the
                title.
              </div>
            </div>
            <button
              className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
              onClick={(e: any) =>
                genericUpdateCampaign(e, 'story', {
                  story: inputs.story,
                })
              }
            >
              {campaign.success && campaign.type === 'story' ? (
                <i className='fas fa-check text-white'></i>
              ) : loading.story ? (
                <TailwindSpinner color='fill-white' />
              ) : (
                'Save'
              )}
            </button>
          </div>
          <Form.Control
            as='textarea'
            name='story'
            rows={10}
            value={inputs.story || ''}
            placeholder='Tell your story...'
            onChange={handleInput}
            className='font-Matter-Light placeholder:font-Matter-Light placeholder:text-sm border rounded-lg'
          />
        </form>
      </div>
    </div>
  );
};

export default Details;
