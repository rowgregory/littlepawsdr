import React from 'react';
import { Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {
  ECardContainer,
  Half,
  Personalize,
} from '../components/styles/ECardFormStyles';
import { HorizontalLine } from '../components/styles/product-details/Styles';
import { Text } from '../components/styles/Styles';
import LeftArrow from '../components/svg/LeftArrow';

const ECardDetails = () => {
  const {
    state: { product: state },
  } = useLocation() as any;
  return (
    <div
      style={{
        padding: '128px 16px',
        maxWidth: '1200px',
        marginInline: 'auto',
        width: '100%',
      }}
    >
      <LeftArrow text='Back To Ecards' url='/e-cards' />
      <ECardContainer>
        <Half>
          <Image
            src={state?.image}
            alt={state?.name}
            width='100%'
            style={{
              aspectRatio: '1/1',
              objectFit: 'cover',
              maxWidth: '600px',
              marginBottom: '24px',
            }}
          />
        </Half>
        <Half>
          <Text
            style={{ textTransform: 'uppercase' }}
            fontWeight={600}
            letterSpacing='3px'
            marginTop='14px'
            fontSize='15px'
          >
            {state?.name}
          </Text>
          <Text>{state?.category}</Text>
          <Text marginBottom='32px'>${state?.price}</Text>
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
    </div>
  );
};

export default ECardDetails;
