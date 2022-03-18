import React from 'react';
import { Col, Row, NavDropdown } from 'react-bootstrap';
import { DropDownLinks, DropdownParagraph } from '../../styles/HeaderStyles';

const VolunteerFirstSlide = ({ obj }: any) => {
  return (
    <div style={{ width: '500px' }} className='p-5'>
      <Row>
        <Col className='d-flex flex-column'>
          <h5>Get Involed</h5>
          <DropdownParagraph className='dogParagraph mb-4'>
            Would you like to donate to Little Paws? Press the donate button at
            the top of the page! Or would you rather give to Little Paws as you
            do your daily online shopping? Visit our Shop to Help page to learn
            more.
          </DropdownParagraph>
          <h5>Join the Little Paws Family!</h5>
          <DropdownParagraph className='dogParagraph'>
            Are you crafty? We need your help! We are also looking for artists
            and crafters both for our upcoming auctions and events along with
            our ETSY store.
          </DropdownParagraph>
        </Col>
      </Row>
      <Row>
        <Col className='my-3'>
          {obj?.links?.map((obj: any, i: number) => (
            <DropDownLinks key={i} to={obj?.linkKey}>
              <NavDropdown.Item className='main-links'>
                {obj?.textKey}
              </NavDropdown.Item>
            </DropDownLinks>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export { VolunteerFirstSlide };
