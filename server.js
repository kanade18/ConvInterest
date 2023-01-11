const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const chat = require('./chat')
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username.toLowerCase());
  let existingUserData = users.getUserData(username);

  if(!existingUserData) {
    const userData = {
      active_sessions : new Set(),
      interests: ['general']
    }
    existingUserData = users.addUserData(username, userData);
  }
  users.addSidToActiveSessions(username.toLowerCase(), sid);

  res.cookie('sid', sid);
  res.json({ messages: chat.messages['general'], interests: existingUserData.interests});
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
    users.removeSidFromActiveSessions(username, sid);
  }

  res.json({ username });
});

// Users
app.get('/api/users', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const active_users = users.getActiveUsersCount();
  res.json({ active_users });
});

// Messages
app.get('/api/messages/:category', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { category } = req.params;

  if(!chat.contains(category)) {
    res.status(404).json({ error: `noSuchCategory`, message: `No category with name ${category}` });
    return;
  }
  
  res.json(chat.messages[category]);
});

app.post('/api/messages', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { category, messageText } = req.body;

  if(!messageText) {
    res.status(400).json({ error: 'required-message-text' });
    return;
  }

  if(!chat.contains(category)) {
    res.status(404).json({ error: `noSuchCategory`, message: `No category with name ${category}` });
    return;
  }

  const id = chat.addMessage(username, category, messageText);

  res.json({ id });
});

//Interests
app.get('/api/interests/', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const existingUserData = users.getUserData(username);
  interests = existingUserData.interests;
  res.json(interests);
});

app.post('/api/interests', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { category } = req.body;

  if(!category) {
    res.status(400).json({ error: 'required-category' });
    return;
  }

  if(!chat.contains(category)) {
    res.status(404).json({ error: `noSuchCategory`, message: `No category with name ${category}` });
    return;
  }

  subscribedTo = users.updateInterest(username, category);

  res.json({ subscribedTo });
});

// Stats
app.get('/api/interests/stats', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  let stats = chat.getCategoryStats();
  res.json(stats);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
