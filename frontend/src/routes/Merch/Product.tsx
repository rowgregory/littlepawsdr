import React from 'react';
import { Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ProceedBtn } from '../../components/forms/ShippingForm';
import { LoadingImg } from '../../components/LoadingImg';
import { Text } from '../../components/styles/Styles';

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 48px;
  padding-top: 48px;
  border-bottom: 1px solid #ededed;
  gap: 16px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 30% 30%;
    gap: 32px;
    justify-content: space-between;
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

const Product = ({ product, loading }: any) => {
  const history = useHistory();
  const isEcard = product?.isEcard;

  return (
    <Container>
      <Link
        to={{
          pathname: `/merch/${product?._id}`,
          state: { product },
        }}
      >
        {loading ? (
          <LoadingImg w='100%' mw='230px' />
        ) : (
          <ProductImg src={product.image} alt={product?.name} />
        )}
      </Link>

      <div className='d-flex flex-column align-items-start'>
        <Text marginBottom='4px'>
          {loading ? (
            <LoadingImg w='150px' h='27px' />
          ) : (
            <>
              <Price style={{ color: '#22c2b7' }}>FREE</Price>
              {isEcard ? ' ecard' : ' product'} with a{' '}
              <Price>${product?.price}</Price> donation!
            </>
          )}
        </Text>
        {loading ? (
          <LoadingImg w='100%' h='40px' />
        ) : (
          <ProceedBtn
            className='w-100'
            onClick={() =>
              history.push({
                pathname: `/merch/${product?._id}`,
                state: { product },
              })
            }
          >
            View {isEcard ? 'Ecard' : 'Product'}
          </ProceedBtn>
        )}
      </div>
    </Container>
  );
};

export default Product;