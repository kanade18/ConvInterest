import Loading from './Loading';
import Message from './Message';

function Messages({
  category,
  messages,
  isMessagesPending,
}) {
  const SHOW = {
    PENDING: 'pending',
    EMPTY: 'empty',
    MESSAGES: 'messages',
  };

  let show;
  if(isMessagesPending) {
    show = SHOW.PENDING;
  } else if (!messages.length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.MESSAGES;
  }

  return (
    <div className="content">
      <h3>{category.toUpperCase()}</h3>
      { show === SHOW.PENDING && <Loading className="messages__waiting">Loading Messages...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No messages yet, add one!</p>
      )}
      { show === SHOW.MESSAGES && (
        <ul className="messages">
          { messages.map( message => (
            <li className="message" key={message.id}>
              <Message message={message}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Messages;
