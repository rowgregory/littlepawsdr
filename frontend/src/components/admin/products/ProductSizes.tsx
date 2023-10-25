import { Accordion } from '../../styles/place-order/Styles';
import { Form } from 'react-bootstrap';
import { chooseSizes, sizes_v2 } from '../../../utils/adminProductUtils';
import styled from 'styled-components';
import {
  Quantity,
  SelectInput,
  SelectInputContainer,
} from '../../styles/product-details/Styles';

const SizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const SizeBtn = styled.div<{ active?: boolean }>`
  height: 3.75rem;
  width: 81.77px;
  margin: 0 1rem 0.5rem 0;
  border: 1px solid ${({ theme }) => theme.colors.quinary};
  color: ${({ theme, active }) =>
    active ? theme.white : theme.colors.quinary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ theme, active }) => (active ? theme.colors.quinary : '')};
  transition: 300ms;
  :hover {
    color: ${({ theme, active }) => theme.white};
    background: ${({ theme, active }) => (active ? '' : theme.colors.quinary)};
  }
`;

const ProductSizes = ({
  doesProductHaveSizes,
  productSizes,
  setProductSizes,
}: any) => {
  const isSizeSelected = (size: any) =>
    productSizes.some((productSize: any) => productSize.size === size);

  const handleAmountChange = (size: any, newAmount: any) => {
    const updatedProductSizes = productSizes.map((productSize: any) =>
      productSize.size === size
        ? { ...productSize, amount: newAmount }
        : productSize
    );
    setProductSizes(updatedProductSizes);
  };

  return (
    <Accordion toggle={doesProductHaveSizes} maxheight='470px'>
      <Form.Group className='d-flex flex-column' controlId='chooseSizes'>
        <Form.Label>Choose which sizes you want.</Form.Label>
        <SizeContainer className='mb-0'>
          {sizes_v2().map((s, i) => (
            <div key={i} className='d-flex'>
              <SizeBtn
                active={isSizeSelected(s.size)}
                onClick={() => chooseSizes(s, productSizes, setProductSizes)}
                key={i}
              >
                {s?.size}
              </SizeBtn>
              {isSizeSelected(s.size) && (
                <SelectInputContainer>
                  <Quantity>QTY</Quantity>
                  <SelectInput
                    value={
                      productSizes?.find(
                        (productSize: any) => productSize?.size === s?.size
                      )?.amount || 1
                    }
                    as='select'
                    onChange={(e: any) =>
                      handleAmountChange(s.size, +e.target.value)
                    }
                  >
                    {[...Array(20).keys()].map((x, i) => (
                      <option key={i} value={x + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </SelectInput>
                </SelectInputContainer>
              )}
            </div>
          ))}
        </SizeContainer>
      </Form.Group>
    </Accordion>
  );
};

export default ProductSizes;
