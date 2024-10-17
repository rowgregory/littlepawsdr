import { useLocation, useNavigate } from 'react-router-dom';
import useWelcomeWienerProductForm from '../../../utils/hooks/useWelcomeWienerProductForm';
import {
  useCreateWelcomeWienerProductMutation,
  useUpdateWelcomeWienerProductMutation,
} from '../../../redux/services/welcomeWienerApi';
import WelcomeWienerProducts from '../../../components/admin/welcome-wiener/WelcomeWienerProducts';
import { Link } from 'react-router-dom';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';

const WelcomeWienerProductEdit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const isEditMode = state?.isEditMode;

  const [createWelcomeWienerProduct, { isLoading: loadingCreate }] =
    useCreateWelcomeWienerProductMutation();
  const [updateWelcomeWienerProduct, { isLoading: loadingUpdate }] =
    useUpdateWelcomeWienerProductMutation();

  const updateWelcomeWienerProductCallback = async () => {
    if (isEditMode) {
      await updateWelcomeWienerProduct({
        id: product?._id,
        name: inputs?.name,
        description: inputs?.description,
        price: inputs?.price,
        icon: inputs?.icon,
      })
        .unwrap()
        .then(() => navigate('/admin/store/welcome-wieners/digital'))
        .catch((err: any) => err);
    } else {
      await createWelcomeWienerProduct({
        name: inputs?.name,
        description: inputs?.description,
        price: inputs?.price,
        icon: inputs.icon,
      })
        .unwrap()
        .then(() => navigate('/admin/store/welcome-wieners/digital'))
        .catch((err: any) => err);
    }
  };

  const { onSubmit, handleInput, inputs, setInputs } = useWelcomeWienerProductForm(
    updateWelcomeWienerProductCallback,
    product
  );

  return (
    <div className='flex flex-col gap-y-8'>
      {(loadingUpdate || loadingCreate) && <GreenRotatingTransparentCircle />}
      <Link
        to={`/admin/store/welcome-wieners/digital`}
        className='w-fit border border-slate-100 bg-[#fff] rounded-md  px-3.5 py-1.5 flex items-center hover:no-underline hover:bg-[#f4f4f5] duration-300'
      >
        <i className='fas fa-chevron-left fa-xs mr-2'></i>
        <p className='font-Matter-Regular text-sm mt-0.5'>Back to digital products</p>
      </Link>
      <div className='bg-white border border-slate-100 rounded-xl py-4 px-2.5 md:p-8 grid gap-y-8'>
        <div className='font-Matter-Medium text-2xl'>Digital Products Details</div>
        <form className='flex flex-col gap-y-8'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor='name' className='font-Matter-Medium'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                onChange={handleInput}
                className='font-Matter-Light focus:outline-none border px-3 py-2 rounded-lg'
                value={inputs.name || ''}
              />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor='price' className='font-Matter-Medium'>
                Price
              </label>
              <input
                id='price'
                name='price'
                type='number'
                value={inputs.price || ''}
                onChange={handleInput}
                aria-label='Enter price'
                className='font-Matter-Light focus:outline-none border px-3 py-2 rounded-lg'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='description' className='font-Matter-Medium'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              rows={5}
              value={inputs.description || ''}
              onChange={handleInput}
              aria-label='Enter description'
              className='font-Matter-Light focus:outline-none border px-3 py-2 rounded-lg w-full'
            ></textarea>
          </div>
          <div>
            <p className='font-Matter-Medium'>Icon</p>
            <p className='font-Matter-Light text-sm tracking-wide mb-2'>
              Choose an icon to associate with product
            </p>
            <WelcomeWienerProducts setInputs={setInputs} inputs={inputs} />
          </div>
          <button
            className='mt-4 flex justify-center items-center px-3 py-2 bg-yellow-to-green text-white w-16 h-10 rounded-lg font-Matter-Regular cursor-pointer'
            onClick={onSubmit}
          >
            {loadingUpdate ? <TailwindSpinner color='text-[#fff]' /> : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeWienerProductEdit;
