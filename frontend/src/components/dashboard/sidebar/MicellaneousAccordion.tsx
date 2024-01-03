import { useLocation } from 'react-router-dom';
import { Accordion } from '../../styles/place-order/Styles';
import { LinkContainer, SideBarAccordionBtn, SideBarLink } from './styles';
import { useDispatch } from 'react-redux';
import { openCloseDashboardModal } from '../../../actions/dashboardActions';
import { Text } from '../../styles/Styles';

const miscellaneousLinks = [
  {
    textKey: 'Welcome Wieners',
    linkKey: '/admin/welcome-wiener/dachshund/list',
    icon: <i className='fas fa-dog'></i>,
    pathMatch: 'welcomeWiener',
  },
  {
    textKey: 'Adoption Applicaion Fees',
    linkKey: '/admin/adoption-application-fee/list',
    icon: <i className='fa-solid fa-tag'></i>,
    pathMatch: 'adoptionApplicationFee',
  },
  {
    textKey: 'Events',
    linkKey: '/admin/eventList',
    icon: <i className='fa-regular fa-calendar-check'></i>,
    pathMatch: 'event',
  },
  {
    textKey: 'Blog',
    linkKey: '/admin/blogs',
    icon: <i className='fa-solid fa-blog'></i>,
    pathMatch: 'blogs',
  },
  {
    textKey: 'Education',
    linkKey: '/admin/education-tips',
    icon: <i className='fa-solid fa-graduation-cap'></i>,
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
        <LinkContainer active={reveal?.toString()}>
          <div className='ml-2'>
            <i className='fa-brands fa-discord'></i>
          </div>
          <Text fontSize='15px' fontWeight={400}>
            Micellaneous
          </Text>
        </LinkContainer>
      </SideBarAccordionBtn>
      <Accordion toggle={reveal} maxheight='320px'>
        {miscellaneousLinks.map((obj: any, i: number) => (
          <SideBarLink
            key={i}
            to={obj?.linkKey}
            onClick={() => dispatch(openCloseDashboardModal(false))}
            active={(
              obj?.linkKey === pathname ||
              obj?.pathMatch === pathname?.split('/')[2]
            ).toString()}
          >
            <div></div>
            <div>{obj?.icon}</div>
            <div className='text'>{obj?.textKey}</div>
          </SideBarLink>
        ))}
      </Accordion>
    </>
  );
};

export default MicellaneousAccordion;
