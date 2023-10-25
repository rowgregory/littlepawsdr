import {
  openCartDrawer,
  removeProductFromCart,
  deleteProductFromCart,
  addProductToCart,
} from '../../actions/cartActions';
import UIFx from 'uifx';
import Add from '../../components/sounds/click02.wav';
import Thump from '../../components/sounds/thump01.mp3';
import { Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { CartBtn, ProductName } from '../../components/styles/cart/Styles';
import { Text } from '../../components/styles/Styles';

const CartItem = ({ item }: any) => {
  const dispatch = useDispatch();

  const productAmountChanged = new UIFx(Add);
  const reachedProductLimit = new UIFx(Thump);

  const addOneItem = (item: any) => {
    const productAmount = item?.sizes?.find(
      (p: any) => p.size === item.size
    )?.amount;

    if (
      item.quantity + 1 <= productAmount ||
      item.dachshundId ||
      item.quantity + 1 <= item.countInStock
    ) {
      dispatch(addProductToCart(item));
    }
  };

  const deleteOneItem = (e: any, item: any) => {
    const currentValue = +e.target.ariaValueNow;
    if (currentValue === 1) {
      reachedProductLimit.play();
      return;
    }

    productAmountChanged.play();
    dispatch(deleteProductFromCart(item));
  };

  return (
    <tr>
      <td style={{ padding: '10px 13px 10px 13px', width: '75px' }}>
        <Image
          src={item?.dachshundImage ?? item?.productImage}
          alt={item?.name}
          roundedCircle
          width='85px'
          height='85px'
          style={{ objectFit: 'cover', background: '#fff' }}
        />
      </td>

      <td style={{ maxWidth: '60px' }}>
        <ProductName
          to={
            item?.dachshundId
              ? `/welcome-wiener/${item?.dachshundId}`
              : item?.isEcard
              ? `/ecards/filtered?category=${item.category}`
              : `/merch/${item?.productId}`
          }
          onClick={() => dispatch(openCartDrawer(false))}
        >
          {item.isEcard
            ? `Sending ecard to ${item?.recipientsEmail}`
            : item.productName}
          {item.dachshundName && ` for ${item?.dachshundName}`}
        </ProductName>
        {item?.size && <Text fontSize='12px'>{item?.size}</Text>}
      </td>
      <td>
        {!item?.isEcard && (
          <div className='d-flex align-items-center'>
            <Text
              marginRight='8px'
              fontWeight={400}
              color='#858382'
              width='15px'
            >
              {item.qty ?? item?.quantity}
            </Text>

            <div className='d-flex flex-column'>
              <CartBtn
                className='plus'
                onClick={() => addOneItem({ ...item, from: 'cart' })}
                aria-valuenow={item.qty ?? item?.quantity}
              >
                +
              </CartBtn>
              <CartBtn
                onClick={(e: any) => deleteOneItem(e, item)}
                aria-valuenow={item.qty ?? item?.quantity}
              >
                -
              </CartBtn>
            </div>
          </div>
        )}
      </td>
      <td>
        <Text className='pr-2' fontWeight='bold'>
          ${Number(item?.price)?.toFixed(2)}
        </Text>
      </td>
      <td className='remove-cart-item'>
        <i
          className='fas fa-times fa-sm ml-3'
          onClick={() => dispatch(removeProductFromCart(item))}
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;
