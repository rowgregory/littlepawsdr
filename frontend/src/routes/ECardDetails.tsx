import React from 'react';
import { Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
  ECardContainer,
  EcardDetailsContainer,
  Half,
  Personalize,
} from '../components/styles/ECardFormStyles';
import { HorizontalLine } from '../components/styles/product-details/Styles';
import { Text } from '../components/styles/Styles';

const ECardDetails = () => {
  const { state } = useLocation<{
    image: string;
    name: string;
    price: string;
    category: string;
  }>();
  return (
    <EcardDetailsContainer>
      <Link to='/e-cards'>Back to browsing</Link>
      <ECardContainer>
        <Half>
          <Image src={state?.image} alt={state?.name} width='100%' />
        </Half>
        <Half>
          <Text
            style={{ textTransform: 'uppercase' }}
            fontWeight={400}
            letterSpacing='3px'
            marginTop='0.75rem'
          >
            {state?.name}
          </Text>
          <Text>{state?.category}</Text>
          <Text marginBottom='2rem'>${state?.price}</Text>
          <HorizontalLine />
          <Personalize
            to={{
              pathname: '/e-card/place-order',
              state: {
                ecard: state,
                comingFrom: 'ecard',
              },
            }}
          >
            PERSONALIZE AND SEND
          </Personalize>
        </Half>
      </ECardContainer>
    </EcardDetailsContainer>
  );
};

export default ECardDetails;
