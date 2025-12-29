import { Save } from 'lucide-react';
import { uploadFileToFirebase } from '../../utils/uploadToFirebase';
import ecardCategories from '../data/merch-and-ecards/ecard-categories-data';

const AdminEcardForm = ({
  handleSubmit,
  handleInput,
  inputs,
  loading,
  setInputs,
  dispatch,
}: any) => {
  const editPhotoHandler = async (e: any) => {
    const imgData: any = await uploadFileToFirebase(e.target.files[0], true);

    dispatch(setInputs({ formName: 'ecardCreateForm', data: { image: imgData?.url } }));

    e.target.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className='py-4 px-2.5 md:p-8'>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12'>
          <p className='text-lg font-Matter-Medium'>Main details</p>
          <p className='font-Matter-Light text-sm tracking-wide'>
            Choose a name and category for your ecard.
          </p>
        </div>
        <div className='col-span-12'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col'>
              <label className='font-Matter-Medium text-sm mb-1' htmlFor='name'>
                Name
              </label>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                name='name'
                onChange={handleInput}
                type='text'
                alt='name'
                value={inputs?.name || ''}
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-Matter-Medium text-sm mb-1' htmlFor='price'>
                Price
              </label>
              <input
                className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                name='price'
                onChange={handleInput}
                type='number'
                alt='price'
                value={inputs?.price || ''}
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-Matter-Medium text-sm mb-1' htmlFor='title'>
                Category
              </label>
              <select
                id='category'
                name='category'
                value={inputs?.category || ''}
                onChange={handleInput}
                aria-label='Select category'
                className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none'
              >
                {ecardCategories.map((category, i: number) => (
                  <option className='text-zinc-300' key={i}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
      <div className='grid grid-cols-12 gap-3'>
        <div className='col-span-12'>
          <p className='text-lg font-Matter-Medium'>Ecard photo</p>
          <p className='font-Matter-Light text-sm'>Add a photo to your ecard.</p>
        </div>
        <div className='col-span-12'>
          <div className='flex flex-col gap-3'>
            <label
              htmlFor='image-file'
              className='w-60 h-60 aspect-square rounded-lg border-dashed border-gray-200 border-2 flex flex-col items-center justify-center p-3 cursor-pointer'
            >
              {inputs?.image ? (
                <img
                  src={inputs?.image}
                  alt='Ecard'
                  className='object-cover cursor-pointer h-full w-full bg-gray-100 rounded-lg'
                />
              ) : (
                <>
                  <i className='fa-solid fa-cloud-arrow-up fa-xl mb-2 bg-gray-200 rounded-full flex justify-center items-center h-12 w-12 text-gray-700'></i>
                  <p className='font-Matter-Regular underline text-gray-400'>Click to add photo</p>
                </>
              )}
              <input
                id='image-file'
                name='image'
                type='file'
                onChange={editPhotoHandler}
                className='hidden'
              />
            </label>
          </div>
        </div>
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-Matter-Medium py-3 px-8 rounded-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6'
      >
        {loading ? (
          <>
            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            Saving...
          </>
        ) : (
          <>
            <Save className='w-4 h-4' />
            Save Details
          </>
        )}
      </button>
    </form>
  );
};

export default AdminEcardForm;
