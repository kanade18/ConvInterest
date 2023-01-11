const users = {};

function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function addUserData(username, userData){
  users[username] = userData;
  return users[username];
}

function getUserData(username) {
  return users[username];
}

function addSidToActiveSessions(username, sid) {
  user_info = users[username];
  user_info.active_sessions.add(sid);
}

function removeSidFromActiveSessions(username, sid){
  user_info = users[username];
  if(user_info){
    user_info.active_sessions.delete(sid);
  }
}

function updateInterest(username, category){
  user_info = users[username];
  if(!user_info.interests.includes(category)){
    user_info.interests.push(category);
  } else {
    const index = user_info.interests.indexOf(category);
    user_info.interests.splice(index, 1);
  }
  return user_info.interests;
}

function addInterest(username, category){
  user_info = users[username];
  if(!user_info.interests.includes(category)){
    user_info.interests.push(category);
  }
  return user_info.interests;
}

function removeInterest(username, interest){
  user_info = users[username];
  if(user_info.interests.includes(interest)){
    const index = user_info.interests.indexOf(category);
    array.splice(index, 1);
  }
}

function getActiveUsersCount() {
  const keys = Object.keys(users);
  let count = 0;
  keys.forEach(key => {
    if(users[key].active_sessions.size > 0){ // Skip logged in user or user with 0 sessions
      count++;
    }
  });
  return count - 1;
}

module.exports = {
  isValid,
  addUserData,
  getUserData,
  getActiveUsersCount,
  addSidToActiveSessions,
  removeSidFromActiveSessions,
  updateInterest,
  addInterest,
  removeInterest
};