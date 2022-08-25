import React, { useEffect, useState } from 'react';
import { Col, Modal, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { listProducts } from '../../actions/productActions';
import Message from '../../components/Message';
import Product from './Product';
import {
  Body,
  Content,
  Footer,
  Header,
  LeftBtn,
  Title,
} from '../../components/ContinueSessionModal';
import ComingSoon from '../../components/assets/coming-soon.webp';

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
  width: 100%;
  grid-template-columns: ${({ islargegrid }) =>
    islargegrid ? '1fr 1fr' : '1fr'};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: ${({ islargegrid }) =>
      islargegrid ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'};
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
  width: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    transition: 300ms;
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.colors.quaternary};
    }
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 5rem;
  }
`;

const FilterColumn = styled(Col)`
  display: none;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: block;
  }
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
  'Purse',
  'Other',
];

const ShopFilterModal = ({
  show,
  close,
  currentCategory,
  setCurrentCategory,
}: any) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Content>
        <Header closeButton>
          <Title>Choose a filter below</Title>
        </Header>
        <Body>
          <CategoryContainer className='d-flex flex-column'>
            {categories().map((category: string, i: number) => (
              <Category
                active={category === currentCategory}
                key={i}
                onClick={() => {
                  close();
                  setCurrentCategory(category);
                }}
              >
                {category}
              </Category>
            ))}
          </CategoryContainer>
          <ClearFilter onClick={() => setCurrentCategory('')}>
            Clear filter
          </ClearFilter>
        </Body>
        <Footer>
          <LeftBtn onClick={close}>Close</LeftBtn>
        </Footer>
      </Content>
    </Modal>
  );
};

const FilterIcon = styled.i`
  display: block;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: none;
  }
`;

const Shop = () => {
  const dispatch = useDispatch();
  const [isLargeGrid, setIsLargeGrid] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  if (products?.length === 0) {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Image
          src={ComingSoon}
          alt='coming-soon'
          style={{ maxWidth: '1000px', width: '100%' }}
        />
      </div>
    );
  }

  return (
    <Container>
      <ShopFilterModal
        show={show}
        close={handleClose}
        setCurrentCategory={setCurrentCategory}
      />
      <PageContent>
        <div className='d-flex'>
          <FilterColumn lg={2} md={2} sm={3} xs={3}>
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
          <Col lg={10}>
            <div className='d-flex justify-content-between'>
              <ShopTitle>Little Paws Clothing & Accessories</ShopTitle>
              <GridIconContainer>
                <FilterIcon
                  onClick={() => handleShow()}
                  className='fa-solid fa-sort fa-2x'
                  aria-hidden='true'
                ></FilterIcon>
                <i
                  style={{ color: isLargeGrid ? '' : '#22c2b7' }}
                  onClick={() => setIsLargeGrid(false)}
                  className='fa fa-th-large fa-2x'
                  aria-hidden='true'
                ></i>
                <i
                  style={{ color: isLargeGrid ? '#22c2b7' : '' }}
                  onClick={() => setIsLargeGrid(true)}
                  className='fa fa-th fa-2x'
                  aria-hidden='true'
                ></i>
              </GridIconContainer>
            </div>
            {error && <Message variant='danger'>{error}</Message>}{' '}
            <ProductContainer islargegrid={isLargeGrid}>
              {filterProducts?.length === 0 ? (
                <div>Sorry, more {currentCategory} soon to come!</div>
              ) : (
                filterProducts?.map((product: any) => (
                  <Product product={product} key={product._id} />
                ))
              )}
            </ProductContainer>
          </Col>
        </div>
      </PageContent>
    </Container>
  );
};

export default Shop;
