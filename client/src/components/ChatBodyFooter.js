import React, { useEffect, useState } from 'react';

function ChatBodyFooter({
	socket, typingUsers, currentUser, selectedChat, 
}) {
	const [message, setMessage] = useState('');
	const [typing, setTyping] = useState(false);
	const [typingStatus, setTypingStatus] = useState('');

	const [timerId, setTimerId] = useState();

	useEffect(() => {
		if (typing) {
			socket.emit('typing', { ...currentUser, from: currentUser.id, to: selectedChat.id });
		} else if (!typing) { 
			clearTimeout(timerId);
			const id = setTimeout(() => {
				socket.emit('stopTyping', { ...currentUser, from: currentUser.id, to: selectedChat.id });
			}, 1500);
			setTimerId(id);
		}
		return () => {
			if (timerId) {
				clearTimeout(timerId);
			}
		};
	}, [typing]);

	useEffect(() => {
		const selectedChatTypingStatus = typingUsers.find((cur) => cur.from === selectedChat.id && cur.to === currentUser.id);

		if (selectedChatTypingStatus) {
			setTypingStatus(`${selectedChatTypingStatus?.name} is typing...`);
		} else {
			setTypingStatus('');
		}
	}, [typingUsers, selectedChat]);

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (message.trim()) {
			socket.emit(
				'message',
				{
					text: message,
					from: currentUser.id,
					to: selectedChat.id,
					timestamp: new Date(),
				},
			);
		}
		setMessage('');
	};

	return (
		<>
			<div className="typing__status">
				<p>{typingStatus}</p>
			</div>

			<form className="send_message__form" onSubmit={handleSendMessage}>
				<input
					type="text"
					placeholder="Write message"
					className="message__input"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					disabled={!Object.keys(selectedChat).length}
					onKeyDown={() => setTyping(true)}
					onKeyUp={() => setTyping(false)}
				/>
				<button disabled={!Object.keys(selectedChat).length} className="send_message__button" type="submit">Send message</button>
			</form>
		</>
	);
}

export default ChatBodyFooter;
