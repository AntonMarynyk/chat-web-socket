import React from 'react';

function ChatHeader({ selectedChat }) {
	return (
		<header className="header__container selected">
			<img src={selectedChat.avatar} alt="avatar" className="header__image" />
			<div className="header__name">
				<h2>{selectedChat.name}</h2>
				<p className="user__description">{selectedChat.description}</p>
			</div>
		</header>

	);
}
 
export default ChatHeader;
