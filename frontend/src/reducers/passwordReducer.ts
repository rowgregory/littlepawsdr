// actions/passwordActions.js
export const setPasswordStrength = (validations: any, strength: any) => ({
  type: 'SET_PASSWORD_STRENGTH',
  payload: { validations, strength },
});

const initialState = {
  validations: [],
  strength: 0,
};

const passwordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_PASSWORD_STRENGTH':
      return {
        ...state,
        validations: action.payload.validations,
        strength: action.payload.strength,
      };
    default:
      return state;
  }
};

export default passwordReducer;
