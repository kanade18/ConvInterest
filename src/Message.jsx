function Message({
  message,
}) {
  return (
    <div class="message__details">
          <div className="message__details__sender"><label >From: {message.sender}</label></div>
          <div className="message__text"><label >{message.text}</label></div>
    </div>
  );
}

export default Message;
