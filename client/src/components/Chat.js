import React, { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import SideBar from './SideBar';
import './style.css';

function Chat({ socket }) {
	const [currentChatMessages, setCurrentChatMessages] = useState([]);
	const [allMessages, setAllMessages] = useState([]);
	const [typingUsers, setTypingUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [selectedChat, setSelectedChat] = useState({});
	const [allUserList, setAllUserList] = useState([]);
	const lastMessageRef = useRef(null);

	useEffect(() => {
		socket.on('userList', (users) => {
			setAllUserList(users); 
		});

		socket.on('messageResponse', (messageList) => {
			setAllMessages(messageList);
		});

		socket.on('messageList', (messageList) => {
			setAllMessages(messageList);
		});

		socket.on('userGenerated', (currentUserData) => {
			setCurrentUser(currentUserData);
		});

		socket.on('typingResponse', (data) => setTypingUsers(data));

		const userData = JSON.parse(localStorage.getItem('userData'));
		if (userData) {
			socket.emit('checkUserExistence', userData);
			setCurrentUser(userData);
		} else {
			socket.emit('generateNewUser', {});
		}

		socket.emit('getMessageList', {});
	}, [socket]);

	useEffect(() => {
		const newMessageList = allMessages.filter((message) =>
			(message.from === currentUser.id && message.to === selectedChat.id) ||
			(message.to === currentUser.id && message.from === selectedChat.id)
		);
		setCurrentChatMessages(newMessageList);
		lastMessageRef.current?.scrollIntoView({ block: 'center', behavior: 'auto' });
	}, [selectedChat, allMessages, currentUser]);

	return (
		<div className="chat__container">
			{!!Object.keys(selectedChat).length && <ChatHeader selectedChat={selectedChat} /> }
			<ChatBody
				socket={socket}
				typingUsers={typingUsers}
				lastMessageRef={lastMessageRef}
				messages={currentChatMessages}
				currentUser={currentUser}
				selectedChat={selectedChat}
			/>
			<SideBar
				users={allUserList}
				currentUser={currentUser}
				selectedChat={selectedChat}
				setSelectedChat={setSelectedChat}
			/>
		</div>

	);
}

export default Chat;
