import styled from 'styled-components';
import { Text } from '../styles/Styles';
import { FC } from 'react';

const Container = styled.div<{ selected: boolean }>`
  width: 100%;
  display: flex;
  padding: 8px;
  cursor: pointer;
  background: ${({ selected }) => (selected ? 'rgb(0 0 0/0.095)' : '#fff')};
  border-radius: 8px;
  position: relative;
  margin-bottom: 28px;
  :hover {
    background: rgb(0 0 0/0.095);
  }
`;

const CheckMark = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #05a532;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -6px;
  top: -12px;
`;

interface WelcomeWienerProductProps {
  product: {};
  inputs: {};
  addToAssociatedProducts: () => void;
}

const WelcomeWienerProduct: FC<WelcomeWienerProductProps> = ({
  product,
  inputs,
  addToAssociatedProducts,
}: any) => {
  const isSelected = inputs?.associatedProducts?.some(
    (item: any) => item?._id === product?._id
  );

  return (
    <Container
      selected={isSelected}
      onClick={() => addToAssociatedProducts(product)}
    >
      {isSelected && (
        <CheckMark>
          <i className='fas fa-check' style={{ color: '#fff' }}></i>
        </CheckMark>
      )}
      <i className={`${product?.icon} fa-2x`}></i>
      <div className='d-flex flex-column ml-3'>
        <Text
          fontSize='14px'
          fontWeight='500'
          style={{ textTransform: 'uppercase' }}
        >
          {product.name}
        </Text>
        <Text fontSize='14px' fontWeight='400'>
          Donation Amount: {product.price}
        </Text>
      </div>
    </Container>
  );
};

export default WelcomeWienerProduct;
