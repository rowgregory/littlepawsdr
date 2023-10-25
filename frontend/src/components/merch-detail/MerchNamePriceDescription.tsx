import { Text } from '../styles/Styles';
import {
  HorizontalLine,
  PriceContainer,
  Quantity,
  SelectInput,
  SelectSizeContainer,
} from '../styles/product-details/Styles';
import { LoadingImg } from '../LoadingImg';

const MerchNamePriceDescription = ({
  product,
  size,
  setSize,
  loading,
}: {
  product: any;
  size: any;
  setSize: any;
  loading: boolean;
}) => {
  return loading ? (
    <LoadingImg w='100%' h='42px' />
  ) : (
    <div>
      <Text fontSize='28px' fontWeight={400}>
        {product?.name}
      </Text>
      <HorizontalLine margin='0 0 1rem 0' />
      <PriceContainer>
        <Text fontWeight={500}>$</Text>
        <Text
          marginLeft='0.7rem'
          fontWeight='bold'
          fontSize='2rem'
          marginBottom='0.8rem'
        >
          {product?.price}
        </Text>
      </PriceContainer>
      {product?.hasSizes && (
        <SelectSizeContainer>
          <Quantity>Size</Quantity>
          <SelectInput
            value={size}
            as='select'
            onChange={(e: any) => setSize(e.target.value)}
          >
            {product?.sizes?.map((x: any, i: number) => (
              <option key={i} value={x?.size}>
                {x.size}
              </option>
            ))}
          </SelectInput>
        </SelectSizeContainer>
      )}
      {product?.description !== '' && (
        <>
          <HorizontalLine margin='0 0 1rem 0' />
          <Text fontWeight='bold' marginBottom='16px'>
            About this item
          </Text>
          <ul className='pl-4'>
            {product?.description?.split('|').map((item: any, i: number) => (
              <Text key={i}>
                <li>{item}</li>
              </Text>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MerchNamePriceDescription;
