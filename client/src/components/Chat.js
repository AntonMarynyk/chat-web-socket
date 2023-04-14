import React, { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import SideBar from './SideBar';
import "./style.css"

function Chat({ socket }) {
	const [currentChatMessages, setCurrentChatMessages] = useState([]);
	const [allMessages, setAllMessages] = useState([]);
	const [typingStatus, setTypingStatus] = useState('');
	const [currentUser, setCurrentUser] = useState({});
	const [selectedChat, setSelectedChat] = useState({});
	const [allUserList, setAllUserList] = useState([]);
	const [filteredUserList, setFilteredUserList] = useState([])
	const [isOnline, setIsOnline] = useState(false)
	const lastMessageRef = useRef(null);

	useEffect(() => {
		if(isOnline){
			setFilteredUserList(allUserList.filter(user=>user.status==="online"))
		}else {
			setFilteredUserList(allUserList)
		}
	}, [allUserList, isOnline]);


	// useEffect(() => {
	// 	socket.on('userList', (users) => {
	// 		console.log("userList")
	// 		setUserList(users);
	// 	});
	// }, [currentUser]);

	useEffect(()=>{
		socket.on('userList', (users) => {
			console.log("userList")
			setAllUserList(users);
		});

		socket.on('messageResponse', (messageList) => {
			console.log("messageResponse")
			setAllMessages(messageList);
		});

		socket.on('messageList', (messageList) => {
			console.log("messageList")
			setAllMessages(messageList);
		});

		socket.on('userGenerated', (currentUserData) => {
			console.log("userGenerated")
			setCurrentUser(currentUserData);
			localStorage.setItem('userData', JSON.stringify(currentUserData));
		});
	}, [socket])

	// useEffect(() => {
	// 	socket.on('messageResponse', (messageList) => {
	// 		console.log("messageResponse")
	// 		setAllMessages(messageList);
	// 	});
	// }, [socket]);

	useEffect(() => {
		socket.emit('getMessageList', {});
		// socket.on('messageList', (messageList) => {
		// 	console.log("messageList")
		// 	setAllMessages(messageList);
		// });
	}, []);

	useEffect(() => {
		const newMessageList = allMessages.filter((message) => (message.from === currentUser.id && message.to === selectedChat.id) || (message.to === currentUser.id && message.from === selectedChat.id));
		setCurrentChatMessages(newMessageList);
	}, [selectedChat, allMessages]);

	// useEffect(() => {
	// 	socket.on('typingResponse', (data) => setTypingStatus(data));
	// }, [socket]);
	//
	// useEffect(() => {
	// 	lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
	// }, [messages]);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('userData'));
		console.log(userData)
		if (userData) {
			socket.emit('checkUserExistence', userData);
			setCurrentUser(userData);
		} else {
			socket.emit('generateNewUser', {});
			// socket.on('userGenerated', (currentUserData) => {
			// 	console.log("userGenerated")
			// 	setCurrentUser(currentUserData);
			// 	localStorage.setItem('userData', JSON.stringify(currentUserData));
			// });
		}
	}, []);


	return (
		<div className={"container"}>
			{!!Object.keys(selectedChat).length && <ChatHeader selectedChat={selectedChat} />}
			<ChatBody socket={socket} messages={currentChatMessages} currentUser={currentUser} selectedChat={selectedChat} />
			<SideBar users={filteredUserList.length === 0 ? allUserList : filteredUserList} isOnline={isOnline} setIsOnline={setIsOnline} selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
		</div>

	);
}

export default Chat;
