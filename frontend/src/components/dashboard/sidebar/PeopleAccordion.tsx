import { useLocation } from 'react-router-dom';
import { Accordion } from '../../styles/place-order/Styles';
import { LinkContainer, SideBarAccordionBtn, SideBarLink } from './styles';
import { useDispatch } from 'react-redux';
import { openCloseDashboardModal } from '../../../actions/dashboardActions';
import { Text } from '../../styles/Styles';

const peopleLinks = [
  {
    textKey: ' Newsletter Emails',
    linkKey: '/admin/newsletterEmailList',
    icon: <i className='fa-solid fa-newspaper'></i>,
  },
  {
    textKey: 'Users',
    linkKey: '/admin/userList',
    icon: <i className='fa-solid fa-users-gear'></i>,
    pathMatch: 'user',
  },
  {
    textKey: 'Board Members',
    linkKey: '/admin/manuallyAddedUserList',
    icon: <i className='fa-solid fa-chess-rook'></i>,
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
        <LinkContainer active={reveal?.toString()}>
          <div className='ml-2'>
            <i className='fa-solid fa-people-group'></i>
          </div>
          <Text fontSize='15px' fontWeight={400}>People</Text>
        </LinkContainer>
      </SideBarAccordionBtn>
      <Accordion toggle={reveal} maxheight='200px'>
        {peopleLinks.map((obj: any, i: number) => (
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
      </Accordion>{' '}
    </>
  );
};

export default PeopleAccordion;
