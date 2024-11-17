import { Quantity, SelectInput, SelectSizeContainer } from '../styles/product-details/Styles';
import { LoadingImg } from '../LoadingImg';
import { FC } from 'react';

interface AddToCartSectionProps {
  product: any;
  qty: number;
  setQty: (qty: number) => void;
  addToCartHandler: (product: any) => void;
  loading: boolean;
  size: string;
}

const AddToCartSection: FC<AddToCartSectionProps> = ({
  product,
  qty,
  setQty,
  addToCartHandler,
  loading,
  size,
}) => {
  const stock = product?.hasSizes
    ? product?.sizes.find((itemSize: any) => itemSize.size === size)?.amount
    : product?.countInStock;

  const outOfStock = product?.isOutofStock;

  const quantityOptions = stock < 0 ? [0] : [...Array(stock).keys()].map((num) => num + 1);

  return loading ? (
    <LoadingImg w='100%' h='272px' />
  ) : (
    <div className='w-full col-span-12 rounded-lg h-fit flex flex-col py-4 sm:px-3.5 md:col-span-4 md:px-0'>
      <div className='flex relative'>
        <p className='absolute top-1 font-Matter-Medium'>$</p>
        <p className='text-4xl ml-2.5 mt-1 mb-2 font-Matter-Medium'>{product?.price}</p>
      </div>
      <p
        className={`text-2xl font-Matter-Medium ${outOfStock ? 'text-red-500' : 'text-green-600'}`}
      >
        {outOfStock ? 'Not in stock' : 'In stock'}
      </p>
      {!outOfStock && (
        <>
          <p className='mb-3 font-Matter-Regular text-sm'>Usually ships within 4 to 5 days</p>
          <SelectSizeContainer>
            <Quantity>Qty</Quantity>
            <SelectInput value={qty} as='select' onChange={(e: any) => setQty(e.target.value)}>
              {quantityOptions?.map((option: any, i: number) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </SelectInput>
          </SelectSizeContainer>
        </>
      )}
      <button
        className='bg-yellow-300 text-zinc-800 py-2 rounded-lg w-full duration-300 hover:bg-yellow-400'
        disabled={outOfStock}
        onClick={() => addToCartHandler(product)}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddToCartSection;
