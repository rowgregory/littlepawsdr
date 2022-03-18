import React from 'react';
import { Col, Row, NavDropdown } from 'react-bootstrap';
import {
  DropDownLinks,
  DropdownParagraph,
  StyledDropdropParagraphLink,
} from '../../styles/HeaderStyles';

const AdoptFirstSlide = ({ obj }: any) => {
  return (
    <div style={{ width: '500px' }} className='p-5'>
      <Row>
        <Col className='d-flex flex-column'>
          <h5>Adopting is a big decision</h5>
          <DropdownParagraph className='dogParagraph'>
            You are taking into your home a dog that is intelligent, loyal, fun
            loving, full of love, and more than likely very vocal. However,
            owning a dachshund will bring you so much enjoyment, fun and
            fulfillment. They have this fantastic way of bringing joy to their
            families every day!
          </DropdownParagraph>
          <DropdownParagraph className='dogParagraph my-3'>
            We are committed to matching our dachshunds with good, responsible
            and loving new owners. We strive to make the best match we can,
            setting each dog and adopter up for success. Our number one concern
            is for our dachshunds.
          </DropdownParagraph>
          <DropdownParagraph className='dogParagraph'>
            For more information visit our{' '}
            <StyledDropdropParagraphLink
              className='dogEmphasis'
              to='/adopt/information'
            >
              Adoption Information
            </StyledDropdropParagraphLink>
            &nbsp;page. We currently adopt to the following states: Alabama,
            Connecticut, Delaware, DC, Florida, Georgia, Kentucky, Maine,
            Maryland, Massachusetts, New Hampshire, New Jersey, North Carolina,
            Ohio, Pennsylvania, Rhode Island, South Carolina, Tennessee,
            Vermont, Virginia, West Virginia.
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

export { AdoptFirstSlide };
