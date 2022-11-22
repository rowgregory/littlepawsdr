import {
  RAFFLE_WINNER_CREATE_FAIL,
  RAFFLE_WINNER_CREATE_REQUEST,
  RAFFLE_WINNER_CREATE_RESET,
  RAFFLE_WINNER_CREATE_SUCCESS,
  RAFFLE_WINNER_DELETE_FAIL,
  RAFFLE_WINNER_DELETE_REQUEST,
  RAFFLE_WINNER_DELETE_SUCCESS,
  RAFFLE_WINNER_DETAILS_FAIL,
  RAFFLE_WINNER_DETAILS_REQUEST,
  RAFFLE_WINNER_DETAILS_RESET,
  RAFFLE_WINNER_DETAILS_SUCCESS,
  RAFFLE_WINNER_LIST_FAIL,
  RAFFLE_WINNER_LIST_REQUEST,
  RAFFLE_WINNER_LIST_RESET,
  RAFFLE_WINNER_LIST_SUCCESS,
  RAFFLE_WINNER_UPDATE_FAIL,
  RAFFLE_WINNER_UPDATE_REQUEST,
  RAFFLE_WINNER_UPDATE_RESET,
  RAFFLE_WINNER_UPDATE_SUCCESS,
} from '../constants/raffleWinnerContants';

// @ts-ignore
export const raffleWinnerListReducer = (
  state = { raffleWinners: [] },
  action: any
) => {
  switch (action.type) {
    case RAFFLE_WINNER_LIST_REQUEST:
      return {
        loading: true,
      };
    case RAFFLE_WINNER_LIST_SUCCESS:
      return {
        loading: false,
        raffleWinners: action.payload,
      };
    case RAFFLE_WINNER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RAFFLE_WINNER_LIST_RESET:
      return {
        raffleWinners: [],
      };
    default:
      return state;
  }
};

// @ts-ignore
export const raffleWinnerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RAFFLE_WINNER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case RAFFLE_WINNER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        raffleWinner: action.payload,
      };
    case RAFFLE_WINNER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RAFFLE_WINNER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// @ts-ignore
export const raffleWinnerDetailsReducer = (
  state = { raffleWinner: {} },
  action: any
) => {
  switch (action.type) {
    case RAFFLE_WINNER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RAFFLE_WINNER_DETAILS_SUCCESS:
      return {
        loading: false,
        raffleWinner: action.payload,
        success: true,
      };
    case RAFFLE_WINNER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case RAFFLE_WINNER_DETAILS_RESET:
      return {
        raffleWinner: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const raffleWinnerUpdateReducer = (
  state = { raffleWinner: {} },
  action: any
) => {
  switch (action.type) {
    case RAFFLE_WINNER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case RAFFLE_WINNER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        raffleWinner: action.payload,
      };
    case RAFFLE_WINNER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RAFFLE_WINNER_UPDATE_RESET:
      return {
        raffleWinner: {},
      };
    default:
      return state;
  }
};

// @ts-ignore
export const raffleWinnerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RAFFLE_WINNER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case RAFFLE_WINNER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case RAFFLE_WINNER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
