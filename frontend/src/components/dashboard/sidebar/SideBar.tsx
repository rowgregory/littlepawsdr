import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '../../svg/DashboardIcon';
import LogoDay from '../../assets/dashboard-logo.png';
import { Image } from 'react-bootstrap';
import { Container, LinkContainer, SideBarLink } from './styles';
import SellingAccordion from './SellingAccordion';
import ProceedsAccordion from './ProceedsAccordion';
import PeopleAccordion from './PeopleAccordion';
import MicellaneousAccordion from './MicellaneousAccordion';

export interface RevealProps {
  selling: boolean;
  proceeds: boolean;
  miscellaneous: boolean;
  people: boolean;
}

export const setWhichSectionToReveal = (section: string, setReveal: any) => {
  setReveal({
    selling: section === 'selling',
    proceeds: section === 'proceeds',
    miscellaneous: section === 'miscellaneous',
    people: section === 'people',
  });
};

const SideBar = () => {
  const { pathname } = useLocation();

  const [reveal, setReveal] = useState<RevealProps>({
    selling: false,
    proceeds: false,
    miscellaneous: false,
    people: false,
  });

  return (
    <>
      <Container className='d-flex flex-column'>
        <Link to='/' style={{ marginInline: 'auto', marginBottom: '2rem' }}>
          <Image
            src={LogoDay}
            alt='LPDR'
            style={{ width: '130px', objectFit: 'cover' }}
          />
        </Link>
        <SideBarLink
          to='/admin'
          onClick={() => setWhichSectionToReveal('--', setReveal)}
        >
          <LinkContainer
            active={('/admin' === pathname).toString()}
            className='d-flex align-items-center px-3 py-3 mb-2'
          >
            <div>
              <DashboardIcon />
            </div>
            <div className='ml-3'>Dashboard</div>
          </LinkContainer>
        </SideBarLink>
        <SellingAccordion
          reveal={reveal.selling}
          setWhichSectionToReveal={setWhichSectionToReveal}
          setReveal={setReveal}
        />
        <ProceedsAccordion
          reveal={reveal.proceeds}
          setWhichSectionToReveal={setWhichSectionToReveal}
          setReveal={setReveal}
        />
        <PeopleAccordion
          reveal={reveal.people}
          setWhichSectionToReveal={setWhichSectionToReveal}
          setReveal={setReveal}
        />
        <MicellaneousAccordion
          reveal={reveal.miscellaneous}
          setWhichSectionToReveal={setWhichSectionToReveal}
          setReveal={setReveal}
        />
      </Container>
    </>
  );
};

export default SideBar;
