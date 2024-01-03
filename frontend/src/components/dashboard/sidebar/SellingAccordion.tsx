import { useLocation } from 'react-router-dom';
import { Accordion } from '../../styles/place-order/Styles';
import { LinkContainer, SideBarAccordionBtn, SideBarLink } from './styles';
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
  {
    textKey: 'Products',
    linkKey: '/admin/product/list',
    icon: <i className='fas fa-box'></i>,
    pathMatch: 'productList',
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
        <LinkContainer active={reveal?.toString()}>
          <div className='ml-2'>
            <i className='fa-solid fa-wand-magic'></i>
          </div>
          <Text fontSize='15px' fontWeight={400}>
            Selling
          </Text>
        </LinkContainer>
      </SideBarAccordionBtn>
      <Accordion toggle={reveal} maxheight='200px'>
        {sellingLinks.map((obj: any, i: number) => (
          <SideBarLink
            key={i}
            to={obj?.linkKey}
            onClick={() => dispatch(openCloseDashboardModal(false))}
            active={(
              obj?.linkKey === pathname ||
              obj?.pathMatch === pathname.split('/')[2]
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

export default SellingAccordion;
