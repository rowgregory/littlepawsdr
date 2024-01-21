import { Modal } from 'react-bootstrap';
import { Footer } from '../styles/modal-styles';
import { useDispatch, useSelector } from 'react-redux';
import { openCloseDashboardModal } from '../../actions/dashboardActions';
import styled, { css, keyframes } from 'styled-components';
import { Link, activeLink, sidebarLinkData } from './dashboard2024/Sidebar';
import { useLocation, Link as Navlink } from 'react-router-dom';
import { Flex, Text } from '../styles/Styles';
import { useState } from 'react';

export const Content = styled.div<{ shake?: any }>`
  background: #171f2a;
  transform: translate3d(0, 0, 0);
  perspective: 1000px;
`;

export const Body = styled(Modal.Body)`
  padding: 0 !important;
  margin-block: 24px;
`;

const fadeInStaggered = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);

  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const FloatingLink = styled(Navlink) <{ content: string; i: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  i {
    opacity: 0;
    z-index: 1000;
    animation: ${({ i }) =>
    css`
        ${fadeInStaggered} 600ms ease-out ${i * 300}ms forwards
      `};
  }

  &::before {
    content: ${({ content }) => `"${content}"`}; /* Use content from prop */
    position: absolute;
    color: #fff;
    top: 27px;
    width: max-content;
    z-index: 2000;
    font-size: 10px;
    opacity: 0; /* Initially hidden */

    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }

  :hover {
    &::before {
      opacity: 1; /* Show on hover */
    }
  }
`;

export const LinkBtn = styled.div<{ active?: string }>`
  padding: 10px 20px;
  background: ${({ active }) =>
    active === 'true' ? 'linear-gradient(90deg, rgba(156,254,253,1) 0%, rgba(207,253,251,1) 100%)' : ''};
  text-decoration: none;
  display: grid;
  grid-template-columns: 0.9fr 3fr;
  align-items: center;
  cursor: pointer;
  div,
  i {
    color: ${({ active }) => (active === 'true' ? '#504f4a' : '#fff')};
  }

  :hover {
    text-decoration: none;
    background: linear-gradient(90deg, rgba(156, 254, 253, 1) 0%, rgba(207, 253, 251, 1) 100%);
    div,
    i {
      color: #504f4a;
    }
    &:after {
      content: '';
      position: absolute;
      width: 47px;
      height: 47px;
      right: 0;
      clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
      background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
    }
  }

  &:after {
    content: ${({ active }) => (active === 'true' ? "''" : 'none')};
    position: absolute;
    width: 47px;
    height: 47px;
    right: 0;
    clip-path: polygon(100% 100%, 0% 100%, 100% 0%);
    background-image: linear-gradient(129deg, rgba(193, 224, 255, 1) 35%, rgba(224, 205, 245, 1) 100%);
  }
`;

const CloseBtn = styled.button`
  background: linear-gradient(263deg, rgba(157, 253, 255, 1) 18%, rgba(233, 198, 253, 1) 100%);
  padding: 6px 30px;
  color: #504f4a;
  font-family: Rust;
  border: none;
  :focus {
    outline: none;
    box-shadow: none;
  }
`;

const ActionModal = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const openOrClose = state.dashboard.modal.openOrClose;
  const { pathname: path } = useLocation();
  const [animLink, setAnimLinks] = useState({ people: false, misc: false });

  const handleClose = () => dispatch(openCloseDashboardModal(false));

  return (
    <Modal
      className='p-0'
      show={openOrClose}
      onHide={() => dispatch(openCloseDashboardModal(false))}
      centered
    >
      <Content className='p-0'>
        <Body>
          {sidebarLinkData(activeLink(path)).map((obj: any, i: number) =>
            obj?.linkKey ? (
              <Link
                key={i}
                to={obj.linkKey}
                active={obj.active}
                onClick={() => {
                  handleClose();
                  setAnimLinks({ people: false, misc: false });
                }}
              >
                <i className={obj.icon}></i>

                <Text fontSize='18px' fontFamily='Rust' fontWeight={400}>
                  {obj.textKey}
                </Text>
              </Link>
            ) : (
              <LinkBtn
                key={i}
                active={obj.active}
                onClick={() => {
                  if (obj.bubbleLink === 'people') {
                    setAnimLinks({ people: true, misc: false });
                  } else if (obj.bubbleLink === 'misc') {
                    setAnimLinks({ people: false, misc: true });
                  }
                }}
              >
                <i className={obj.icon}></i>
                <Flex position='relative' width='100%' alignItems='center' justifyContent='space-between'>
                  <Text fontSize='18px' fontFamily='Rust' fontWeight={400}>
                    {obj.textKey}
                  </Text>
                  {obj.bubbleLink === 'people' && animLink.people && (
                    <Flex width='186px' marginRight='20px' justifyContent='space-between' flex='none'>
                      <FloatingLink
                        onClick={handleClose}
                        content='Newsletter Emails'
                        to='/admin/newsletterEmailList'
                        i={0}
                      >
                        <i className='fa-solid fa-newspaper fa-xl'></i>
                      </FloatingLink>
                      <FloatingLink onClick={handleClose} content='Users' to='/admin/userList' i={1}>
                        <i className='fa-solid fa-users-gear fa-xl '></i>
                      </FloatingLink>
                      <FloatingLink
                        onClick={handleClose}
                        content='Board Members'
                        to='/admin/manuallyAddedUserList'
                        i={2}
                      >
                        <i className='fa-solid fa-chess-rook fa-xl'></i>
                      </FloatingLink>
                    </Flex>
                  )}
                  {obj.bubbleLink === 'misc' && animLink.misc && (
                    <Flex width='186px' marginRight='20px' justifyContent='space-between' flex='none'>
                      <FloatingLink onClick={handleClose} content='Events' to='/admin/eventList' i={0}>
                        <i className='fa-regular fa-calendar-check fa-xl'></i>
                      </FloatingLink>
                      <FloatingLink onClick={handleClose} content='Blog' to='/admin/blogs' i={1}>
                        <i className='fa-solid fa-blog fa-xl '></i>
                      </FloatingLink>
                      <FloatingLink
                        onClick={handleClose}
                        content='Education Tips'
                        to='/admin/education-tips'
                        i={2}
                      >
                        <i className='fa-solid fa-graduation-cap fa-xl'></i>
                      </FloatingLink>
                    </Flex>
                  )}
                </Flex>
              </LinkBtn>
            )
          )}
        </Body>
        <Footer>
          <CloseBtn onClick={() => dispatch(openCloseDashboardModal(false))}>Close</CloseBtn>
        </Footer>
      </Content>
    </Modal>
  );
};

export default ActionModal;
