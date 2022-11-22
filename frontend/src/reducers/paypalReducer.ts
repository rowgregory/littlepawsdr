export const DEFER_PAYPAL_BUTTON_REQUEST = 'DEFER_PAYPAL_BUTTON_REQUEST';
export const DEFER_PAYPAL_BUTTON_SUCCESS = 'DEFER_PAYPAL_BUTTON_SUCCESS';
export const DEFER_PAYPAL_BUTTON_FAIL = 'DEFER_PAYPAL_BUTTON_FAIL';

// @ts-ignore
export const deferPayPayButtonReducer = (
  state = { defer: true },
  action: any
) => {
  switch (action.type) {
    case DEFER_PAYPAL_BUTTON_REQUEST:
      return {
        defer: true,
      };
    case DEFER_PAYPAL_BUTTON_SUCCESS:
      return {
        defer: false,
      };
    case DEFER_PAYPAL_BUTTON_FAIL:
      return {
        defer: true,
      };
    default:
      return state;
  }
};
