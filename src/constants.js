export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};

export const CATEGORY = {
  GENERAL: 'general',
  ART : 'art',
  SPORTS: 'sports',
  TRAVEL: 'travel',
  TECHNOLOGY: 'technology',
  OUTDOOR: 'outdoor',
  GAMING: 'gaming',
  MUSIC: 'music',
}

export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE_TEXT: 'required-message-text',
  REQUIRED_CATEGORY: 'required-category',
  CATEGORY_MISSING: 'noSuchCategory',
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.REQUIRED_MESSAGE_TEXT]: 'Please enter valid message',
  [SERVER.REQUIRED_CATEGORY]: 'Please enter a valid category',
  [SERVER.CATEGORY_MISSING]: 'Category is missing',
  default: 'Something went wrong.  Please try again',
};


export const ACTIONS = {
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
  START_LOADING_MESSAGES: 'startLoadingMessages',
  REPLACE_MESSAGES: 'replaceMessages',
  REPORT_ERROR: 'reportError',
  SET_ACTIVE_USERS: 'setActiveUsers',
  START_LOADING_STATS: 'startLoadingStats',
  REPLACE_STATS: 'replaceStats',
  CHANGE_CATEGORY: 'changeCategory',
  START_LOADING_INTERESTS: 'startLoadingInterests',
  REPLACE_SUBSCRIBED_TO: 'replaceSubscribedTo',
};
