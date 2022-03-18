import axios from 'axios';
import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
} from '../constants/blogConstants';

export const listBlogs = () => async (dispatch: any) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });

    const { data } = await axios.get(`/api/blog`);

    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        error?.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBlog = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: BLOG_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/blog`, {}, config);

    dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: BLOG_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBlogDetails = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/blog/${id}`);

    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBlog =
  (newsArticle: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: BLOG_UPDATE_REQUEST });

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
        `/api/blog/${newsArticle._id}`,
        newsArticle,
        config
      );

      dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: BLOG_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteBlog = (id: any) => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: BLOG_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/blog/${id}`, config);

    dispatch({ type: BLOG_DELETE_SUCCESS });
  } catch (error: any) {
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
