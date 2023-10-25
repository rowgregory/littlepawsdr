import {
  AddToCartBtn,
  AddToCartSectionContainer,
  Quantity,
  SelectInput,
  SelectSizeContainer,
} from '../styles/product-details/Styles';
import { Flex, Text } from '../styles/Styles';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { LoadingImg } from '../LoadingImg';

const AddToCartSection = ({
  product,
  outOfStock,
  qty,
  setQty,
  size,
  addToCartHandler,
  loading,
}: {
  product: any;
  outOfStock: boolean;
  qty: number;
  setQty: (qty: number) => void;
  size: string;
  addToCartHandler: (product: any) => void;
  loading: boolean;
}) => {
  const state = useSelector((state: any) => state);
  const loadingCart = state.cart.loading;

  const stock =
    product?.sizes?.filter((item: any) => item.size === size)[0]?.amount ||
    product?.countInStock;
  const quantityOptions = stock === -1 ? [0] : [...Array(stock).keys()];

  return loading ? (
    <LoadingImg w='100%' h='272px' />
  ) : (
    <AddToCartSectionContainer>
      <Flex>
        <Text position='absolute' top='6px' fontWeight={500}>
          $
        </Text>
        <Text
          marginLeft='0.7rem'
          fontWeight='bold'
          fontSize='2rem'
          marginBottom='0.8rem'
        >
          {product?.price}
        </Text>
      </Flex>
      <Text
        color={outOfStock ? 'red' : '#007600'}
        fontSize='1.5rem'
        fontWeight='500'
        marginBottom='0.2rem'
        lineHeight='24px'
      >
        {outOfStock ? 'Not In stock' : 'In stock'}
      </Text>
      {!outOfStock && (
        <>
          <Text marginBottom='1rem' fontWeight='400'>
            Usually ships within 4 to 5 days
          </Text>

          <SelectSizeContainer>
            <Quantity>Qty</Quantity>
            <SelectInput
              value={qty}
              as='select'
              onChange={(e: any) => setQty(e.target.value)}
            >
              {quantityOptions.map((option: any, i: number) => (
                <option key={i} value={option}>
                  {option + 1}
                </option>
              ))}
            </SelectInput>
          </SelectSizeContainer>
        </>
      )}
      <AddToCartBtn
        disabled={outOfStock}
        onClick={() => addToCartHandler(product)}
      >
        {loadingCart ? (
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
          />
        ) : (
          'Add To Cart'
        )}
      </AddToCartBtn>
    </AddToCartSectionContainer>
  );
};

export default AddToCartSection;
