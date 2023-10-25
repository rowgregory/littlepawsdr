import { Accordion, Button } from 'react-bootstrap';
import { useState } from 'react';
import {
  DropDownLinkContainer,
  LinkContainer,
  StyledLink,
  StyledTitle,
} from '../styles/left-navigation/styles';
import { sideLinkData } from '../../utils/leftNavigation';

const AccordionLinks = ({ closeMenu, pathname }: any) => {
  const [index, setIndex] = useState(0);

  return (
    <Accordion defaultActiveKey='0'>
      {sideLinkData?.map((obj: any, i: number) => (
        <div key={i} className='w-100'>
          <Accordion.Toggle
            as={Button}
            variant='none'
            eventKey={`${i}`}
            onClick={() => setIndex(i === index ? -1 : i)}
            className='w-100 p-0'
          >
            <StyledTitle highlight={i === index}>
              <i className={obj.icon}></i>
              {obj.title}
              <i
                className='fas fa-chevron-right'
                style={{
                  transform: `rotate(${i === index ? '90deg' : '0deg'})`,
                  transition: '300ms',
                }}
              ></i>
            </StyledTitle>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={`${i}`}>
            <DropDownLinkContainer className='d-flex flex-column'>
              {obj?.links.map((link: any, l: number) => (
                <LinkContainer key={l}>
                  <StyledLink
                    to={link.linkKey}
                    onClick={() => closeMenu()}
                    highlight={(pathname === link.linkKey).toString()}
                  >
                    {link.linkText}
                  </StyledLink>
                </LinkContainer>
              ))}
            </DropDownLinkContainer>
          </Accordion.Collapse>
        </div>
      ))}
    </Accordion>
  );
};

export default AccordionLinks;
