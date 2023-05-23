import {
  addWelcomeWienerProductToCart,
  deletWelcomeWienerProductFromCart,
  openCartDrawer,
  removeWelcomeWienerProductFromCart,
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
    dispatch(addWelcomeWienerProductToCart(item));
  };

  const deleteOneItem = (e: any, item: any) => {
    const currentValue = +e.target.ariaValueNow;
    if (currentValue === 1) {
      reachedProductLimit.play();
      return;
    }

    productAmountChanged.play();
    dispatch(deletWelcomeWienerProductFromCart(item));
  };
  return (
    <tr>
      <td style={{ padding: '10px 13px 10px 13px', width: '100px' }}>
        <Image
          src={item?.image ?? item?.productImage}
          alt={item?.name}
          roundedCircle
          width='85px'
          height='85px'
          style={{ objectFit: 'contain', background: '#fff' }}
        />
      </td>

      <td style={{ maxWidth: '60px' }}>
        <ProductName
          to={`/welcome-wiener/${item?.dachshundId}`}
          onClick={() => dispatch(openCartDrawer(false))}
        >
          {item.productName} for {item.dachshundName}
        </ProductName>
        {item?.size && <Text fontSize='12px'>{item?.size}</Text>}
      </td>
      <td>
        <div className='d-flex align-items-center'>
          <Text marginRight='8px' fontWeight={400} color='#858382' width='15px'>
            {item.qty ?? item?.quantity}
          </Text>

          <div className='d-flex flex-column'>
            <CartBtn
              className='plus'
              onClick={() => addOneItem(item)}
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
      </td>
      <td>
        <Text className='pr-2' fontWeight='bold'>
          ${Number(item?.price)?.toFixed(2)}
        </Text>
      </td>
      <td className='remove-cart-item'>
        <i
          className='fas fa-times fa-sm ml-3'
          onClick={() => dispatch(removeWelcomeWienerProductFromCart(item))}
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;
