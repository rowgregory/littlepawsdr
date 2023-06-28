import axios from 'axios';
import {
  PRODUCT_AND_ECARD_LIST_FAIL,
  PRODUCT_AND_ECARD_LIST_REQUEST,
  PRODUCT_AND_ECARD_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_GUEST_UPDATE_FAIL,
  PRODUCT_GUEST_UPDATE_REQUEST,
  PRODUCT_GUEST_UPDATE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_PUBLIC_DETAILS_FAIL,
  PRODUCT_PUBLIC_DETAILS_REQUEST,
  PRODUCT_PUBLIC_DETAILS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productContstants';
import { UPDATE_CART } from '../constants/cartConstants';

export const listProducts = () => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/products`);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : '404 - Not Found',
    });
  }
};
export const listProductsAndEcards = () => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_AND_ECARD_LIST_REQUEST });

    const { data } = await axios.get(`/api/products/ecards`);

    dispatch({ type: PRODUCT_AND_ECARD_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_AND_ECARD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : '404 - Not Found',
    });
  }
};

export const getProductDetails =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/products/${id}`, config);

      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getPublicProductDetails = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_PUBLIC_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/client/${id}`);

    if (typeof data === 'string') {
      return dispatch({
        type: PRODUCT_PUBLIC_DETAILS_FAIL,
        payload: 'Axios Error',
      });
    }

    dispatch({ type: PRODUCT_PUBLIC_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_PUBLIC_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct =
  (id: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });

      const {
        userLogin: { userInfo },
        cart,
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const deletedProduct = await axios.delete(`/api/products/${id}`, config);

      if (deletedProduct) {
        const updatedCartItems = cart.cartItems.filter(
          (item: any) => item.productId !== id
        );

        dispatch({ type: PRODUCT_DELETE_SUCCESS });
        dispatch({ type: UPDATE_CART, payload: updatedCartItems });
      }
    } catch (error: any) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createProduct =
  (product: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/products`, product, config);

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProduct =
  (product: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProductGuest = (product: any) => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_GUEST_UPDATE_REQUEST });

    const { data } = await axios.put(
      `/api/products/${product._id}/guest`,
      product
    );

    dispatch({ type: PRODUCT_GUEST_UPDATE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_GUEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
