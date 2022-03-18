import React, { FC, forwardRef } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { PlusMinusBtn } from '../styles/product-details/Styles';

interface ISelectProps {
  link: string;
  links: any;
  title: string;
  currentTitle: string;
  i: number;
  setId: (id: number) => void;
  setTitle: (currentTitle: string) => void;
  setCollapse: (collapse: boolean) => void;
  collapse: boolean;
  id: number;
  history: any;
  setOpenMenu: (openMenu: boolean) => void;
}

const Container = styled.div``;

const SideNavLink = styled(Link)`
  text-decoration: none;
  color: #cfcfcf;
  font-size: 1.15rem;
  text-transform: uppercase;
  text-indent: 1rem;
  :hover {
    color: ${({ theme }) => theme.white};
    text-decoration: none;
  }
`;

const LinkContainer = styled.div`
  :hover {
    div {
      color: ${({ theme }) => theme.white};
    }
  }
`;

export const LinkTitle = styled.div<{ active?: boolean }>`
  padding: 1.5rem 0.75rem;
  color: ${({ active }) => (active ? '#fff' : '#cfcfcf')};
  font-size: 1.15rem;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    color: #fff;
  }
`;

const NavLinksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MenuItem: FC<any> = forwardRef<HTMLDivElement, ISelectProps>(
  (
    {
      link,
      links,
      title,
      currentTitle,
      i,
      setId,
      setTitle,
      setCollapse,
      collapse,
      id,
      history,
      setOpenMenu,
    },
    ref
  ) => {
    return (
      <Container ref={ref}>
        {links ? (
          <div key={i} className='w-100 mx-auto'>
            <Accordion.Toggle
              className='d-flex border-0 bg-transparent w-100 p-0'
              eventKey={`${i}`}
              onClick={() => {
                setId(i);
                setTitle(title === currentTitle ? '' : title);
                setCollapse(title !== currentTitle ? true : !collapse);
              }}
            >
              <LinkContainer className='link-container d-flex w-100 justify-content-between align-items-center'>
                <LinkTitle active={title === currentTitle}>{title}</LinkTitle>
                <PlusMinusBtn
                  active={id === i && collapse}
                  className='plus-minus'
                >
                  <i
                    className={`fas fa-${
                      collapse && id === i ? 'minus' : 'plus'
                    }`}
                  ></i>
                </PlusMinusBtn>
              </LinkContainer>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${i}`}>
              <NavLinksContainer>
                {links.map((obj: any, i: number) => (
                  <SideNavLink
                    onClick={() => {
                      setCollapse(false);
                      setOpenMenu(false);
                    }}
                    key={i}
                    to={{ pathname: obj.linkKey, state: obj.textKey }}
                    className='px-4 py-3'
                  >
                    {obj.textKey}
                  </SideNavLink>
                ))}
              </NavLinksContainer>
            </Accordion.Collapse>
          </div>
        ) : (
          <LinkTitle
            key={i}
            onClick={() => {
              history.push(link);
              setOpenMenu(false);
              setCollapse(false);
            }}
          >
            {title}
          </LinkTitle>
        )}
      </Container>
    );
  }
);

export default MenuItem;
