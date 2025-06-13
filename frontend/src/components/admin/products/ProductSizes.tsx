import { chooseSizes, sizes_v2 } from '../../../utils/adminProductUtils';
import Accordion from '../../common/Accordion';

interface ProductSizesProps {
  doesProductHaveSizes: boolean;
  sizes: { size: string; amount: number }[];
  setInputs: React.Dispatch<React.SetStateAction<any>>;
}

const ProductSizes: React.FC<ProductSizesProps> = ({ doesProductHaveSizes, sizes, setInputs }) => {
  const isSizeSelected = (sizeChosen: string) => sizes?.some(({ size }) => size === sizeChosen);

  const getAmountForSize = (sizeChosen: string) => sizes?.find(({ size }) => size === sizeChosen)?.amount ?? 1;

  const handleAmountChange = (selectedSize: string, selectedQty: number) => {
    setInputs((prev: any) => ({
      ...prev,
      sizes: sizes.map((item) => (item.size === selectedSize ? { ...item, amount: selectedQty } : item)),
    }));
  };

  return (
    <Accordion toggle={doesProductHaveSizes} maxheight='453px'>
      <div className='flex flex-col'>
        <label className='font-Matter-Medium text-sm mb-2'>Click and select a size and an amount</label>
        <div className='flex flex-col'>
          {sizes_v2.map(({ size }) => {
            const selected = isSizeSelected(size);

            return (
              <div key={size} className='flex items-center mb-2'>
                <button
                  className={`duration-300 flex items-center justify-center cursor-pointer w-20 h-16 mr-3 ${
                    selected ? 'bg-blue-to-purple border-transparent text-white' : 'border border-gray-100'
                  } hover:bg-blue-to-purple hover:text-white`}
                  onClick={(e) => chooseSizes({ size }, sizes, setInputs, e)}
                >
                  {size}
                </button>

                {selected && (
                  <div className='flex flex-col'>
                    <label htmlFor={`qty-${size}`} className='text-xs mb-1'>
                      QTY
                    </label>
                    <select
                      id={`qty-${size}`}
                      value={getAmountForSize(size)}
                      onChange={(e) => handleAmountChange(size, Number(e.target.value))}
                      className='border rounded px-2 py-1'
                    >
                      {[...Array(20)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Accordion>
  );
};

export default ProductSizes;
