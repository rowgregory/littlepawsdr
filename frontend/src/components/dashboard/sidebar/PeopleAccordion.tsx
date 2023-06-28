import React from 'react';
import NewsletterEmailIcon from '../../svg/NewsletterEmailIcon';
import UsersIcon from '../../svg/UsersIcon';
import { useLocation } from 'react-router-dom';
import { Accordion } from '../../styles/place-order/Styles';
import { LinkContainer, SideBarAccordionBtn, SideBarLink } from './styles';
import PeopleIcon from '../../svg/PeopleIcon';
import { useDispatch } from 'react-redux';
import { openCloseDashboardModal } from '../../../actions/dashboardActions';

const peopleLinks = [
  {
    textKey: ' Newsletter Emails',
    linkKey: '/admin/newsletterEmailList',
    icon: <NewsletterEmailIcon />,
  },
  {
    textKey: 'Users',
    linkKey: '/admin/userList',
    icon: <UsersIcon />,
    pathMatch: 'user',
  },
  {
    textKey: 'Board Members',
    linkKey: '/admin/manuallyAddedUserList',
    icon: <UsersIcon />,
    pathMatch: 'manuallyAddedUser',
  },
];

const PeopleAccordion = ({
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
          setWhichSectionToReveal(reveal ? '--' : 'people', setReveal)
        }
      >
        <LinkContainer
          active={reveal?.toString()}
          className='d-flex align-items-center px-3 py-3 mb-2'
        >
          <div>
            <PeopleIcon />
          </div>
          <div className='ml-3'>People</div>
        </LinkContainer>
      </SideBarAccordionBtn>
      <Accordion toggle={reveal} maxheight='200px'>
        {peopleLinks.map((obj: any, i: number) => (
          <SideBarLink
            key={i}
            to={obj?.linkKey}
            onClick={() => dispatch(openCloseDashboardModal(false))}
          >
            <LinkContainer
              active={(
                obj?.linkKey === pathname ||
                obj?.pathMatch === pathname?.split('/')[2]
              )
                .toString()
                .toString()}
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

export default PeopleAccordion;
