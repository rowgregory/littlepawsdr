import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/toolkitStore';
import { addToCart, toggleCartDrawer } from '../../redux/features/cart/cartSlice';

const WelcomeWienerCard = ({
  wiener,
}: {
  wiener: { displayUrl: string; _id: string; associatedProducts: any; name: string };
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addToCartHandler = (product: any, welcomeWiener: any) => {
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

  return (
    <div className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 group'>
      <div
        className='relative bg-white p-3 flex items-end rounded-2xl bg-cover bg-center bg-no-repeat w-full h-auto aspect-[9/16]'
        style={{ backgroundImage: `url(${wiener?.displayUrl})` }}
      >
        <div className='absolute rounded-2xl inset-0 bg-black bg-opacity-50 gap-y-4 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <Link
            to={`/donate/welcome-wieners/${wiener?._id}`}
            className='px-5 py-2 text-white bg-teal-500 rounded-full font-QBold hover:bg-teal-600'
          >
            Donate
          </Link>

          {wiener.associatedProducts.slice(0, 3).map((product: any, j: number) => (
            <button
              key={j}
              onClick={(e: any) => {
                e.stopPropagation();
                addToCartHandler(product, wiener);
              }}
              className='px-5 py-2 text-white bg-teal-500 rounded-full font-QBold hover:bg-teal-600'
            >
              {product.name} ${product.price}
            </button>
          ))}
        </div>
      </div>
      <div
        onClick={() => navigate(`/donate/welcome-wieners/${wiener?._id}`)}
        className='cursor-pointer -mt-12 relative w-4/5 px-5 py-7 mx-auto rounded-2xl flex items-center justify-center shadow-[0px_0px_15px_0px_rgba(0,0,0,0.1)] bg-white h-fit'
      >
        <p className='font-QBold text-xl text-center duration-200 text-charcoal truncate'>
          {wiener?.name}
        </p>
      </div>
    </div>
  );
};

export default WelcomeWienerCard;
