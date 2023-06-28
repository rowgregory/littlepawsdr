import {
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  OPEN_CART_DRAWER,
  PRODUCT_ADD_CART_ITEM_FAIL,
  CART_DELETE_ITEM_SUCCESS,
  PRODUCT_DELETE_FROM_CART_FAIL,
  PRODUCT_REMOVE_FROM_CART_FAIL,
} from '../constants/cartConstants';

export const addProductToCart = (payload: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload,
    });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_ADD_CART_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProductFromCart =
  (cartItem: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: CART_DELETE_ITEM_SUCCESS,
        payload: cartItem,
      });
    } catch (err: any) {
      dispatch({
        type: PRODUCT_DELETE_FROM_CART_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const removeProductFromCart =
  (cartItem: any) => async (dispatch: any) => {
    try {
      dispatch({
        type: CART_REMOVE_ITEM,
        payload: cartItem,
      });
    } catch (err: any) {
      dispatch({
        type: PRODUCT_REMOVE_FROM_CART_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const openCartDrawer = (show: any) => async (dispatch: any) =>
  dispatch({ type: OPEN_CART_DRAWER, payload: show });
