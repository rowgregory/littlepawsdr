import { useSelector } from 'react-redux';
import toFixed from '../../../utils/toFixed';
import cartItemType from '../../../utils/shop-utils/cartItemType';

const ItemsContainer = () => {
  const { subtotal, totalPrice, shippingPrice, cartItems } = useSelector(
    (state: any) => state.cart
  );
  const { isProduct } = cartItemType(cartItems);

  return (
    <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 lg:aspect-square '>
      <p className='font-Matter-Medium text-2xl mb-4'>Your items</p>
      {cartItems?.map((item: any, index: number) => (
        <div className='flex justify-between mb-6' key={index}>
          <div className='flex'>
            <img
              src={item?.dachshundImage ?? item?.productImage}
              alt={item?.name}
              className='mr-3 w-12 h-12 object-cover aspect-square'
            />
            <div className='flex flex-col w-24'>
              <p className='text-ellipsis overflow-hidden whitespace-nowrap text-sm font-Matter-Light'>
                {item?.productName} {item?.dachshundName && ` for ${item?.dachshundName}`}
              </p>
              {item?.quantity > 1 && (
                <p className='text-xs font-Matter-Light'>Quantity: {item?.quantity}</p>
              )}
            </div>
          </div>
          <p className='font-Matter-Regular'>${toFixed(item?.quantity * item?.price)}</p>
        </div>
      ))}
      <div className='px-4 border-b-[1px] border-gray-100 w-full my-3'></div>
      <div className='flex justify-between items-baseline mb-1'>
        <div className='font-Matter-Light'>Subtotal</div>
        <p className='font-Matter-Regular'>${toFixed(subtotal)}</p>
      </div>
      {isProduct && (
        <div className='flex justify-between items-baseline mb-3'>
          <div className='font-Matter-Light'>Shipping Costs</div>
          <p className='font-Matter-Regular'>${toFixed(shippingPrice)}</p>
        </div>
      )}
      <div className='flex justify-between items-baseline'>
        <div className='font-Matter-Medium text-lg'>Total Price</div>
        <p className='font-Matter-Medium text-lg'>${toFixed(totalPrice)}</p>
      </div>
    </div>
  );
};

export default ItemsContainer;
