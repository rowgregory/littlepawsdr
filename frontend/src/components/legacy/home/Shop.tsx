import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../Message';
import { VerticalSection } from './VerticalSection';
import { listProducts } from '../../../actions/productActions';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingImg } from '../../styles/Styles';

const ShopContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShopCardContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ShopProduct = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem 0.5rem;
  font-family: 'Ubuntu', sans-serif;
  font-size: 1rem;
  color: #fff;
  div {
    font-weight: bold;
  }
`;

const Shop = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: any) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <ShopContainer>
      {loading ? (
        <ShopCardContainer>
          {[1, 2, 3]
            ?.map((_: any, i: number) => (
              <LoadingImg h='420px' w='420px' key={i} />
            ))
            .filter((_: any, i: number) => i < 3)}
        </ShopCardContainer>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <VerticalSection title='SHOP' />
          <ShopCardContainer>
            {products
              ?.map((product: any, i: number) => (
                <Col md={3} key={i}>
                  <Link to={`/shop/product/${product._id}`}>
                    <ShopProduct src={product.image} alt='LPDR' />
                    <ProductDetailsContainer>
                      <div>{product.name}</div>
                      <div>${product.price}</div>
                    </ProductDetailsContainer>
                  </Link>
                </Col>
              ))
              .filter((_: any, i: number) => i < 3)}
          </ShopCardContainer>
        </>
      )}
    </ShopContainer>
  );
};

export default Shop;
