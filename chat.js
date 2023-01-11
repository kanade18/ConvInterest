const messages = {
  general : [{ sender: "Shalmali", text: "GENERAL"}],
  art : [],
  sports : [],
  travel : [],
  technology : [],
  outdoor : [],
  gaming : [],
  music  : [],
}

function addMessage(username, category, messageText) {
  username = username.trim();
  text = messageText.trim();
  category = category.trim();
  const message = {
    sender: username,
    text: text,
  };
  // Add message a top
  messages[category].unshift(message);
  return message;
}

function getCategoryStats(){
  const stats = {};
  Object.keys(messages).map( key => {
    stats[key] = messages[key].length;
  });
  return stats;
}

function contains(category) {
  return !!messages[category];
};

const chat = {
  messages,
  addMessage,
  contains,
  getCategoryStats
};

module.exports = chat;
