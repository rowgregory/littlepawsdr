import { useLocation } from 'react-router-dom';
import { Accordion } from '../../styles/place-order/Styles';
import { LinkContainer, SideBarAccordionBtn, SideBarLink } from './styles';
import SellingIcon from '../../svg/SellingIcon';
import { Text } from '../../styles/Styles';
import { openCloseDashboardModal } from '../../../actions/dashboardActions';
import { useDispatch } from 'react-redux';

const sellingLinks = [
  {
    textKey: 'Ecards',
    linkKey: '/admin/eCardList',
    icon: <i className='fas fa-envelope'></i>,
    pathMatch: 'eCard',
  },
  {
    textKey: 'Welcome Wiener Products',
    linkKey: '/admin/welcome-wiener/product/list',
    icon: <i className='fas fa-bone'></i>,
    pathMatch: 'welcomeWiener',
  },
];

const SellingAccordion = ({
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
          setWhichSectionToReveal(reveal ? '--' : 'selling', setReveal)
        }
      >
        <LinkContainer
          active={reveal.toString()}
          className='d-flex align-items-center px-3 py-3 mb-2'
        >
          <div>
            <SellingIcon />
          </div>
          <div className='ml-3'>Selling</div>
        </LinkContainer>
      </SideBarAccordionBtn>
      <Accordion toggle={reveal} maxheight='200px'>
        {sellingLinks.map((obj: any, i: number) => (
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
              className='d-flex align-items-center py-3 mb-2'
            >
              <div className='ml-3'>{obj?.icon}</div>
              <Text fontSize='14px' className='ml-2' fontWeight='400'>
                {obj?.textKey}
              </Text>
            </LinkContainer>
          </SideBarLink>
        ))}
      </Accordion>{' '}
    </>
  );
};

export default SellingAccordion;
