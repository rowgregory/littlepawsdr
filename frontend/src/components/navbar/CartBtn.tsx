import { FAIcons, Items } from '../styles/NavbarStyles';
import { Link } from 'react-router-dom';

const CartBtn = ({ cartItemsAmount }: { cartItemsAmount: number }) => {
  return (
    <FAIcons className='mr-2 hide'>
      <Link to='/cart' id='cart'>
        <Items>{cartItemsAmount}</Items>
        <i className='fas fa-shopping-cart'></i>
      </Link>
    </FAIcons>
  );
};

export default CartBtn;
