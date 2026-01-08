import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAuthSelector } from '../redux/toolkitStore';
import { hydrateUserState, hydrateVersion } from '../redux/features/userSlice';
import { setOpenChangelogModal } from '../redux/features/dashboardSlice';
import { useGetPublicAppDataQuery } from '../redux/services/publicApi';
import { updateAuctionInState, setAuctions } from '../redux/features/auctionSlice';
import { useGetUserProfileQuery } from '../redux/services/userApi';
import { setNewsletterIssues } from '../redux/features/newsletterIssueSlice';
import {
  setWelcomeWienerDogs,
  setWelcomeWienerProducts,
} from '../redux/features/welcomeWienerSlice';
import { setEcards } from '../redux/features/ecardSlice';
import { setProducts } from '../redux/features/productSlice';

const UserInit = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthSelector();
  const { data: userData, isLoading } = useGetUserProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: appData } = useGetPublicAppDataQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (appData) {
      dispatch(setAuctions(appData?.auctions));
      if (appData?.liveAuction) {
        dispatch(updateAuctionInState(appData?.liveAuction));
      } else if (appData?.upcomingAuction) {
        dispatch(updateAuctionInState(appData?.upcomingAuction));
      }
      dispatch(setNewsletterIssues(appData?.newsletterIssues));
      dispatch(setWelcomeWienerDogs(appData?.welcomeWieners));
      dispatch(setWelcomeWienerProducts(appData?.welcomeWienerProducts));
      dispatch(setEcards(appData?.ecards));
      dispatch(setProducts(appData?.products));
    }
  }, [appData, dispatch]);

  useEffect(() => {
    if (userData && !isLoading) {
      dispatch(hydrateUserState(userData));
      dispatch(hydrateVersion(userData?.currentVersion));

      if (
        userData.user.lastSeenChangelogVersion === '0.0.0' ||
        userData.user.lastSeenChangelogVersion < userData.currentVersion
      ) {
        dispatch(setOpenChangelogModal());
      }
    }
  }, [userData, dispatch, isLoading]);

  return <>{children}</>;
};

export default UserInit;
