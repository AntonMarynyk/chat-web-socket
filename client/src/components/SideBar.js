import React from 'react';
import User from './User';

function SideBar({ users, isOnline, setIsOnline, selectedChat, setSelectedChat }) {

	return (
		<div className={"sidebar__container"}>
			<button onClick={() => setIsOnline(true)} style={{color: isOnline ? 'red': ""}}>Online</button>
			<button onClick={() => setIsOnline(false)} style={{color: isOnline ? '': "red"}}>All</button>
			{users.map((user) => <User selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} key={user.id} />)}
		</div>
	);
}

export default SideBar;
