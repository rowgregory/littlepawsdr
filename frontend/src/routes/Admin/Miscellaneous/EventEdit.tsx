import { useNavigate, useLocation } from 'react-router-dom';
import { gradients } from '../../../utils/eventUtils';
import { uploadFileToFirebase } from '../../../utils/uploadToFirebase';
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from '../../../redux/services/eventApi';
import { Link } from 'react-router-dom';
import { FormFile } from 'react-bootstrap';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';
import useEventEditForm from '../../../utils/hooks/useEventEditForm';
import { formatDateForCalendar, formatDateForEstTimezone } from '../../../utils/dateFunctions';

const EventEdit = () => {
  const {
    state: { event, isEditMode },
  } = useLocation() as any;
  const navigate = useNavigate();

  const [updateEvent, { isLoading: loadingUpdate }] =
    useUpdateEventMutation();
  const [createEvent, { isLoading: loadingCreate }] =
    useCreateEventMutation();

  const editEventCallback = async () => {
    if (isEditMode) {
      await updateEvent({
        _id: event._id,
        title: inputs.title,
        description: inputs.description,
        startDate: formatDateForEstTimezone(inputs.startDate, 13, 0),
        endDate: formatDateForEstTimezone(inputs.endDate, 21, 0),
        image: inputs.image,
        background: inputs.background,
        color: inputs.color,
        externalLink: inputs.externalLink,
      })
        .unwrap()
        .then(() => navigate('/admin/misc/events'))
        .catch((err: any) => err);
    } else {
      await createEvent({
        title: inputs.title,
        description: inputs.description,
        startDate: formatDateForEstTimezone(inputs.startDate, 13, 0),
        endDate: formatDateForEstTimezone(inputs.endDate, 21, 0),
        image: inputs.image,
        background: inputs.background,
        color: inputs.color,
        externalLink: inputs.externalLink,
      })
        .unwrap()
        .then(() => navigate('/admin/misc/events'))
        .catch((err: any) => err);
    }
  };

  const { inputs, handleInput, setInputs, onSubmit } = useEventEditForm(
    editEventCallback,
    event
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
        to={`/admin/misc/events`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to events</p>
      </Link>
      <form className='bg-white border-[1px] border-gray-200 rounded-xl py-4 px-2.5 md:p-8'>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>Main details</p>
            <p className='font-Matter-Light text-sm tracking-wide'>
              Choose a title and category for your event.
            </p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='title'>
                  Title
                </label>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='title'
                  onChange={handleInput}
                  type='text'
                  alt='title'
                  value={inputs.title || ''}
                />
              </div>
              <div className='flex flex-col'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='externalLink'>
                  External link
                </label>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='externalLink'
                  onChange={handleInput}
                  type='text'
                  alt='externalLink'
                  value={inputs.externalLink || ''}
                />
              </div>
              <div className='flex flex-col w-full'>
                <label htmlFor='description' className='font-Matter-Medium text-sm mb-0'>
                  Description
                </label>
                <textarea
                  className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                  id='description'
                  name='description'
                  rows={5}
                  value={inputs.description || ''}
                  onChange={handleInput}
                  aria-label='Enter description'
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>Event times</p>
            <p className='font-Matter-Light text-sm tracking-wide'>
              Choose a start and end time
            </p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='startDate'>
                  Start date
                </label>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='startDate'
                  onChange={handleInput}
                  type='date'
                  alt='startDate'
                  value={formatDateForCalendar(inputs.startDate) || ''}
                />
              </div>
              <div className='flex flex-col'>
                <label className='font-Matter-Medium text-sm mb-1' htmlFor='endDate'>
                  End date
                </label>
                <input
                  className='bg-white border-[1px] border-gray-200 rounded-md mb-4 py-2.5 px-4 font-Matter-Regular focus:outline-none '
                  name='endDate'
                  onChange={handleInput}
                  type='Date'
                  alt='endDate'
                  value={formatDateForCalendar(inputs.endDate) || ''}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>Event photo</p>
            <p className='font-Matter-Light text-sm'>Add a photo to your event.</p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='flex flex-col gap-3'>
              <FormFile
                id='image-file'
                label={
                  <div className='w-60 h-60 aspect-square rounded-lg border-dashed border-gray-200 border-2 flex flex-col items-center justify-center p-3 cursor-pointer'>
                    {inputs.image ? (
                      <img
                        src={inputs.image}
                        alt='Campaign cover'
                        className={`object-cover cursor-pointer h-full w-full bg-gray-100 rounded-lg`}
                      />
                    ) : (
                      <>
                        <i className='fa-solid fa-cloud-arrow-up fa-xl mb-2 bg-gray-200 rounded-full flex justify-center items-center h-12 w-12 text-gray-700'></i>
                        <p className='font-Matter-Regular underline text-gray-400'>
                          Click to add photo
                        </p>
                      </>
                    )}
                  </div>
                }
                onChange={editPhotoHandler}
              ></FormFile>
            </div>
          </div>
        </div>
        <div className='px-4 border-b-[1px] border-gray-100 w-full my-5'></div>
        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-12 md:col-span-4'>
            <p className='text-lg font-Matter-Medium'>Event background color</p>
            <p className='font-Matter-Light text-sm'>
              Add a background color to your event.
            </p>
          </div>
          <div className='col-span-12 md:col-span-8 md:col-start-6'>
            <div className='flex flex-col mb-2'>
              <label htmlFor='background' className='mb-0'>
                Background Color
              </label>
              <div className='flex flex-wrap'>
                {gradients.map((gradient: string, i: number) => (
                  <div
                    key={i}
                    className={`cursor-pointer ${gradient === inputs.background
                      ? 'border-4 border-teal-300'
                      : 'border-4 border-white'
                      }`}
                  >
                    <div
                      className={`w-10 h-10 event-radio m-0.5`}
                      style={{
                        backgroundImage: gradient,
                      }}
                      onClick={() =>
                        setInputs((prev: any) => ({ ...prev, background: gradient }))
                      }
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-12'>
          <button
            className='md:col-start-6 mt-5 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
            onClick={onSubmit}
          >
            {loadingCreate || loadingUpdate ? (
              <TailwindSpinner color='fill-white' />
            ) : isEditMode ? (
              'Save'
            ) : (
              'Create'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventEdit;
