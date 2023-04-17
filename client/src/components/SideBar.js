import React, {useState, useEffect} from 'react';
import User from './User';

function SideBar({ users, selectedChat, setSelectedChat }) {
	const [isOnline, setIsOnline] = useState(false)
	const [searchString, setSearchString] = useState("")
	const [userList, setUserList] = useState(users)

	useEffect(() => {
		const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchString))
		if(isOnline){
			setUserList(filteredUsers.filter(user=>user.status==="online"))
		}else {
			setUserList(filteredUsers)
		}
	}, [users, searchString, isOnline]);

	return (
		<div className={"sidebar__container"}>
			<div className={"sidebar_buttons__container"}>
				<button
					className={`sidebar_button ${isOnline ? '': "sidebar_button__online"}`}
					onClick={() => setIsOnline(true)}
				>
					Online
				</button>
				<button
					className={`sidebar_button ${isOnline ? 'sidebar_button__all': ""}`}
					onClick={() => setIsOnline(false)}
				>
					All
				</button>
			</div>
			<div className={"users__container"}>
				{userList.map((user) => <User selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} key={user.id} />)}
			</div>
			<input
				onChange={(e)=>setSearchString(e.target.value)}
				value={searchString}
				placeholder={"Search..."}
				className={"user__search"}
			/>
		</div>
	);
}

export default SideBar;
