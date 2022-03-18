import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listProducts } from '../../actions/productActions';
import Message from '../../components/Message';
import Product from './Product';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Container = styled.div`
  margin-bottom: 20rem;
`;

const ShopTitle = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 4rem 0;
  color: ${({ theme }) => theme.text};
`;

const CategoryContainer = styled.div`
  margin: 4rem 0 0 0;
`;

const Category = styled.div<{ active: boolean }>`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  background: ${({ active, theme }) => (active ? theme.table.even : '')};
  :hover {
    background: ${({ theme }) => theme.table.even};
  }
`;

const PageContent = styled.div`
  max-width: ${({ theme }) => theme.breakpoints[5]};
  width: 100%;
  margin: 0 auto;
`;

const ProductContainer = styled.div<{ islargegrid: boolean }>`
  display: grid;
  grid-gap: 0.75rem;
  grid-template-columns: 1fr;
  max-width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    grid-template-columns: ${({ islargegrid }) =>
      islargegrid ? '1fr 1fr' : '1fr'};
  }
`;

const ClearFilter = styled.div`
  padding: 0.5rem 1rem 0.5rem 0.9375rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border: 1px solid transparent;
  :hover {
    border: 1px dashed ${({ theme }) => theme.text};
  }
`;

const GridIconContainer = styled.div`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const GridIcon = styled.i`
  color: ${({ theme }) => theme.colors.blue04};
`;

export const categories = () => [
  'Totes',
  'Shirts',
  'Sweatshirts',
  'Socks',
  'Tumblers',
  'Mugs',
  'Car magnets',
  'Stickers',
];

const Shop = () => {
  const dispatch = useDispatch();
  const [isLargeGrid, setIsLargeGrid] = useState(false);
  const state = useSelector((state: any) => state);
  const {
    // loading,
    error,
    products,
  } = state?.productList;
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const filterProducts = products?.filter((product: any) =>
    product?.category.includes(currentCategory)
  );

  return (
    <Container>
      {/* {loading && <Loader />} */}
      <PageContent>
        <div className='d-flex'>
          <Col lg={2} md={2} sm={3} xs={3}>
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
          </Col>
          <Col lg={10}>
            <div className='d-flex justify-content-between'>
              <ShopTitle>Little Paws Clothing & Accessories</ShopTitle>
              <GridIconContainer>
                <GridIcon
                  onClick={() => setIsLargeGrid(false)}
                  className='fas fa-th fa-2x'
                  style={{ cursor: 'pointer' }}
                ></GridIcon>
                <div
                  onClick={() => setIsLargeGrid(true)}
                  style={{ cursor: 'pointer', marginTop: '1px' }}
                >
                  <GridIcon className='fas fa-grip-vertical fa-2x'></GridIcon>
                  <GridIcon
                    className='fas fa-grip-vertical fa-2x'
                    style={{ marginLeft: '3px' }}
                  ></GridIcon>
                </div>
              </GridIconContainer>
            </div>
            {error && <Message variant='danger'>{error}</Message>}{' '}
            <ProductContainer islargegrid={isLargeGrid}>
              <TransitionGroup component='div'>
                {filterProducts?.length === 0 ? (
                  <CSSTransition timeout={500} classNames='item'>
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          position:
                            currentCategory === '' ? 'relative' : 'absolute',
                        }}
                      >
                        <div>Sorry, more {currentCategory} soon to come!</div>{' '}
                      </div>
                    </div>
                  </CSSTransition>
                ) : (
                  filterProducts?.map((product: any) => (
                    <CSSTransition
                      key={product._id}
                      timeout={500}
                      classNames='item'
                    >
                      <div style={{ position: 'relative' }}>
                        <div
                          style={{
                            position:
                              currentCategory === '' ? 'relative' : 'absolute',
                          }}
                        >
                          <Product product={product} key={product._id} />
                        </div>
                      </div>
                    </CSSTransition>
                  ))
                )}
              </TransitionGroup>
            </ProductContainer>
            {/* )} */}
          </Col>
        </div>
      </PageContent>
    </Container>
  );
};

export default Shop;
