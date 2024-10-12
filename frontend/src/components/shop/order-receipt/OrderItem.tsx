import { formatDate } from '../../../utils/formatDate';
import toFixed from '../../../utils/toFixed';

const OrderItem = ({ item }: { item: any }) => {
  return (
    <div className='flex justify-between items-center w-full mb-2'>
      <div className='flex'>
        <img
          src={item?.productImage || item?.dachshundImage || item?.image}
          alt='Little Paws Dachshund Rescue Order Item'
          className='w-20 aspect-square object-cover mr-1.5 bg-gray-100'
        />
        <div className='flex flex-col w-28'>
          <p className='font-Matter-Regular text-xs mb-1'>
            {item?.isSent && item?.type === 'ECARD'
              ? `Ecard sent to ${item?.recipientsEmail} on ${formatDate(item?.dateToSend)}`
              : !item?.isSent && item?.type === 'ECARD'
              ? `Ecard sending to ${item?.recipientsEmail} on ${formatDate(item?.dateToSend)}`
              : item?.productName}
          </p>
          <p className='font-Matter-Light text-xs'>Quantity: {item?.quantity}</p>
          {item?.size && <p className='font-Matter-Light text-xs'>Size: {item?.size}</p>}
        </div>
      </div>
      <p className='text-xs font-Matter-Medium pr-2.5'>
        ${toFixed(item?.price || item?.totalPrice)}
      </p>
    </div>
  );
};

export default OrderItem;
