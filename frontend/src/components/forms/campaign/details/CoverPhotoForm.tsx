import FileInput from '../../../common/FileInput';
import Switch from '../../../common/Switch';
import TailwindSpinner from '../../../Loaders/TailwindSpinner';
import { Fragment } from 'react';

const CoverPhotoForm = ({
  inputs,
  loading,
  campaign,
  editPhotoHandler,
  genericUpdateCampaign,
  handleSwitch,
}: any) => {
  return (
    <form className='flex flex-col'>
      <FileInput
        id='image-file'
        label={
          <div className='w-64 h-64 aspect-square rounded-xl border-dashed border-2 border-gray-200 flex flex-col items-center justify-center p-4 cursor-pointer'>
            {inputs.coverPhoto ? (
              <img
                src={inputs.coverPhoto}
                alt='Campaign cover'
                className={`${
                  inputs.maintainAspectRatio ? 'object-contain' : 'object-cover'
                } cursor-pointer h-full w-full bg-gray-100 rounded-lg`}
              />
            ) : loading.imageUpload ? (
              <TailwindSpinner color={campaign.campaign.themeColor.fill} />
            ) : (
              <Fragment>
                <i className='fa-solid fa-cloud-arrow-up fa-xl mb-2 bg-[#e4e4e7] rounded-full text-[#505050] flex items-center justify-center h-12 w-12'></i>
                <p className='font-Matter-Regular underline text-blue-700'>Click to add photos</p>
              </Fragment>
            )}
          </div>
        }
        onChange={editPhotoHandler}
      />
      {inputs.coverPhoto && (
        <button
          onClick={(e: any) =>
            genericUpdateCampaign(e, 'cover-photo', {
              coverPhoto: '',
              coverPhotoName: '',
            })
          }
          className='bg-red-500 mt-2 px-3 py-1.5 text-white font-Matter-Medium w-fit rounded-lg'
        >
          Remove cover photo
        </button>
      )}
      <div className='flex justify-between items-center w-full h-6 mt-2 my-3'>
        <p className='font-Matter-Medium'>Maintain aspect ratio</p>
        <Switch
          name='maintainAspectRatio'
          checked={inputs.maintainAspectRatio || false}
          onChange={handleSwitch}
        ></Switch>
      </div>
      <button
        className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
        onClick={(e: any) =>
          genericUpdateCampaign(e, 'cover-photo', {
            coverPhoto: inputs.coverPhoto,
            coverPhotoName: inputs.coverPhotoName,
            maintainAspectRatio: inputs.maintainAspectRatio,
            imgPreference: inputs?.maintainAspectRatio ? 'object-contain' : 'object-cover',
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
  );
};

export default CoverPhotoForm;
