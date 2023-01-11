import { useEffect, useReducer } from 'react';

import './App.css';
import CI from './CI.gif';
import reducer, { initialState } from './reducer';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
  CATEGORY,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchMessages,
  fetchAddMessage,
  fetchToggleInterest,
  fetchActiveUsers,
  fetchCategoryStats
} from './services';

import AddInterestForm from './AddInterestsForm';
import ActiveUsers from './ActiveUsers';
import AddMessageForm from './AddMessageForm';
import CategoryStats from './CategoryStats';
import Login from './Login';
import Messages from './Messages';
import Loading from './Loading';
import LogOut from './LogOut';
import Status from './Status';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin( username ) {
    dispatch({ type: ACTIONS.START_LOADING_MESSAGES });
    fetchLogin(username)
    .then( fetchedMessages => {
      dispatch({ type: ACTIONS.LOG_IN, username });
      dispatch({ type: ACTIONS.REPLACE_SUBSCRIBED_TO, subscribedTo: fetchedMessages.interests});
      dispatch({ type: ACTIONS.REPLACE_MESSAGES, messages: fetchedMessages.messages });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout()
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onAddMessage(category, messageText) {
    fetchAddMessage(category, messageText)
    .then( id => {
      dispatch({ type: ACTIONS.START_LOADING_MESSAGES });
      return fetchMessages(category);
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .then( messages => {
      dispatch({ type: ACTIONS.REPLACE_MESSAGES, messages: messages});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        dispatch({ type: ACTIONS.LOG_OUT });
        return;
      }
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onToggleInterest(category) {
    if(category === state.currentCategory){
      dispatch({ type: ACTIONS.CHANGE_CATEGORY, category: CATEGORY.GENERAL });
    }
    dispatch({ type: ACTIONS.START_LOADING_INTERESTS});
    fetchToggleInterest(category)
   .then( categories => {
      const subscribedTo = categories.subscribedTo
      dispatch({ type: ACTIONS.REPLACE_SUBSCRIBED_TO, subscribedTo});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        dispatch({ type: ACTIONS.LOG_OUT });
        return;
      }
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onCategoryChange(category){
    dispatch({ type: ACTIONS.CHANGE_CATEGORY, category });
    fetchMessages(category)
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .then( messages => {
      dispatch({ type: ACTIONS.REPLACE_MESSAGES, messages: messages});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        dispatch({ type: ACTIONS.LOG_OUT });
        return;
      }
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function checkForSession() {
    fetchSession()
    .then( session => {
      dispatch({ type: ACTIONS.LOG_IN, username: session.username });
      return fetchMessages(state.currentCategory);
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .then( messages => {
      dispatch({ type: ACTIONS.REPLACE_MESSAGES, messages: messages});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        dispatch({ type: ACTIONS.LOG_OUT });
        return;
      }
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function checkForActiveUserCount() {
    fetchActiveUsers()
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .then( active_users => {
      const active_users_count = active_users.active_users;
      dispatch({ type: ACTIONS.SET_ACTIVE_USERS, active_users_count });
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        dispatch({ type: ACTIONS.LOG_OUT });
        return;
      }
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function checkForCategoryStats() {
    dispatch({ type: ACTIONS.START_LOADING_STATS });
    fetchCategoryStats()
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .then( stats => {
      dispatch({ type: ACTIONS.REPLACE_STATS, stats});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        dispatch({ type: ACTIONS.LOG_OUT });
        return;
      }
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function checkForMessages() {
    dispatch({ type: ACTIONS.START_LOADING_MESSAGES });
    fetchMessages(state.currentCategory)
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION })
      }
      return Promise.reject(err);
    })
    .then( messages => {
      dispatch({ type: ACTIONS.REPLACE_MESSAGES, messages: messages});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        dispatch({ type: ACTIONS.LOG_OUT });
        return;
      }
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  useEffect(() => {
    if (state.loginStatus === LOGIN_STATUS.PENDING || state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN) { 
      return; 
    }
    checkForActiveUserCount();
    const interval = setInterval(() => {
      checkForActiveUserCount();
    }, 5000);
    return () => clearInterval(interval);
  }, [state.loginStatus]);

  useEffect(
    () => {
      if (state.loginStatus === LOGIN_STATUS.PENDING || state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN) { 
        return; 
      }
      checkForCategoryStats();
      const interval = setInterval(() => {
        checkForCategoryStats();
      }, 5000);
      return () => clearInterval(interval);
    }, 
    [state.loginStatus]);
  
  useEffect(
    () => {
      if (state.loginStatus === LOGIN_STATUS.PENDING || state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN) { 
        return; 
      }
      checkForMessages();
      const interval = setInterval(() => {
        checkForMessages();
      }, 5000);
      return () => clearInterval(interval);
    }, 
    [state.loginStatus, state.currentCategory]);

  return (
    <div className="app">
        <div className='main'>
          { state.error && (
            <div className="main__content">
              <Status error={state.error}/>
            </div>
          )}
          { state.loginStatus === LOGIN_STATUS.PENDING && ( 
            <div className="main__content">
              <Loading className="login__waiting">Loading user...</Loading> 
            </div>
          )}

          { state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
            <div className="main__content">
              <Login onLogin={onLogin}/> 
            </div>
          )}
          
          { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
            <div className="main__content">
              <div className='welcome'>
                <h3>Welcome {state.username}</h3>
              </div>
              <LogOut onLogout={onLogout}/>
              <AddMessageForm category={state.currentCategory} onAddMessage={onAddMessage}/>
              <Messages category={state.currentCategory} isMessagesPending={state.isMessagesPending} messages={state.messages}/>
            </div>
          )}
        </div>
        <div className='sidebar'>
          { state.loginStatus == LOGIN_STATUS.NOT_LOGGED_IN && (
            <div className='sidebar__content'>
                <img src={CI} alt="ConvInterest" />
            </div>
          )}
          { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
            <div className='sidebar__content'>
                <ActiveUsers active_users={state.active_users_count}/>
                { !state.isStatsPending &&  <CategoryStats subscribedTo={state.subscribedTo} stats={state.stats} onCategoryChange={onCategoryChange}/>}
                { !state.isInterestLoading && <AddInterestForm subscribedTo={state.subscribedTo} onToggleInterest={onToggleInterest}/> }
            </div>
          )}
        </div>
    </div>
  );
}

export default App;
