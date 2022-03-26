import React, { useState } from 'react';
import { Accordion, Col, Row, Image } from 'react-bootstrap';
import styled from 'styled-components';
import Paw from '../../assets/transparent-paw.png';
// import { DropdownParagraph } from '../../styles/HeaderStyles';
import { Text } from '../../styles/Styles';
import MapChart from '../../../components/assets/amCharts.jpg';

const StyledIcon = styled.i`
  color: ${({ theme }) => theme.header.link.dropDown.text};
  cursor: pointer;
  :hover {
    &.fa-route {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const StyledAccordionToggle = styled(Accordion.Toggle)`
  color: ${({ theme }) => theme.header.link.dropDown.text};
  :hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SlideContainer = styled.div`
  width: 31.25rem;
`;

interface AboutFirstSlideProps {
  setActiveMenu: Function;
  setMenuHeight: Function;
  obj: {
    title?: string;
    links?: {}[];
    link?: string;
    slide?: string;
  };
}

const AboutFirstSlide = ({
  setActiveMenu,
  setMenuHeight,
  obj,
}: AboutFirstSlideProps) => {
  const [read, setRead] = useState(false);
  return (
    <SlideContainer className='p-5'>
      <Row>
        <Col className='d-flex justify-content-between w-100'>
          <h5>What we believe</h5>
          <StyledIcon
            onClick={() => setActiveMenu('dropdown-slide-2')}
            className='fas fa-route fa-2x'
          ></StyledIcon>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <DropdownParagraph className='dogParagraph mb-4'>
            We believe that dogs truly are man’s (and woman’s) best friend and
            that our beloved companions deserve the right to a soft bed,
            generous treats and unconditional love.
          </DropdownParagraph>
          <DropdownParagraph className='dogParagraph  mb-4'>
            We believe in rescue. We believe in the power of cooperation and
            teamwork to make this happen. We believe in volunteers who can work
            together to help make a difference in the life of three puppy mill
            dogs who have spent their lives in cramped cages and now have a
            chance at a bright future thanks to the teamwork of Little Paws
            Dachshund Rescue and Carolina Loving Hound Rescue.
          </DropdownParagraph> */}
          <Accordion
            defaultActiveKey='0'
            className='d-flex justify-content-center'
          >
            <div className='w-100 mx-auto'>
              <Accordion.Collapse eventKey='1'>
                <div className='d-flex justify-content-center flex-column align-items-center'>
                  {/* <DropdownParagraph className='dogParagraph  mb-4'>
                    We believe that two sweet puppies left behind at a
                    veterinarian’s office deserve a life full of toys and fun
                    and snuggles. We believe Little Paws Dachshund Rescue can
                    help change the lives of these dogs, and many, many more in
                    the future.
                  </DropdownParagraph>
                  <DropdownParagraph className='dogParagraph  mb-4'>
                    Do you believe? Are you ready to help us achieve our
                    mission? In the coming weeks we will be putting out calls
                    for volunteers for many roles within our rescue. So many of
                    you have reached out and asked how you can help! We are
                    touched by everyone’s generosity.
                  </DropdownParagraph>
                  <DropdownParagraph className='dogParagraph'>
                    Right now, we are in need of monetary donations. Happy
                    endings for our dachshunds in need can only happen with your
                    support. Please allow us to continue to say “YES WE CAN” to
                    those calls asking for assistance with a dachshund left
                    behind at an animal shelter, or a dog who has been neglected
                    and abused and deserves a warm bed and a kind hand to rub
                    his or her tummy.
                  </DropdownParagraph> */}
                </div>
              </Accordion.Collapse>
              <div className='d-flex align-items-center flex-column'>
                <StyledAccordionToggle
                  className='d-flex align-self-center border-0 bg-transparent'
                  eventKey='1'
                  onClick={() => {
                    setRead(!read);
                    setMenuHeight('');
                  }}
                >
                  {read ? 'read less...' : 'read more...'}
                </StyledAccordionToggle>
              </div>
            </div>
          </Accordion>
        </Col>
      </Row>
      {/* <Row>
        <Col className='mb-4'>
          {obj?.links?.map((obj: any, i: number) => (
            <DropDownLinks key={i} to={obj?.linkKey}>
              <NavDropdown.Item className='main-links'>
                {obj?.textKey}
              </NavDropdown.Item>
            </DropDownLinks>
          ))}
        </Col>
      </Row> */}
    </SlideContainer>
  );
};
const AboutSecondSlide = ({ setActiveMenu }: { setActiveMenu: Function }) => {
  return (
    <SlideContainer className='p-5 d-flex w-100'>
      <Col md={3} className='d-flex flex-column '>
        <div
          className='d-flex align-items-center justify-content-between w-100 mb-3 pb-2'
          style={{ borderBottom: '0.5px #ededed solid' }}
        >
          <h5 className=''>Where we Rescue</h5>
          <i
            onClick={() => setActiveMenu('dropdown-slide-1')}
            className='fas fa-arrow-left fa-2x'
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
        {[
          'Alabama',
          'Connecticut',
          'Delaware',
          'Florida',
          'Georgia',
          'Kentucky',
          'Maine',
          'Maryland',
          'Massachusetts',
          'New Hampshire',
          'New Jersey',
          'New York',
          'North Carolina',
          'Ohio',
          'Pennsylvania',
          'Rhode Island',
          'South Carolina',
          'Tennessee',
          'Vermont',
          'Virginia',
          'West Virginia',
        ].map((state, i) => (
          <div key={i} className='d-flex flex-column'>
            <div className='mb-2 d-flex'>
              <Image className='mr-1' src={Paw} width='20px' height='20px' />
              <Text fontFamily={`'Duru Sans', sans-serif`} fontSize='0.75rem'>
                {state}
              </Text>
            </div>
          </div>
        ))}
      </Col>
      <Col md={9} className='d-flex justify-content-center align-items-center'>
        <div>
          <Image
            src={MapChart}
            alt='Hope this works'
            width='100%'
            height='100%'
            style={{
              maxWidth: '999px',
              maxHeight: '700px',
              objectFit: 'cover',
            }}
          />
        </div>
      </Col>
    </SlideContainer>
  );
};

export { AboutFirstSlide, AboutSecondSlide };
