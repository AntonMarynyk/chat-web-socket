import React, { useState } from 'react';

function ChatBody({ socket, messages, currentUser, selectedChat }) {
	const [message, setMessage] = useState('');

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (message.trim()) {
			socket.emit(
				'message',
				{
					text: message,
					from: currentUser.id,
					to: selectedChat.id,
				},
			);
		}
		setMessage('');
	};

	return (
		<div className={"body__container"}>
			<ul>
				{messages.map((msg, index) => (<li key={index} style={{color: currentUser.id === msg.from ?  "red" : "blue"}}>{msg.text}</li>))}
			</ul>
			<form onSubmit={handleSendMessage}>
				<input
					type="text"
					placeholder="Write message"
					className="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					// onKeyDown={handleTyping}
				/>
				<button type="submit">SEND</button>
			</form>
		</div>

	);
}

export default ChatBody;
