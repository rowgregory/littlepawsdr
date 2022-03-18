import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ECARD_ORDER_CREATE_RESET } from '../../constants/eCardOrderContants';
import { DonationMenu } from './DonationMenu';
import DonateLine from '../svg/DonateLine';

const Donation = styled(Card)`
  background: ${({ theme }) => theme.header.bg};
  border-radius: 0;
`;

const DonationOption = styled(Accordion.Toggle)<{ active: string }>`
  height: 7.5rem;
  width: 7.5rem;
  background: ${({ theme }) => theme.header.donationCard.bg};
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.header.donationCard.border};
  font-size: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &.center {
    margin: 0 1rem;
  }
`;

const DonationBtn = styled(Accordion.Toggle)`
  color: ${({ theme }) => theme.adminNav.bg};
  border: none;
  background: transparent;
  margin-top: -10px;
  font-size: 1.25rem;
  :hover {
    color: ${({ theme }) => theme.header.link.hoverText};
  }
`;

const DonationIcon = styled.i`
  margin-top: 0.75rem;
  cursor: pointer;
  :before {
    background-image: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &:hover::before {
    background-image: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const InnerElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(30px);
`;
const OuterElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(60px);
`;

const StyledAccordion = styled(Accordion)`
  display: none !important;
  @media only screen and (min-width: 1125px) {
    background-color: ${({ theme }) => theme.header.bg};
    display: block !important;
  }
`;

const DonateHeader = () => {
  const [donationType, setDonationType] = useState('') as any;
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState() as any;
  const dispatch = useDispatch();

  return (
    <>
      <StyledAccordion
        defaultActiveKey='0'
        className='d-flex justify-content-center'
      >
        <Donation className='w-100 mx-auto'>
          <Card.Header style={{ display: 'contents' }}>
            <Accordion.Collapse eventKey='1'>
              <div className='d-flex justify-content-center flex-column align-items-center  w-50 mx-auto'>
                <Card.Body>
                  <div className='d-flex justify-content-center'>
                    <DonationOption
                      className={
                        donationType === 'ONE_TIME'
                          ? 'one-time-still'
                          : 'one-time'
                      }
                      onClick={() => {
                        if (donationType === 'ONE_TIME') {
                          setDonationType('');
                        } else {
                          dispatch({ type: ECARD_ORDER_CREATE_RESET });
                          setDonationType('ONE_TIME');
                          setActiveMenu('main');
                          setMenuHeight('auto');
                        }
                      }}
                    >
                      <OuterElement>ONE TIME</OuterElement>
                      <InnerElement>
                        <DonationIcon className='fas fa-hand-holding-heart fa-3x'></DonationIcon>
                      </InnerElement>
                    </DonationOption>
                    <DonationOption
                      className={
                        donationType === 'MONTHLY'
                          ? 'monthly-still center'
                          : 'monthly center'
                      }
                      onClick={() => {
                        if (donationType === 'MONTHLY') {
                          setDonationType('');
                        } else {
                          dispatch({ type: ECARD_ORDER_CREATE_RESET });
                          setDonationType('MONTHLY');
                          setActiveMenu('main');
                          setMenuHeight('auto');
                        }
                      }}
                    >
                      <OuterElement>MONTHLY</OuterElement>
                      <InnerElement>
                        <DonationIcon className='fas fa-donate fa-3x'></DonationIcon>
                      </InnerElement>
                    </DonationOption>
                    <DonationOption
                      className={
                        donationType === 'E_CARD' ? 'e-card-still' : 'e-card'
                      }
                      onClick={() => {
                        if (donationType === 'E_CARD') {
                          setDonationType('');

                          dispatch({ type: ECARD_ORDER_CREATE_RESET });
                        } else {
                          setDonationType('E_CARD');
                          setActiveMenu('main');
                          setMenuHeight('auto');
                        }
                      }}
                    >
                      <OuterElement>E-CARD</OuterElement>
                      <InnerElement>
                        <DonationIcon className='fas fa-mail-bulk fa-3x'></DonationIcon>
                      </InnerElement>
                    </DonationOption>
                  </div>
                </Card.Body>
                <DonationMenu
                  donationType={donationType}
                  setActiveMenu={setActiveMenu}
                  activeMenu={activeMenu}
                  menuHeight={menuHeight}
                  setMenuHeight={setMenuHeight}
                />
              </div>
            </Accordion.Collapse>
          </Card.Header>
          <div className='d-flex align-items-center flex-column'>
            <DonateLine />
            <DonationBtn className='d-flex align-self-center' eventKey='1'>
              DONATE
            </DonationBtn>
          </div>
        </Donation>
      </StyledAccordion>
    </>
  );
};

export default DonateHeader;
