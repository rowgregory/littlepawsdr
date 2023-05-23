import React from 'react';
import { useLocation } from 'react-router-dom';
// import OrdersIcon from '../../svg/OrdersIcon';
import { LinkContainer, SideBarAccordionBtn, SideBarLink } from './styles';
import { Accordion } from '../../styles/place-order/Styles';
import ProceedsIcon from '../../svg/ProceedsIcon';
import { useDispatch } from 'react-redux';
import { openCloseDashboardModal } from '../../../actions/dashboardActions';

const proceedsLinks = [
  // {
  //   textKey: 'Product Orders',
  //   linkKey: '/admin/orderList',
  //   icon: <OrdersIcon />,
  //   pathMatch: 'productOrder',
  // },
  {
    textKey: 'Ecard Orders',
    linkKey: '/admin/ecardOrderList',
    icon: <i className='fas fa-envelope'></i>,
    pathMatch: 'eCardOrder',
  },
  {
    textKey: 'Welcome Wiener Orders',
    linkKey: '/admin/welcome-wiener/order/list',
    icon: <i className='fas fa-dog'></i>,
    pathMatch: 'welcome-wiener',
  },
];

const ProceedsAccordion = ({
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
          setWhichSectionToReveal(reveal ? '--' : 'proceeds', setReveal)
        }
      >
        <LinkContainer
          active={reveal.toString()}
          className='d-flex align-items-center px-3 py-3 mb-2'
        >
          <div>
            <ProceedsIcon />
          </div>
          <div className='ml-3'>Proceeds</div>
        </LinkContainer>
      </SideBarAccordionBtn>
      <Accordion toggle={reveal} maxheight='200px'>
        {proceedsLinks.map((obj: any, i: number) => (
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

export default ProceedsAccordion;
