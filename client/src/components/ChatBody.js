import React, { useState, useEffect } from 'react';

function ChatBody({ socket, typingUsers, lastMessageRef, messages, currentUser, selectedChat }) {
	const [message, setMessage] = useState('');
	const [typing, setTyping] = useState(false);
	const [timerId, setTimerId] = useState();
	const [typingStatus, setTypingStatus] = useState('')

	useEffect( () => {
		if (typing) {
			socket.emit('typing', {...currentUser, from: currentUser.id, to: selectedChat.id});
		} else if (!typing) {
			clearTimeout(timerId);
			let id = setTimeout(()=>{
				socket.emit('stopTyping', {...currentUser, from: currentUser.id, to: selectedChat.id})
			}, 1500);
			setTimerId(id);
		}
		return () => {
			if (timerId) {
				clearTimeout(timerId);
			}
		}
	}, [typing]);

	useEffect(() => {

		const selectedChatTypingStatus = typingUsers.find((cur) => cur.from === selectedChat.id && cur.to === currentUser.id)

		if(selectedChatTypingStatus) {
			setTypingStatus(selectedChatTypingStatus?.name + " is typing...")
		}else {
			setTypingStatus("")
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
					timestamp: new Date()
				},
			);
		}
		setMessage('');
	};

	return (
		<div className={"body__container"}>
			<div className={"message__container"}>
				{messages.map((message, index) => {
					const messageTimestamp = new Date(message.timestamp)
					const hours = messageTimestamp.getHours();
					const minutes = messageTimestamp.getMinutes();
					const time = hours > 12 ? `${hours-12}:${minutes}PM` : `${hours}:${minutes}AM`;
					return (
						currentUser.id === message.from ? (
							<div className="message message__sender" key={index}>
								<div className={"message__header"}>
									<p>You</p>
									<p className='message__time'>{time}</p>
								</div>
								<div className="message__body message__sender__body">
									<p>{message.text}</p>
									<div className={"corner corner__message__sender"}/>
								</div>
							</div>
						) : (
							<div className="message message__recipient" key={index}>
								<div className={"message__header"}>
									<p>{selectedChat.name}</p>
									<p className="message__time">{time}</p>
								</div>
								<div className="message__body">
									<div className={"corner corner__message__recipient"}/>
									<p>{message.text}</p>
								</div>
							</div>
						)
					)})}
				<div ref={lastMessageRef} />
			</div>

			<div className="typing__status">
				<p>{typingStatus}</p>
			</div>

			<form className={"send_message__form"} onSubmit={handleSendMessage}>
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
				<button disabled={!Object.keys(selectedChat).length} className={"send_message__button"} type="submit">Send message</button>
			</form>
		</div>

	);
}

export default ChatBody;
