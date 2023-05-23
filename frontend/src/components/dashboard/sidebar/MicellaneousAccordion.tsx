import React from 'react';
import { useLocation } from 'react-router-dom';
import EventsIcon from '../../svg/EventsIcon';
import NewsArticleIcon from '../../svg/NewsArticleIcon';
import EducationTipIcon from '../../svg/EducationTipIcon';
import { Accordion } from '../../styles/place-order/Styles';
import { LinkContainer, SideBarAccordionBtn, SideBarLink } from './styles';
import MicellaneousIcon from '../../svg/MicellaneousIcon';
import { useDispatch } from 'react-redux';
import { openCloseDashboardModal } from '../../../actions/dashboardActions';

const miscellaneousLinks = [
  {
    textKey: 'Welcome Wieners',
    linkKey: '/admin/welcome-wiener/dachshund/list',
    icon: <i className='fas fa-dog'></i>,
    pathMatch: 'welcomeWiener',
  },
  {
    textKey: 'Events',
    linkKey: '/admin/eventList',
    icon: <EventsIcon />,
    pathMatch: 'event',
  },
  {
    textKey: 'Blog',
    linkKey: '/admin/blogs',
    icon: <NewsArticleIcon />,
    pathMatch: 'blogs',
  },
  {
    textKey: 'Education',
    linkKey: '/admin/education-tips',
    icon: <EducationTipIcon />,
    pathMatch: 'educationTips',
  },
];

const MicellaneousAccordion = ({
  reveal,
  setWhichSectionToReveal,
  setReveal,
}: any) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  return (
    <>
      <SideBarAccordionBtn
        onClick={() =>
          setWhichSectionToReveal(reveal ? '--' : 'miscellaneous', setReveal)
        }
      >
        <LinkContainer
          active={reveal.toString()}
          className='d-flex align-items-center px-3 py-3 mb-2'
        >
          <div>
            <MicellaneousIcon />
          </div>
          <div className='ml-3'>Micellaneous</div>
        </LinkContainer>
      </SideBarAccordionBtn>
      <Accordion toggle={reveal} maxheight='300px'>
        {miscellaneousLinks.map((obj: any, i: number) => (
          <SideBarLink
            key={i}
            to={obj?.linkKey}
            onClick={() => dispatch(openCloseDashboardModal(false))}
          >
            <LinkContainer
              active={(
                obj?.linkKey === pathname ||
                obj.pathMatch === pathname.split('/')[2]
              ).toString()}
              className='d-flex align-items-center px-3 py-3 mb-2'
            >
              <div className='ml-3'>{obj?.icon}</div>
              <div className='ml-3'>{obj?.textKey}</div>
            </LinkContainer>
          </SideBarLink>
        ))}
      </Accordion>{' '}
    </>
  );
};

export default MicellaneousAccordion;
