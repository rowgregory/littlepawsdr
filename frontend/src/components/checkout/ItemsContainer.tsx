import toFixed from '../../utils/toFixed';

const ItemsContainer = ({ cart }: any) => {
  return (
    <div className='border-[6px] border-slate-100 flex flex-col justify-between h-fit rounded-md w-full p-4 md:aspect-square '>
      <p className='font-Matter-Medium text-2xl mb-4'>Your items</p>
      {cart?.cartItems?.map((item: any, index: number) => (
        <div className='flex justify-between mb-6' key={index}>
          <div className='flex'>
            <img
              src={item?.dachshundImage ?? item?.productImage}
              alt={item?.name}
              className='mr-3 w-12 h-12 object-cover aspect-square'
            />
            <div className='flex flex-col'>
              <p className='text-ellipsis overflow-hidden whitespace-nowrap text-xs font-Matter-Medium'>
                {item?.productName} {item?.dachshundName && ` for ${item?.dachshundName}`}
              </p>
              <p className='text-sm font-Matter-Regular'>Quantity: {item?.quantity}</p>
            </div>
          </div>
          <p className='font-Matter-Medium'>{toFixed(item?.quantity * item?.price)}</p>
        </div>
      ))}
      <div className='px-4 border-b-[1px] border-gray-100 w-full my-3'></div>
      <div className='flex justify-between items-baseline mb-1'>
        <div className='font-Matter-Regular'>Subtotal</div>
        <p className='font-Matter-Regular'>${toFixed(cart?.subtotal)}</p>
      </div>
      <div className='flex justify-between items-baseline mb-1'>
        <div className='font-Matter-Regular'>Processing Fee</div>
        <p className='font-Matter-Regular'>${toFixed(cart?.processingFee)}</p>
      </div>
      <div className='flex justify-between items-baseline mb-3'>
        <div className='font-Matter-Regular'>Shipping Costs</div>
        <p className='font-Matter-Regular'>${toFixed(cart?.shippingPrice)}</p>
      </div>
      <div className='flex justify-between items-baseline'>
        <div className='font-Matter-Medium'>Total Price</div>
        <p className='font-Matter-Medium'>${toFixed(cart?.totalPrice)}</p>
      </div>
    </div>
  );
};

export default ItemsContainer;
