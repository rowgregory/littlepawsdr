import { Accordion } from '../../styles/place-order/Styles';
import { Form } from 'react-bootstrap';
import { chooseSizes, sizes_v2 } from '../../../utils/adminProductUtils';
import { Quantity, SelectInput, SelectInputContainer } from '../../styles/product-details/Styles';

const ProductSizes = ({ doesProductHaveSizes, sizes, setInputs }: any) => {
  const isSizeSelected = (sizeChosen: any) =>
    sizes?.some((itemSize: any) => itemSize.size === sizeChosen);

  const handleAmountChange = (selectedSize: any, selectedQty: any) => {
    setInputs((prev: any) => ({
      ...prev,
      sizes: sizes?.map((itemSize: any) =>
        itemSize?.size === selectedSize ? { ...itemSize, amount: selectedQty } : itemSize
      ),
    }));
  };

  return (
    <Accordion toggle={doesProductHaveSizes} maxheight='453px'>
      <Form.Group className='flex flex-col' controlId='chooseSizes'>
        <label className='font-Matter-Medium text-sm mb-2'>
          Click and select a size and an amount
        </label>
        <div className='flex flex-col'>
          {sizes_v2.map((s, i) => (
            <div key={i} className='flex'>
              <button
                className={`duration-300 flex items-center justify-center cursor-pointer w-20 h-16 mt-0 mr-3 mb-2 ml-0 ${
                  isSizeSelected(s?.size)
                    ? 'bg-blue-to-purple border-transparent text-white'
                    : 'border-[1px] border-gray-100'
                } hover:bg-blue-to-purple hover:text-white`}
                onClick={(e: any) => chooseSizes(s, sizes, setInputs, e)}
                key={i}
              >
                {s?.size}
              </button>
              {isSizeSelected(s.size) && (
                <SelectInputContainer>
                  <Quantity>QTY</Quantity>
                  <SelectInput
                    value={sizes?.find((itemSize: any) => itemSize?.size === s?.size)?.amount || 1}
                    as='select'
                    onChange={(e: any) => handleAmountChange(s.size, +e.target.value)}
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
        </div>
      </Form.Group>
    </Accordion>
  );
};

export default ProductSizes;
