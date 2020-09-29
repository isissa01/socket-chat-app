import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Message from './components/Message';

function App() {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const socketRef = useRef()

  useEffect(() => {
      socketRef.current = io.connect('/');
      socketRef.current.on('your id', id => setYourID(id))

      socketRef.current.on('message', body =>{
        
        
        setMessages( oldmsg => [...oldmsg, body]);
        const messageBoard = document.getElementById('message-board');
        messageBoard.scrollTop = messageBoard.scrollHeight;
        
      })
     
  



  }, []);

function handleChange(event){
  setMessage(event.target.value);
}
function sendMessage(event){
  event.preventDefault()
  const messageToSend = {
    body: message,
    id: yourID
  }
  setMessage('');
  socketRef.current.emit('send', messageToSend);
}

  return (
    <div className="App">
      <div className="message_board" id="message-board">  
        {messages.map(mes =>(
          <Message message={mes} id={yourID}></Message>
        ))}

      </div>

      <form className="message_form" onSubmit={sendMessage}>
        <input name="message" placeholder="Say something..." className="form_text"   value={message} onChange={handleChange}></input>
        <button type="submit" >Send</button>
      </form>

    </div>
  );
}

export default App;
