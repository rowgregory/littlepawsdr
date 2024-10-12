import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/toolkitStore';
import {
  addToCart,
  deleteProductFromCart,
  removeFromCart,
  toggleCartDrawer,
} from '../../../redux/features/cart/cartSlice';
import UIFx from 'uifx';
import Add from '../../../components/sounds/click02.wav';
import Thump from '../../../components/sounds/thump01.mp3';
import toFixed from '../../../utils/toFixed';

const CartItem = ({ item }: { item: any }) => {
  const dispatch = useAppDispatch();
  const productAmountChanged = new UIFx(Add);
  const reachedProductLimit = new UIFx(Thump);

  const addOneItem = (item: any) => {
    const productAmount = item?.sizes?.find((p: any) => p.size === item.size)?.amount;

    if (
      item.quantity + 1 <= productAmount ||
      item.dachshundId ||
      item.quantity + 1 <= item.countInStock
    ) {
      dispatch(addToCart({ item }));
    }
  };

  const deleteOneItem = (e: any, item: any) => {
    const currentValue = +e.target.ariaValueNow;
    if (currentValue === 1) {
      reachedProductLimit.play();
      return;
    }

    productAmountChanged.play();
    dispatch(deleteProductFromCart({ item }));
  };

  return (
    <div className='grid grid-cols-12 items-center bg-slate-100 mb-3 pl-2.5 sm:pl-3'>
      <div className='col-span-1'>
        <img
          src={item?.dachshundImage ?? item?.productImage}
          alt={item?.name}
          className='w-10 sm:w-16 aspect-square rounded-full object-cover'
        />
      </div>
      <div className='col-span-5 flex flex-col max-w-72 w-full'>
        <Link
          className='text-sm font-Matter-Light text-slate-800 truncate'
          to={
            item?.dachshundId
              ? `/welcome-wieners/${item?.dachshundId}`
              : item?.isEcard
              ? `/ecards/personalize/${item?.ecardId}`
              : `/merch/${item?.productId}`
          }
          onClick={() => dispatch(toggleCartDrawer(false))}
        >
          {item.isEcard ? `Sending ecard to ${item?.recipientsEmail}` : item.productName}
          {item.dachshundName && ` for ${item?.dachshundName}`}
        </Link>
        {item?.size && <p className='text-sm font-Matter-Light'>{item?.size}</p>}
      </div>
      <div className='col-span-2'>
        {!item?.isEcard && (
          <div className='d-flex align-items-center'>
            <p className='mr-2 font-Matter-Medium text-slate-400 w-3'>
              {item.qty ?? item?.quantity}
            </p>

            <div className='d-flex flex-column'>
              <div
                className='h-5 w-5 rounded-full bg-slate-600 text-white flex items-center justify-center duration-200 cursor-pointer mr-1 mb-1.5'
                onClick={() => addOneItem({ ...item, from: 'cart' })}
                aria-valuenow={item.qty ?? item?.quantity}
              >
                +
              </div>
              <div
                className='h-5 w-5 rounded-full bg-slate-600 text-white flex items-center justify-center duration-200 cursor-pointer'
                onClick={(e: any) => deleteOneItem(e, item)}
                aria-valuenow={item.qty ?? item?.quantity}
              >
                -
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='col-span-3 flex justify-center'>
        <p className='pr-2 font-Matter-Regular text-slate-800'>${toFixed(item?.price)}</p>
      </div>
      <div className='col-span-1 h-20 flex items-center justify-center bg-slate-100 sm:bg-slate-50'>
        <i
          className='fas fa-times fa-sm ml-3'
          onClick={() => dispatch(removeFromCart({ item }))}
        ></i>
      </div>
    </div>
  );
};

export default CartItem;
