import React from 'react';
import Message from './Message';
import ChatBodyFooter from './ChatBodyFooter';

function ChatBody({
	socket, typingUsers, lastMessageRef, messages, currentUser, selectedChat,
}) {
	return (
		<section className="body__container">
			<div className="message__container">
				{messages.map((message, index) => (
					<Message
						message={message}
						currentUser={currentUser}
						selectedChat={selectedChat}
						key={index}
					/>
				))}
				<div ref={lastMessageRef} />
			</div> 

			<ChatBodyFooter
				socket={socket}
				selectedChat={selectedChat}
				currentUser={currentUser}
				typingUsers={typingUsers}
			/>
		</section>
	);
}

export default ChatBody;
