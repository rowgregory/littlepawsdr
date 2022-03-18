import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';

const ProductName = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  height: 42px;
  font-family: 'Duru', sans-serif;
  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.pageHeader};
  }
`;

const ProductImg = styled(Card.Img)`
  object-fit: cover;
  height: 480px;
  width: 100%auto;
  max-width: 420px;
`;

const Product = ({ product }: any) => {
  return (
    <div className='d-flex flex-column'>
      <Link to={`/shop/product/${product._id}`}>
        <div className='h-100 w-100'>
          <ProductImg src={product.image} variant='top' />
        </div>
      </Link>
      <Card.Body className='pl-0 pt-2'>
        <ProductName to={`/shop/product/${product._id}`}>
          <Text fontSize='1.09rem'>{product?.name}</Text>
        </ProductName>
        <Text fontSize='1rem'>
          ${product?.price?.toString().split('.')[0]}
          <sup style={{ marginLeft: '1px', fontSize: '0.75rem' }}>
            {product?.price?.toString().split('.')[1]}
          </sup>
        </Text>
      </Card.Body>
    </div>
  );
};

export default Product;
