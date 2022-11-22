import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listECards } from '../actions/eCardActions';
import { Text } from '../components/styles/Styles';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';
import Message from '../components/Message';
import {
  BrowseECards,
  Container,
  ECardImage,
  ECardsContainer,
  Occasions,
  ImageContainer,
  ECardPrice,
} from '../components/styles/ECardFormStyles';
import { eCardCategories } from '../utils/eCardCategories';
import { Accordion } from '../components/styles/place-order/Styles';

const ECards = () => {
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState('');
  const [openAccordion, setOpenAccordion] = useState(false);

  const {
    eCardList: { loading, eCards, error },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(listECards());
  }, [dispatch]);

  const filteredECards = eCards?.filter((ecard: any) =>
    ecard?.category.includes(currentCategory)
  );

  return (
    <Container>
      {loading && <HexagonLoader />}
      <Occasions>
        <Text fontSize='14px' fontWeight={400} marginBottom='1rem'>
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

        <div className='d-flex flex-column'>
          {eCardCategories?.map((category: string, i: number) => (
            <Text
              onClick={() => {
                setOpenAccordion(true);
                setCurrentCategory(category);
              }}
              key={i}
              fontSize='14px'
              className='py-1'
              cursor='pointer'
              color={category === currentCategory ? '#22c2b7' : ''}
            >
              {category}
            </Text>
          ))}
        </div>
      </Occasions>
      <ECardsContainer>
        <Text fontWeight={400} letterSpacing='3px' p='30px 0 7px 0'>
          BROWSE ALL ECARDS
        </Text>
        <Text>Ecards offer an effortless way to stay in touch!</Text>
        {error && <Message variant='danger'>{error}</Message>}
        <BrowseECards>
          {filteredECards?.map((ecard: any) => (
            <ImageContainer
              to={{ pathname: `/e-card-details`, state: ecard }}
              key={ecard?._id}
            >
              <ECardImage src={ecard?.image} alt={ecard?.name} />
              <ECardPrice>${ecard?.price}</ECardPrice>
            </ImageContainer>
          ))}
        </BrowseECards>
      </ECardsContainer>
    </Container>
  );
};

export default ECards;
