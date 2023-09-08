import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductsAndEcards } from '../../actions/productActions';
import Message from '../../components/Message';
import Product from './Product';
import {
  Category,
  CategoryContainer,
  ClearFilter,
  Container,
  FilterColumn,
  GridIconContainer,
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
import { eCardCategories } from '../../utils/eCardCategories';

const Merch = () => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('');

  const state = useSelector((state: any) => state);

  const loading = state.productEcardList.loading;
  const error = state.productEcardList.error;
  const productsAndEcards = state.productEcardList.products;

  useEffect(() => {
    dispatch(listProductsAndEcards());
  }, [dispatch]);

  productsAndEcards?.sort(
    (a: any, b: any) => -a?.createdAt?.localeCompare(b?.createdAt)
  );

  const filterProductsAndEcards = productsAndEcards?.filter(
    (product: any) =>
      product?.category.includes(currentCategory) ||
      (currentCategory === 'Ecards' && product.isEcard)
  );

  const ecardCountArray = productsAndEcards?.reduce((acc: any, item: any) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, []);

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
          <RightArrow text='Welcome Wieners' url='/welcome-wieners' />
        </div>
        <h1
          style={{
            marginBottom: '48px',
            marginTop: '56px',
            fontSize: '32px',
            fontWeight: 400,
            textAlign: 'center',
          }}
        >
          All gifts to Little Paws goes directly to help abandoned or
          surrendered dachshunds.
        </h1>
      </Container>
      <div
        style={{
          maxWidth: '1450px',
          width: '100%',
          marginInline: 'auto',
          paddingBottom: '64px',
        }}
      >
        {error ? (
          <div className='d-flex flex-column align-items-center'>
            <Message variant='danger'>{error}</Message>
          </div>
        ) : productsAndEcards?.length === 0 ||
          productsAndEcards === undefined ? (
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
                        {category === 'Ecards' &&
                          eCardCategories?.map(
                            (ecardCategory: any, i: number) => (
                              <Category
                                active={ecardCategory === currentCategory}
                                key={i}
                                onClick={() =>
                                  setCurrentCategory(ecardCategory)
                                }
                                className='ml-3'
                              >
                                {ecardCategory}&nbsp;
                                {ecardCountArray[ecardCategory] >= 1 &&
                                  `(${ecardCountArray[ecardCategory]})`}
                              </Category>
                            )
                          )}
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
                    {filterProductsAndEcards?.length} item
                    {filterProductsAndEcards?.length === 1 ? '' : 's'}
                  </GridIconContainer>
                  <div className='d-flex flex-column'>
                    {filterProductsAndEcards?.length === 0 ? (
                      <Text marginTop='16px'>No products available</Text>
                    ) : (
                      filterProductsAndEcards?.map((product: any) => (
                        <Product
                          key={product._id}
                          product={product}
                          loading={loading}
                        />
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
