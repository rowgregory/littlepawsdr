import React, { useState } from 'react';
import { Card, Carousel, Image, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Paw from '../components/assets/transparent-paw.png';
import { Content, Header } from './ContinueSessionModal';
import { PageHeader, Text } from './styles/Styles';

const DachshundCard = styled(Card)`
  width: 100%;
  border: none;
  transition: box-shadow 500ms ease;
  padding: 0;
  background-color: #fff;
  height: 100%;
  img.dog {
    aspect-ratio: 1/1;
    width: 100%;
    object-fit: cover;
  }
`;

const StyledCarousel = styled(Carousel)`
  background: ${({ theme }) => theme.bg};
`;

const CardHeader = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.separator};
`;

const CarouselItem = styled(Carousel.Item)`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  img {
  }
`;

const ShowMoreLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: 0.5px;
  margin: 0 auto;
  width: fit-content;
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
  :hover {
    text-decoration: none;
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.white};
  }
`;

const Dachshund = ({ dachshund }: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} centered>
        <Content>
          <Header className='pb-3'>
            <PageHeader className='d-flex align-items-center justify-content-center'>
              {dachshund?.attributes?.name}
              <Image src={Paw} alt='paw' width='20px' className='ml-2' />
            </PageHeader>
            <i onClick={handleClose} className='fas fa-times fa-2x'></i>
          </Header>
          <StyledCarousel pause='hover' className='p-3'>
            {dachshund?.attributes?.photos?.map((senior: string, i: number) => (
              <CarouselItem key={i}>
                <Image
                  loading='lazy'
                  src={senior}
                  alt={`available-lpdr-${i}`}
                  width='100%'
                />
              </CarouselItem>
            ))}
          </StyledCarousel>
        </Content>
      </Modal>
      <DachshundCard>
        <Image
          onClick={() => {
            handleShow();
          }}
          className='dog'
          src={dachshund?.attributes?.photos[0]}
          alt='lpdr'
          fluid
        />

        <Card.Body className='d-flex flex-column justify-content-start p-0'>
          <CardHeader>
            <Text fontSize='1.25rem' letterSpacing='-1px' fontWeight='300'>
              {dachshund?.attributes?.name}
            </Text>
            <Card.Text as='div'>
              <Text fontSize='0.8rem' fontWeight='200'>
                {dachshund?.attributes?.sex} {dachshund?.attributes?.ageGroup}{' '}
                {dachshund?.attributes?.breedString}
              </Text>
            </Card.Text>
          </CardHeader>
          <div className='p-3'>
            <ShowMoreLink to={`/available/dogs/${dachshund?.id}`}>
              ADOPT
            </ShowMoreLink>
          </div>
        </Card.Body>
      </DachshundCard>
    </>
  );
};

export default Dachshund;
