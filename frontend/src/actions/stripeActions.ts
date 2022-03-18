import axios from "axios";
import { STRIPE_PAYMENT_FAIL, STRIPE_PAYMENT_REQUEST, STRIPE_PAYMENT_SUCCESS } from "../constants/stripeConstants";

export const createPaymentIntent = (order: any) => async (dispatch: any) => {
  try {
    dispatch({ type: STRIPE_PAYMENT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const { data } = await axios.post(
      '/create-payment-intent',
      order,
      config
    )
    
    dispatch({ type: STRIPE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STRIPE_PAYMENT_FAIL,
      payload: 'remove_order'
    });
  }
};