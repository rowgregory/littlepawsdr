import { FC } from 'react';

interface ProductProps {
  product: {};
  inputs: {};
  addToAssociatedProducts: any;
}

const WelcomeWienerProduct: FC<ProductProps> = ({
  product,
  inputs,
  addToAssociatedProducts,
}: any) => {
  const isSelected = inputs?.associatedProducts?.some(
    (item: any) => item?._id === product?._id
  );

  return (
    <div
      className={`${isSelected ? 'bg-gray-200' : 'bg-[#fff] border-dashed border-2 border-gray-100'
        } w-28 h-28 flex justify-center items-center flex-col p-2 cursor-pointer rounded-md relative hover:bg-gray-100`}
      onClick={() => addToAssociatedProducts(product)}
    >
      {isSelected && (
        <div className='absolute w-5 h-5 rounded-full bg-green-500 flex items-center justify-center right-2 top-2'>
          <i className='fas fa-check fa-xs text-[#fff]'></i>
        </div>
      )}
      <i className={`${product?.icon} fa-sm mb-2`}></i>
      <p className='text-sm font-Matter-Regular text-center'>{product.name}</p>
    </div>
  );
};

export default WelcomeWienerProduct;
