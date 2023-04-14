import React from 'react';

function ChatHeader({ selectedChat }) {
	return (
		<div className={"header__container selected"}>
			<img src={selectedChat.avatar} alt="avatar" className={"header__image"} />
			<div style={{ display: 'flex', margin: "1em 2em 3em 2em", flexDirection: 'column' }}>
				<h2 style={{margin: 0}}>{selectedChat.name}</h2>
				<text style={{ width: 'fit-content'}}>{selectedChat.description}</text>
			</div>
		</div>

	);
}

export default ChatHeader;
