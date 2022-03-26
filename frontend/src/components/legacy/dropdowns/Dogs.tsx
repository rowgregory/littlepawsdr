import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import // DropDownLinks,
// HealthCheckListCard,
// DropdownParagraph,
'../../styles/NavbarStyles';
// import Paw from '../../assets/transparent-paw.png';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Loader from '../../Loader';
import Message from '../../Message';

const StyledIcon = styled.i`
  cursor: pointer;
  color: ${({ theme }) => theme.header.link.dropDown.text};
  :hover {
    &.fa-info-circle {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const DogsFirstSlide = ({ setActiveMenu, obj }: any) => {
  const dachshundList = useSelector((state: any) => state.dachshunds);
  const { loading, error, dachshunds } = dachshundList;
  return (
    <div className='d-flex p-5'>
      <div style={{ width: '500px' }}>
        <Row>
          <Col className='d-flex justify-content-between'>
            <h5>
              Dachshund&nbsp;&nbsp;(<strong>daak</strong>·snd)
            </h5>
            <StyledIcon
              style={{
                cursor: 'pointer',
              }}
              onClick={() => setActiveMenu('dropdown-slide-2')}
              className='fas fa-info-circle fa-2x'
            ></StyledIcon>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* <DropdownParagraph className='dogParagraph'>
              We are excited that you are interested in adding a dachshund or
              dachshund-mix to your family! Here you can find a list of all dogs
              that are available for adoption. Some of our dogs are not posted
              to the website – so even if you don’t find the dog you are looking
              for –{' '}
              <span className='dogEmphasis'>
                please feel free to submit an application and we can look for
                that perfect dog for you!
              </span>
            </DropdownParagraph> */}
          </Col>
        </Row>
        <Row>
          {/* <Col className='my-3'>
            {obj?.links?.map((obj: any, i: number) => (
              <DropDownLinks key={i} to={obj?.linkKey}>
                <NavDropdown.Item className='main-links'>
                  {obj?.textKey}
                </NavDropdown.Item>
              </DropDownLinks>
            ))}
          </Col> */}
        </Row>
      </div>
      <div className='w-100 justify-content-center d-flex align-items-center'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: '20px',
            }}
          >
            {dachshunds?.data
              ?.map((dachshund: any, i: number) => (
                <div key={i}>
                  <div
                    style={{
                      height: '300px',
                      width: '200px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <img
                        src={dachshund?.attributes?.photos[0]}
                        alt={`${dachshund?.attributes?.name}-${i}`}
                        width='100%'
                        height='300px'
                        style={{ objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          textAlign: 'center',
                          color: '#000',
                          fontSize: '1rem',
                          paddingTop: '0.25rem',
                        }}
                      >
                        {dachshund?.attributes?.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))
              .filter((_obj: any, i: number) => i < 3)}
          </div>
        )}
      </div>
    </div>
  );
};

const DogsSecondSlide = ({ setActiveMenu }: any) => {
  return (
    <div style={{ width: '100%', maxWidth: '700px' }} className='mb-4 p-5'>
      <Row>
        <Col className='w-100 d-flex justify-content-between mt-4 mx-4 mb-1'>
          <h5 className='w-75'>
            When you adopt from LPDR, you are getting a dachshund who:
          </h5>
          <Button
            className='bg-transparent border-0 text-dark'
            onClick={() => setActiveMenu('dropdown-slide-1')}
          >
            Back
          </Button>
        </Col>
      </Row>
      {/* <HealthCheckListCard>
        <Col className='mx-4 mb-4'>
          {[
            `Has been spayed or neutered`,
            `Had a full veterinary health check and vaccinations`,
            `Has been Heartworm tested and treated if necessary`,
            `Has been microchipped`,
          ].map((text, i) => (
            <div key={i} className='d-flex align-items-center mb-1'>
              <Card.Img
                src={Paw}
                style={{
                  width: '20px',
                  height: '20px',
                }}
                className='mr-2'
              />
              <div className='card-text'>{text}</div>
            </div>
          ))}
        </Col>
      </HealthCheckListCard> */}
    </div>
  );
};

export { DogsFirstSlide, DogsSecondSlide };
