import { OPEN_CLOSE_DASHBOARD_MODAL } from '../constants/dashboardConstants';

export const openCloseDashboardModal =
  (openCloseDashboardModal: boolean) => async (dispatch: any) => {
    dispatch({
      type: OPEN_CLOSE_DASHBOARD_MODAL,
      payload: openCloseDashboardModal,
    });
  };
