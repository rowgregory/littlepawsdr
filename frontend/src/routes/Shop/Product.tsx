import React from 'react';
import { Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ProceedBtn } from '../../components/forms/ShippingForm';
import { Text } from '../../components/styles/Styles';

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-bottom: 48px;
  padding-top: 48px;
  border-bottom: 1px solid #ededed;
  gap: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 25% 42.5% 23%;
    gap: 32px;
  }
`;

const ProductName = styled(Link)`
  font-weight: 600;
  height: 42px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.quinary};
  :hover {
    color: ${({ theme }) => theme.colors.quinary};
    text-decoration: none;
    filter: brightness(0.75);
  }
`;

const ProductImg = styled(Image)`
  object-fit: contain;
  width: 100%;
  width: 100%;
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

const Product = ({ product, isEcard }: any) => {
  const history = useHistory();

  return (
    <Container>
      <Link
        to={{
          pathname: isEcard
            ? '/e-card-details'
            : `/shop/product/${product?._id}`,
          state: { product },
        }}
      >
        <ProductImg src={product.image} />
      </Link>

      <ProductName
        to={{
          pathname: isEcard
            ? '/e-card-details'
            : `/shop/product/${product?._id}`,
          state: { product },
        }}
      >
        {product?.name}
      </ProductName>
      <div className='d-flex flex-column'>
        <Text marginBottom='4px'>
          <Price style={{ color: '#22c2b7' }}>FREE</Price>
          {isEcard ? ' ecard' : ' product'} with a{' '}
          <Price>${product?.price}</Price> donation!
        </Text>
        <ProceedBtn
          onClick={() =>
            history.push({
              pathname: isEcard
                ? '/e-card-details'
                : `/shop/product/${product?._id}`,
              state: { product },
            })
          }
        >
          View {isEcard ? 'Ecard' : 'Product'}
        </ProceedBtn>
      </div>
    </Container>
  );
};

export default Product;
