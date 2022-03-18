import { STRIPE_PAYMENT_FAIL, STRIPE_PAYMENT_REQUEST, STRIPE_PAYMENT_SUCCESS } from "../constants/stripeConstants";

// @ts-ignore
export const createPaymentIntentReducer = (state = { }, action) => {
  switch (action.type) {
    case STRIPE_PAYMENT_REQUEST:
      return {
        loading: true,
      };
    case STRIPE_PAYMENT_SUCCESS:
      return {
        loading: false,
        clientSecret: action.payload,
      };
    case STRIPE_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};