import React from 'react';

function ChatHeader({ selectedChat }) {
	return (
		<header className="header__container">
			<img src={selectedChat.avatar} alt="avatar" className="header__image" />
			<div className="header__name">
				<p className="user__name__header">{selectedChat.name}</p>
				<p className="user__description user__description__header">{selectedChat.description}</p>
			</div>
		</header>

	);
}
 
export default ChatHeader;
