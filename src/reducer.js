import {
  LOGIN_STATUS,
  CLIENT,
  ACTIONS,
  CATEGORY
} from './constants';

export const initialState = {
  error: '',
  username: '',
  loginStatus: LOGIN_STATUS.PENDING,
  isMessagesPending: false,
  messages: [],
  currentCategory: CATEGORY.GENERAL,
  active_users_count: 0,
  stats: {},
  isStatsPending: false,
  isInterestLoading: false,
  subscribedTo: ['general'],
};

function reducer(state, action) {
  switch(action.type) {

    case ACTIONS.LOG_IN:
      return {
        ...state,
        error: '',
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
        currentCategory: 'general'
      };

    case ACTIONS.START_LOADING_MESSAGES:
      return {
        ...state,
        error: '',
        isMessagesPending: true,
      };

    case ACTIONS.REPLACE_MESSAGES:
      return {
        ...state,
        error: '',
        isMessagesPending: false,
        messages: action.messages
      };
    
    case ACTIONS.START_LOADING_STATS:
      return {
        ...state,
        error: '',
        isStatsPending: true,
      };

    case ACTIONS.REPLACE_STATS:
      return {
        ...state,
        error: '',
        isStatsPending: false,
        stats: action.stats,
      };

    case ACTIONS.START_LOADING_INTERESTS:
      return {
        ...state,
        isInterestLoading: true,
        subscribedTo: ['general']
      };

    case ACTIONS.REPLACE_SUBSCRIBED_TO:
      return {
        ...state,
        isInterestLoading: false,
        subscribedTo: action.subscribedTo,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        isMessagesPending: false,
        messages: {},
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: '',
      };
    
    case ACTIONS.SET_ACTIVE_USERS:
      return {
        ...state,
        active_users_count: action.active_users_count,
      };
    
    case ACTIONS.CHANGE_CATEGORY:
      return {
        ...state,
        currentCategory: action.category,
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.error || 'ERROR',
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); // reporting detail for debugging aid, not shown to user
  }
}

export default reducer;
