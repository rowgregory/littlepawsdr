import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { useGetWelcomeWienerQuery } from '../../redux/services/welcomeWienerApi';
import GreenRotatingTransparentCircle from '../../components/Loaders/GreenRotatingTransparentCircle';
import { useAppDispatch } from '../../redux/toolkitStore';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';

const WelcomeWienerDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetWelcomeWienerQuery(id);
  const welcomeWiener = data?.welcomeWiener;

  const reactImageGalleryDataShape = data?.welcomeWiener?.images?.map((image: any) => ({
    original: image.url,
    thumbnail: image.url,
  }));

  const galleryControl = reactImageGalleryDataShape?.length > 1 ? true : false;

  const addToCartHandler = (product: any) => {
    const cartItem = {
      price: product?.price,
      productImage: welcomeWiener?.displayUrl,
      productName: product?.name,
      productId: product?._id,
      quantity: 1,
      dachshundName: welcomeWiener?.name,
      productIcon: product?.icon,
      dachshundId: welcomeWiener?._id,
      from: 'cart',
      isPhysicalProduct: false,
      isWelcomeWiener: true,
      shippingPrice: 0,
    };
    dispatch(addToCart({ item: cartItem }));
    dispatch(toggleCartDrawer(true));
  };

  if (isLoading) return <GreenRotatingTransparentCircle />;

  return (
    <div className='grid grid-cols-12 gap-8 max-w-[1340px] w-full px-[20px] mx-auto md:px-[24px] lg:px-8 pt-12'>
      <div className='col-span-12 lg:col-span-8 animate-fadeIn'>
        <p className='font-Matter-Medium text-4xl mb-1.5'>{welcomeWiener?.name}</p>
        <ImageGallery
          items={reactImageGalleryDataShape ?? [{ original: '', thumbnail: '' }]}
          showIndex={galleryControl}
          showBullets={galleryControl}
          showThumbnails={galleryControl}
          showPlayButton={galleryControl}
        />
        <div className='flex items-center justify-between mt-3'>
          <p className='font-Matter-Light text-sm'>{welcomeWiener?.bio}</p>
        </div>
      </div>
      <div className='sm:pb-0 col-span-12 lg:col-span-4'>
        <p className='font-Matter-Medium text-2xl my-3'>Ways to make an impact</p>
        {welcomeWiener?.associatedProducts
          ?.map((wiener: any) => (
            <div
              className='border-[0.5px] border-gray-200 p-3.5 rounded-sm flex flex-col mb-4 animate-fadeIn'
              key={wiener?._id}
            >
              <div className='grid grid-cols-9 gap-1 mb-2 items-center'>
                <div
                  className={`col-span-2 md:col-span-12 lg:col-span-2 text-teal-500 bg-teal-100 text-sm h-12 w-12 rounded-full flex items-center justify-center font-Matter-Medium`}
                >
                  <p className='text-xl text-teal-800'>${wiener?.price}</p>
                </div>
                <p className='col-span-7 md:col-span-12 lg:col-span-7 font-Matter-Light'>
                  <i className={`${wiener?.icon} mr-2`}></i>
                  {wiener?.name}
                </p>
              </div>
              <p className='font-Matter-Regular my-2'>{wiener?.description}</p>
              <button
                className='px-4 py-2 rounded-lg text-[#fff] bg-teal-500'
                onClick={() => addToCartHandler(wiener)}
              >
                Add to cart
              </button>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default WelcomeWienerDetails;
