import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';

const ProductName = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 400;
  height: 42px;
  :hover {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
`;

const ProductImg = styled(Card.Img)`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1.75/2;
  width: 100%;
  border-radius: 0;
  /* max-width: 300px; */
`;

const Product = ({ product }: any) => {
  return (
    <div className='d-flex flex-column'>
      <Link to={`/shop/product/${product._id}`}>
        <ProductImg src={product.image} variant='top' />
      </Link>
      <Card.Body className='pl-0 pt-2'>
        <ProductName to={`/shop/product/${product._id}`}>
          {product?.name}
        </ProductName>
        <Text>
          ${product?.price?.toString().split('.')[0]}
          <sup style={{ marginLeft: '1px', fontSize: '10px' }}>
            {product?.price?.toString().split('.')[1]}
          </sup>
        </Text>
      </Card.Body>
    </div>
  );
};

export default Product;
