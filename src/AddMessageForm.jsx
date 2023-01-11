import { useState } from 'react';

function AddMessageForm({ category, onAddMessage }) {

  const [ messageText, setMessageText ] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    setMessageText('');
    onAddMessage(category, messageText);
  }

  function onTyping(e) {
    setMessageText(e.target.value);
  }

  return (
    <div className="add__message__form">
      <b>Start Interacting</b>
      <form  action="#/add" onSubmit={onSubmit}>
      <input className="add__message__text" value={messageText} onChange={onTyping}/>
      <button type="submit" className="add__button" disabled={messageText === "" || messageText.trim() === ""}>Send</button>
      </form>
    </div>  
  );
}

export default AddMessageForm;
