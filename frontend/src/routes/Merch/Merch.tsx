import { Fragment, useState } from 'react';
import Product from './Product';
import { categories } from '../../utils/shopCategories';
import NoShop from '../../components/svg/NoShop';
import ShopHigh from '../../components/assets/shop-high.jpg';
import ShopLow from '../../components/assets/shop-low.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import Hero from '../../components/Hero';
import { LoadingImg } from '../../components/LoadingImg';
import { useGetProductsQuery } from '../../redux/services/productApi';
import styled from 'styled-components';

const CategoryContainer = styled.div`
  padding-left: 16px;
`;

const Category = styled.div<{ active: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  background: ${({ active, theme }) => (active ? theme.table.even : '')};
  :hover {
    background: ${({ theme }) => theme.table.even};
  }
`;

const ClearFilter = styled.div`
  padding: 8px 32px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border: 1px solid transparent;
  :hover {
    border: 1px dashed ${({ theme }) => theme.text};
  }
`;

const FilterColumn = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    min-width: 250px;
    max-width: 250px;
    width: 100%;
    display: block;
    margin-right: 24px;
  }
`;

const GridIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 24px 0;
  font-weight: 600;
  border-bottom: 1px solid #ededed;
`;

const LoadingContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 48px;
  padding-top: 48px;
  gap: 16px;
  text-decoration: none !important;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 50% 30%;
    gap: 32px;
    justify-content: space-between;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 40% 30%;
    gap: 32px;
    justify-content: space-between;
  }
`;

const PageContent = styled.div`
  width: 100%;
  margin-inline: auto;
  min-height: 700px;
`;

const Merch = () => {
  const [currentCategory, setCurrentCategory] = useState('');

  const { data, isLoading } = useGetProductsQuery();

  const filterProducts = data?.products?.filter((product: any) =>
    product?.category.includes(currentCategory)
  );

  return (
    <Fragment>
      <Hero
        low={ShopLow}
        high={ShopHigh}
        title='Little Paws Merch'
        link='https://unsplash.com/es/@davidiz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='David Izquierdo'
      />
      <div className='max-w-screen-lg w-full mx-auto px-3'>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Foster Application'
            url2='/volunteer/foster-application'
          />
          <RightArrow text='Ecards' url='/ecards' />
        </div>
        <p className='text-xl mt-14 font-Matter-Medium text-center mb-6'>
          All gifts to Little Paws goes directly to help abandoned or surrendered dachshunds.
        </p>
      </div>
      <div className='max-w-screen-xl w-full mx-auto pb-16'>
        {data?.products?.length === 0 ? (
          <div className='d-flex flex-column align-items-center'>
            <NoShop color='#ccc' />

            <p className='font-Matter-Regular mt-3'>
              Sorry, no products available at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <PageContent>
              <div className='flex'>
                <FilterColumn>
                  <CategoryContainer className='flex flex-col'>
                    <p className='font-Matter-Medium mb-2.5 ml-2'>Category</p>
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
                  <ClearFilter onClick={() => setCurrentCategory('')}>Clear filter</ClearFilter>
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
                    {isLoading ? (
                      <LoadingContainer>
                        <LoadingImg ar='1/1' />
                        <div className='flex flex-column'>
                          <LoadingImg h='27px' w='100%' />
                          <LoadingImg h='40px' w='100%' mt='4px' />
                        </div>
                      </LoadingContainer>
                    ) : filterProducts?.length === 0 ? (
                      <p className='font-Matter-Regular mt-3'>No products available</p>
                    ) : (
                      filterProducts
                        ?.map((product: any) => <Product key={product._id} product={product} />)
                        .reverse()
                    )}
                  </div>
                </div>
              </div>
            </PageContent>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Merch;
