import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import {
  Category,
  CategoryContainer,
  ClearFilter,
  Container,
  FilterColumn,
  GridIconContainer,
  LoadingContainer,
  PageContent,
} from '../../components/styles/shop/Styles';
import { categories } from '../../utils/shopCategories';
import NoShop from '../../components/svg/NoShop';
import { Text } from '../../components/styles/Styles';
import ShopHigh from '../../components/assets/shop-high.jpg';
import ShopLow from '../../components/assets/shop-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { LoadingImg } from '../../components/LoadingImg';
import { listProducts } from '../../actions/productActions';

const Merch = () => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('');

  const state = useSelector((state: any) => state);
  const loading = state.productList.loading;
  const products = state.productList.products;

  products?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filterProducts = products?.filter((product: any) =>
    product?.category.includes(currentCategory)
  );

  useEffect(() => {
    dispatch(listProducts())
  }, [])

  return (
    <>
      <Hero
        low={ShopLow}
        high={ShopHigh}
        title='Little Paws Merch'
        link='https://unsplash.com/es/@davidiz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='David Izquierdo'
      />

      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Foster Application'
            url2='/volunteer/foster-application'
          />
          <RightArrow text='Ecards' url='/ecards' />
        </div>
        <Text
          fontSize='31px'
          marginTop='56px'
          fontWeight={400}
          textAlign='center'
          marginBottom='24px'
        >
          All gifts to Little Paws goes directly to help abandoned or
          surrendered dachshunds.
        </Text>
      </Container>
      <div
        style={{
          maxWidth: '1450px',
          width: '100%',
          marginInline: 'auto',
          paddingBottom: '64px',
        }}
      >
        {products?.length === 0 ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-3'>
              <NoShop color='#ccc' />
            </div>
            <Text>
              Sorry, no products available at the moment. Check back soon!
            </Text>
          </div>
        ) : (
          <>
            <PageContent>
              <div className='d-flex'>
                <FilterColumn>
                  <CategoryContainer className='d-flex flex-column'>
                    <Text fontWeight={600} marginBottom='10px' marginLeft='8px'>
                      Category
                    </Text>
                    {categories().map((category: string, i: number) => (
                      <div key={i}>
                        <Category
                          active={category === currentCategory}
                          onClick={() => setCurrentCategory(category)}
                        >
                          {category}
                        </Category>
                      </div>
                    ))}
                  </CategoryContainer>
                  <ClearFilter onClick={() => setCurrentCategory('')}>
                    Clear filter
                  </ClearFilter>
                </FilterColumn>
                <div
                  style={{
                    width: '100%',
                    marginBottom: '128px',
                    paddingInline: '16px',
                  }}
                >
                  <GridIconContainer>
                    {filterProducts?.length} item
                    {filterProducts?.length === 1 ? '' : 's'}
                  </GridIconContainer>
                  <div className='d-flex flex-column'>
                    {loading ? (
                      <LoadingContainer>
                        <LoadingImg ar='1/1' />
                        <div className='flex flex-column'>
                          <LoadingImg h='27px' w='100%' />
                          <LoadingImg h='40px' w='100%' mt='4px' />
                        </div>
                      </LoadingContainer>
                    ) : filterProducts?.length === 0 ? (
                      <Text marginTop='16px'>No products available</Text>
                    ) : (
                      filterProducts?.map((product: any) => (
                        <Product key={product._id} product={product} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </PageContent>
          </>
        )}
      </div>
    </>
  );
};

export default Merch;
