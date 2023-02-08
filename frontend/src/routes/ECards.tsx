import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listECards } from '../actions/eCardActions';
import { Text } from '../components/styles/Styles';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import { eCardCategories } from '../utils/eCardCategories';
import { Accordion } from '../components/styles/place-order/Styles';
import EcardsHigh from '../components/assets/ecards-high.jpg';
import EcardsLow from '../components/assets/ecards-low.jpg';
import {
  Category,
  CategoryContainer,
  Container,
  FilterColumn,
  GridIconContainer,
  PageContent,
} from '../components/styles/shop/Styles';
import LeftArrow from '../components/svg/LeftArrow';
import RightArrow from '../components/svg/RightArrow';
import EcardSolidIcon from '../components/svg/EcardSolidIcon';
import Product from './Shop/Product';
import Message from '../components/Message';
import Hero from '../components/Hero';

const ECards = () => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('');
  const [openAccordion, setOpenAccordion] = useState(false);
  const {
    eCardList: { loading, error, eCards },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listECards());
  }, [dispatch]);

  const filteredECards = eCards?.filter((ecard: any) =>
    ecard?.category.includes(currentCategory)
  );

  return (
    <>
      <Hero
        low={EcardsLow}
        high={EcardsHigh}
        title='Ecards'
        link='https://www.pexels.com/photo/a-black-and-brown-dog-on-a-leash-9243153/'
        photographer='Andrzej Dworakowski'
      />

      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Donate' url2='/donate' />
          <RightArrow text='Shop To Help' url='/donate/shop-to-help' />
        </div>
        {loading && <HexagonLoader />}{' '}
        <Text
          marginBottom='48px'
          marginTop='56px'
          fontSize='32px'
          fontWeight={400}
          textAlign='center'
        >
          All gifts to Little Paws goes directly to help abandoned or
          surrendered dachshunds.
        </Text>{' '}
      </Container>
      <div
        style={{
          maxWidth: '1450px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '128px',
        }}
      >
        {error ? (
          <div className='d-flex flex-column align-items-center'>
            <Message variant='danger'>{error}</Message>
          </div>
        ) : eCards?.length === 0 ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-3'>
              <EcardSolidIcon w='48pt' />
            </div>
            <Text>
              Sorry, no ecards available at the moment. Check back soon!
            </Text>
          </div>
        ) : (
          <PageContent>
            <div className='d-flex'>
              <FilterColumn>
                <CategoryContainer className='d-flex flex-column'>
                  <Text fontWeight={600} marginBottom='10px' marginLeft='8px'>
                    Occasion
                  </Text>
                  <Accordion
                    toggle={openAccordion}
                    maxheight='50px'
                    onClick={() => {
                      setOpenAccordion(false);
                      setTimeout(() => setCurrentCategory(''), 200);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className='fas fa-times mr-1'></i>
                    {currentCategory}
                  </Accordion>

                  {eCardCategories?.map((category: string, i: number) => (
                    <Category
                      active={category === currentCategory}
                      onClick={() => {
                        setOpenAccordion(true);
                        setCurrentCategory(category);
                      }}
                      key={i}
                    >
                      {category}
                    </Category>
                  ))}
                </CategoryContainer>
              </FilterColumn>
              <div
                style={{
                  width: '100%',
                  marginBottom: '128px',
                  paddingInline: '16px',
                }}
              >
                <GridIconContainer>
                  {filteredECards?.length} item
                  {filteredECards?.length === 1 ? '' : 's'}
                </GridIconContainer>
                <div className='d-flex flex-column'>
                  {filteredECards?.length === 0 ? (
                    <Text marginTop='16px'>
                      {currentCategory} ecards unavailable
                    </Text>
                  ) : (
                    filteredECards
                      ?.map((product: any) => (
                        <Product product={product} key={product._id} isEcard />
                      ))
                      .reverse()
                  )}
                </div>
              </div>
            </div>
          </PageContent>
        )}
      </div>
    </>
  );
};

export default ECards;
