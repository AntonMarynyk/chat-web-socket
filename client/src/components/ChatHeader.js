import React from 'react';

function ChatHeader({ selectedChat }) {
	return (
		<div className={"header__container selected"}>
			<img src={selectedChat.avatar} alt="avatar" className={"header__image"} />
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h2 style={{margin: 0}}>{selectedChat.name}</h2>
				<p style={{ width: 'fit-content'}}>{selectedChat.description}</p>
			</div>
		</div>

	);
}

export default ChatHeader;
