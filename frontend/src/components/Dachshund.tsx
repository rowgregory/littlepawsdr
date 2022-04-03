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
  background-color: ${({ theme }) => theme.secondaryBg};
  height: 100%;
  img.dog {
    max-height: 375px;
    width: 100%;
    object-fit: cover;
  }
`;

const StyledCarousel = styled(Carousel)`
  background: ${({ theme }) => theme.bg};
`;

const CardHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
`;

const CarouselItem = styled(Carousel.Item)`
  background: ${({ theme }) => theme.bg};
  width: 100%;
  img {
  }
`;

const ShowMoreLink = styled(Link)`
  background: ${({ theme }) => theme.smcontainer.bg};
  color: ${({ theme }) => theme.white};
  font-weight: bold;
  letter-spacing: 0.5px;
  transition: 300ms;
  position: absolute;
  width: 90%;
  margin: 0;
  bottom: 0;
  :hover {
    background: ${({ theme }) => theme.smcontainer.hoverBg};
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
                <Image src={senior} alt={`available-lpdr-${i}`} width='100%' />
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

        <Card.Body
          className='d-flex flex-column justify-content-start p-0'
          style={{ height: '350px' }}
        >
          <CardHeader className='p-3'>
            <Text
              color='#fff'
              fontSize='1.5rem'
              className='d-flex align-items-center justify-content-center'
              marginBottom='0.8rem'
              fontFamily={`Duru Sans`}
            >
              {dachshund?.attributes?.name}
              <Image src={Paw} alt='paw' width='20px' className='ml-2' />
            </Text>
            <Card.Text as='div' className='mb-3'>
              <Text color='#fff' fontSize='0.8rem'>
                {dachshund?.attributes?.sex} {dachshund?.attributes?.ageGroup}{' '}
              </Text>{' '}
              <Text fontSize='0.8rem' color='#fff'>
                {dachshund?.attributes?.breedString}
              </Text>
            </Card.Text>
          </CardHeader>
          <div className='p-3'>
            <Card.Text as='div'>
              <Text>Please only apply for me if:</Text>{' '}
              <ul>
                <Text>
                  {dachshund?.attributes?.isYardRequired && (
                    <li>you have a yard</li>
                  )}
                </Text>

                <Text>
                  {!dachshund?.attributes?.isKidsOk && (
                    <li>you do not have kids</li>
                  )}
                </Text>
                <Text>
                  {!dachshund?.attributes?.isDogsOk && (
                    <li>you do not have other dogs</li>
                  )}
                </Text>
                <Text>
                  {!dachshund?.attributes?.isCatsOk && (
                    <li>you do not have cats</li>
                  )}
                </Text>
                <Text>
                  {!dachshund?.attributes?.isHousetrained && (
                    <li>you're okay with me not being house trained</li>
                  )}
                </Text>
              </ul>
            </Card.Text>
            <ShowMoreLink
              to={`/available/dogs/${dachshund?.id}`}
              className='btn btn-md my-3 border-0'
            >
              SHOW MORE
            </ShowMoreLink>
          </div>
        </Card.Body>
      </DachshundCard>
    </>
  );
};

export default Dachshund;
