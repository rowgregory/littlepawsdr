import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import Message from '../../components/Message';
import Product from './Product';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
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
import { Image } from 'react-bootstrap';
import ShopDog from '../../components/assets/shop01.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

const Shop = () => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('');

  let {
    productList: { loading, error, products },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const filterProducts = products?.filter((product: any) =>
    product?.category.includes(currentCategory)
  );

  return (
    <>
      <div style={{ position: 'relative', marginTop: '75px' }}>
        <Image
          src={ShopDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Little Paws Clothing & Accessories
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://pixabay.com/users/lorisw-18960023/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6256951',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by Lori Webre
        </Text>
      </div>
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Foster Application'
            url2='/volunteer/foster-application'
          />
          <RightArrow text='Events' url='/events' />
        </div>
        {loading && <HexagonLoader />}
        <Text
          marginBottom='48px'
          marginTop='56px'
          fontSize='32px'
          fontWeight={400}
          textAlign='center'
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
        {error ? (
          <div className='d-flex flex-column align-items-center'>
            <Message variant='danger'>{error}</Message>
          </div>
        ) : products?.length === 0 ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-3'>
              <NoShop />
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
                      <Category
                        active={category === currentCategory}
                        key={i}
                        onClick={() => setCurrentCategory(category)}
                      >
                        {category}
                      </Category>
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
                    {filterProducts?.length === 0 ? (
                      <Text marginTop='16px'>No products available</Text>
                    ) : (
                      filterProducts
                        ?.map((product: any) => (
                          <Product product={product} key={product._id} />
                        ))
                        .reverse()
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

export default Shop;
