import { SET_USER_FORM } from './actions';

const initialState = {
    users: [],
};

const rootReducer = (state = initialState, action) => {
    if(action.type === SET_USER_FORM) {
        return {
          ...state,
          users: [...state.users, action.payload]
        };
      }
      return state;
  };

export default rootReducer;
