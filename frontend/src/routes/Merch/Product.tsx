import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProceedBtn } from '../../components/forms/ShippingForm';
import { Text } from '../../components/styles/Styles';
import { formatDateTime } from '../../utils/formatDateTime';

const Container = styled(Link)`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 48px;
  padding-top: 48px;
  border-bottom: 1px solid #ededed;
  gap: 16px;
  text-decoration: none !important;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 50% 30%;
    gap: 32px;
    justify-content: space-between;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 40% 30%;
    gap: 32px;
    justify-content: space-between;
  }

  :hover {
    div + div {
      button {
        filter: brightness(1.1);
        background: #77b300;
        color: #fff;

        :hover {
          letter-spacing: 1px;
          transition: 300ms;
        }
      }
    }
  }
`;

const ProductImg = styled(Image)`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    text-align: left;
  }
`;

const Product = ({ product }: any) => {
  return (
    <Container to={`/merch/${product?._id}`}>
      <div>
        <ProductImg src={product.image} alt={product?.name} />
        <Text fontStyle='italic' fontSize='12px' marginTop='10px'>
          Product released on {formatDateTime(product?.createdAt)}
        </Text>
      </div>
      <div className='d-flex flex-column align-items-start'>
        <Text marginBottom='4px'>
          <Price style={{ color: '#22c2b7' }}>FREE</Price> product with a{' '}
          <Price>${product?.price}</Price> donation!
        </Text>
        <ProceedBtn className='w-100'>View Product</ProceedBtn>
      </div>
    </Container>
  );
};

export default Product;
