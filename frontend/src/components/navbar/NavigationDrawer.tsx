import { Fragment, useCallback, useRef } from 'react';
import { CloseSideBarBtn, Container } from '../styles/left-navigation/styles';
import LinkContent from '../left-navigation/LinkContent';
import useOutsideDetect from '../../utils/useOutsideDetect';
import { RootState, useAppDispatch } from '../../redux/toolkitStore';
import { toggleLeftDrawer } from '../../redux/features/navbar/navbarSlice';
import { useSelector } from 'react-redux';
import { useGetCustomCampaignLinkQuery } from '../../redux/services/campaignApi';
import useScrollToTop from '../../utils/hooks/useScrollToTop';

const NavigationDrawer = () => {
  const dispatch = useAppDispatch();
  const overlayRef = useRef(null) as any;
  const navbar = useSelector((state: RootState) => state.navbar);
  const campaign = useSelector((state: any) => state.campaign);
  const open = navbar.toggle.leftDrawer;

  const { data: customCampaignLink } = useGetCustomCampaignLinkQuery();

  const handleClose = useCallback(() => {
    if (navbar.toggle.leftDrawer) {
      dispatch(toggleLeftDrawer({ leftDrawer: false }));
    }
  }, [dispatch, navbar.toggle.leftDrawer]);

  useOutsideDetect(overlayRef, handleClose);

  useScrollToTop();

  const campaignLinkKey = campaign?.status === 'LIVE' && customCampaignLink
    ? `/campaigns/${customCampaignLink}/auction`
    : '/campaigns';

  return (
    <Fragment>
      <div
        className={`${
          open ? 'block' : 'hidden'
        } fixed top-0 left-0 h-screen w-screen  bg-black/80 z-[3000] animate-fadeIn`}
      ></div>
      <Container ref={overlayRef} open={open}>
        <CloseSideBarBtn
          className='fas fa-chevron-left fa-sm'
          onClick={handleClose}
        ></CloseSideBarBtn>
        <LinkContent closeMenu={handleClose} error={''} campaignLinkKey={campaignLinkKey} />
      </Container>
    </Fragment>
  );
};

export default NavigationDrawer;
