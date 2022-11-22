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
  LargeGridSquareContainer,
  PageContent,
  ProductContainer,
  ShopTitle,
  SmallGridSquareContainer,
} from '../../components/styles/shop/Styles';
import ShopFilterModal from '../../components/shop/ShopFilterModal';
import { categories } from '../../utils/shopCategories';
import FilterIcon from '../../components/svg/FilterIcon';
import NoShop from '../../components/svg/NoShop';
import { Text } from '../../components/styles/Styles';
import { Link } from 'react-router-dom';

export const LargeGrid = ({ isLargeGrid, large }: any) => {
  return (
    <LargeGridSquareContainer active={isLargeGrid} onClick={() => large(true)}>
      {[...Array(9).keys()].map((_: any, i: number) => (
        <div key={i}></div>
      ))}
    </LargeGridSquareContainer>
  );
};
export const SmallGrid = ({ isLargeGrid, small }: any) => {
  return (
    <SmallGridSquareContainer active={isLargeGrid} onClick={() => small(false)}>
      {[...Array(4).keys()].map((_: any, i: number) => (
        <div key={i}></div>
      ))}
    </SmallGridSquareContainer>
  );
};

const Shop = () => {
  const dispatch = useDispatch();
  const [isLargeGrid, setIsLargeGrid] = useState(true);
  const [show, setShow] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    productList: { loading, error, products },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const filterProducts = products?.filter((product: any) =>
    product?.category.includes(currentCategory)
  );

  if (products?.length === 0) {
    return (
      <div
        style={{
          height: 'calc(100vh - 611.5px)',
          width: '100%',
          padding: '56px 16px',
          marginInline: 'auto',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <NoShop />
        <Text fontSize='16px'>No products at this time. Check back soon!</Text>
        <Text fontSize='16px'>
          Head on over and take a look at our{' '}
          <span style={{ fontSize: '16px' }}>
            <Link to='/available'>available dachshunds</Link>
          </span>{' '}
          or check out our{' '}
          <span style={{ fontSize: '16px' }}>
            <Link to='/about/blog'>blogs</Link>
          </span>
          .
        </Text>
      </div>
    );
  }

  return (
    <Container>
      {loading && <HexagonLoader />}
      {error && <Message variant='danger'>{error}</Message>}
      <ShopFilterModal
        show={show}
        close={handleClose}
        setCurrentCategory={setCurrentCategory}
      />
      <PageContent>
        <div className='d-flex'>
          <FilterColumn>
            <CategoryContainer className='d-flex flex-column'>
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
          <div style={{ width: '100%' }} className='p-3'>
            <div>
              <div className='d-flex align-items-center justify-content-between mb-5'>
                <ShopTitle>Little Paws Clothing & Accessories</ShopTitle>
                <GridIconContainer>
                  <FilterIcon
                    isFilter={show}
                    handleShow={handleShow}
                  ></FilterIcon>
                  <LargeGrid isLargeGrid={isLargeGrid} large={setIsLargeGrid} />
                  <SmallGrid isLargeGrid={isLargeGrid} small={setIsLargeGrid} />
                </GridIconContainer>
              </div>

              <ProductContainer islargegrid={isLargeGrid}>
                {filterProducts?.length === 0 ? (
                  <div>Sorry, more {currentCategory} soon to come!</div>
                ) : (
                  filterProducts?.map((product: any) => (
                    <Product product={product} key={product._id} />
                  ))
                )}
              </ProductContainer>
            </div>
          </div>
        </div>
      </PageContent>
    </Container>
  );
};

export default Shop;
