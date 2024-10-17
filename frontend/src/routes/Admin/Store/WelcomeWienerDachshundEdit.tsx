import { useLocation, useNavigate } from 'react-router-dom';
import useWelcomeWienerDachshundForm from '../../../utils/hooks/useWelcomeWienerDachshundForm';
import { uploadMultipleFilesToFirebase } from '../../../utils/uploadToFirebase';
import WelcomeWienerProduct from '../../../components/welcome-wiener/WelcomeWienerProduct';
import {
  useCreateWelcomeWienerMutation,
  useGetWelcomeWienerProductsQuery,
  useUpdateWelcomeWienerMutation,
} from '../../../redux/services/welcomeWienerApi';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';

const WelcomeWienerDachshundEdit = () => {
  const {
    state: { wiener, isEditMode },
  } = useLocation() as any;
  const navigate = useNavigate();
  const [createWelcomeWiener, { isLoading: loadingCreate }] = useCreateWelcomeWienerMutation();
  const [updateWelcomeWiener, { isLoading: loadingUpdate }] = useUpdateWelcomeWienerMutation();
  const { data } = useGetWelcomeWienerProductsQuery();
  const welcomeWienerProducts = data?.welcomeWienerProducts;
  const noWelcomeWienerProducts = welcomeWienerProducts?.length === 0;

  const updateWelcomeWienerDachshundCallback = async () => {
    if (isEditMode) {
      await updateWelcomeWiener({
        id: wiener?._id,
        name: inputs?.name,
        bio: inputs?.bio,
        age: inputs?.age,
        displayUrl: inputs.images[0],
        associatedProducts: inputs?.associatedProducts,
        images: inputs?.images,
      })
        .unwrap()
        .then(() => navigate(`/admin/store/welcome-wieners`));
    } else {
      await createWelcomeWiener({
        name: inputs?.name,
        bio: inputs?.bio,
        age: inputs?.age,
        displayUrl: inputs?.images[0],
        associatedProducts: inputs?.associatedProducts?.map((obj: any) => obj?._id),
        images: inputs?.images,
      })
        .unwrap()
        .then(() => navigate(`/admin/store/welcome-wieners`));
    }
  };

  const { onSubmit, handleInput, inputs, addToAssociatedProducts, setInputs } =
    useWelcomeWienerDachshundForm(updateWelcomeWienerDachshundCallback, wiener);

  const editPhotoHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setInputs((inputs: any) => ({ ...inputs, photoAmount: Number(newFiles.length) }));
    const images = await uploadMultipleFilesToFirebase(newFiles);
    setInputs((inputs: any) => ({
      ...inputs,
      images: [...inputs.images, ...images],
      photoAmount: 0,
    }));
  };

  return (
    <div className='flex flex-col gap-y-8'>
      <Link
        to={`/admin/store/welcome-wieners`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to wieners</p>
      </Link>
      <div className='bg-white border border-slate-100 rounded-xl p-8 grid gap-y-8'>
        <div className='font-Matter-Medium text-2xl'>Welcome Wiener Details</div>
        <div>
          <label className='font-Matter-Medium text-sm'>
            Digital products
          </label>
          <p className='font-Matter-Light text-sm mb-2'>Click products to offer</p>
          <div className='border border-slate-100 border-dashed rounded-lg p-4'>
            <div className='flex flex-col'>
              {noWelcomeWienerProducts ? (
                <Link to='/admin/store/welcome-wieners/digital/create' className='border-dashed border-2 border-gray-100 w-28 h-28 flex justify-center items-center rounded-md relative hover:bg-gray-100 p-2 cursor-pointer font-Matter-Regular text-center hover:no-underline text-sm hover:text-gray-800'>Add new digial product</Link>
              ) : (
                <div className='flex flex-wrap gap-3'>
                  {welcomeWienerProducts?.map((obj: any, i: number) => (
                    <WelcomeWienerProduct
                      key={i}
                      product={obj}
                      inputs={inputs}
                      addToAssociatedProducts={addToAssociatedProducts}
                    />
                  ))}
                  <Link to='/admin/store/welcome-wieners/digital/create' className='border-dashed border-2 border-gray-100 w-28 h-28 flex justify-center items-center rounded-md relative hover:bg-gray-100 p-2 cursor-pointer font-Matter-Regular text-center hover:no-underline text-sm hover:text-gray-800'>Add new digial product</Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <form className='flex flex-col gap-y-12'>
          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex flex-col w-full'>
              <label htmlFor='name' className='font-Matter-Medium text-sm'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                onChange={handleInput}
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
                value={inputs.name || ''}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='age' className='font-Matter-Medium text-sm'>
                Age
              </label>
              <input
                id='age'
                name='age'
                type='number'
                value={inputs.age || ''}
                onChange={handleInput}
                aria-label='Enter age'
                className='bg-white border-[1px] border-gray-200 rounded-md py-2.5 px-4 font-Matter-Regular focus:outline-none'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='bio' className='font-Matter-Medium text-sm'>
              Bio
            </label>
            <textarea
              id='bio'
              name='bio'
              rows={5}
              value={inputs.bio || ''}
              onChange={handleInput}
              aria-label='Enter bio'
              className='font-Matter-Light focus:outline-none border px-3 py-2 rounded-lg w-full'
            ></textarea>
          </div>
          <div>
            <label className='font-Matter-Medium text-sm'>
              Photos
            </label>
            <div className='border border-slate-100 border-dashed rounded-lg'>
              <Form.File
                className='auction-item'
                multiple
                type='file'
                id='multiple-images'
                label={
                  <div className='flex justify-center items-center cursor-pointer pt-8'>
                    <div className=' w-full text-center'>
                      <div className='h-32 flex flex-col items-center justify-center'>
                        <div className='h-12 w-12 rounded-full bg-slate-100 flex justify-center items-center mb-2'>
                          <i className='fa-solid fa-cloud-arrow-up fa-xl'></i>
                        </div>
                        <div className='text-[#3366ff] font-Matter-Regular underline text-base'>
                          Click to add photos
                        </div>
                      </div>
                    </div>
                  </div>
                }
                onChange={editPhotoHandler}
              ></Form.File>
              <div className='flex flex-wrap px-8 pb-4 gap-2'>
                {Array.from(inputs.images)?.map((file: any, i: number) => (
                  <div
                    key={i}
                    className='w-40 h-40 rounded-md border border-dashed border-gray-100 flex items-center justify-center pt-10 pb-6 px-9 cursor-pointer bg-[#0b0b0b] relative'
                  >
                    <i
                      onClick={() =>
                        setInputs((prev: any) => ({
                          ...prev,
                          images: inputs.images.filter((image: { url: string }) => image !== file),
                        }))
                      }
                      className='fas fa-times fa-sm text-white absolute top-5 left-3.5 z-2 cursor-pointer'
                    ></i>

                    <img
                      className='w-full h-full object-cover'
                      src={file}
                      alt='auction-item'
                    />
                  </div>
                ))}
                {inputs.photoAmount > 0 &&
                  Array.from({ length: inputs.photoAmount })?.map((_: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className='w-40 h-40 rounded-md border border-dashed border-gray-100 flex items-center justify-center pt-10 pb-6 px-9 cursor-pointer bg-[#0b0b0b] relative'
                      >
                        <TailwindSpinner color='fill-teal-400' />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <button
            className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
            onClick={onSubmit}
          >
            {loadingCreate || loadingUpdate ? <TailwindSpinner color='text-[#fff]' /> : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeWienerDachshundEdit;
