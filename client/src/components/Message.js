import React from 'react';

function Message({ message, currentUser, selectedChat }) {
	const messageTimestamp = new Date(message.timestamp);
	const hours = messageTimestamp.getHours();
	let minutes = messageTimestamp.getMinutes();
	minutes = minutes > 10 ? minutes : `0${minutes}`;
	const time = hours > 12 ? `${hours - 12}:${minutes}PM` : `${hours}:${minutes}AM`;
	return (
        currentUser.id === message.from ? (
	<div className="message message__sender">
		<div className="message__header">
			<p>You</p>
			<p className="message__time">{time}</p>
		</div>
		<div className="message__body message__sender__body">
			<p>{message.text}</p>
			<div className="corner corner__message__sender" />
		</div>
	</div> 
        ) : (
	<div className="message message__recipient">
		<div className="message__header">
			<p>{selectedChat.name}</p>
			<p className="message__time">{time}</p>
		</div>
		<div className="message__body">
			<div className="corner corner__message__recipient" />
			<p>{message.text}</p>
		</div>
	</div>
        )
	);
}

export default Message;
