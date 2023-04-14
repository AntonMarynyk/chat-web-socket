import React from 'react';

function User({ user, setSelectedChat, selectedChat }) {
	const selected = selectedChat.id === user.id
	const selectedClassName = selected ? "selected" : ""
	const statusClassName = user.status === "online" ? " online" : " offline"
	return (
		<div className={"user__container " + selectedClassName} onClick={() => setSelectedChat(user)}>
			<div className={"user__image__container"}>
				<img src={user.avatar} alt="avatar" className={"user__image"} />
				<div className={'status_circle' + statusClassName}/>
			</div>
			<div
				className={"user__name__container"}
			>
				<h4 style={{margin: 0}}>{user.name}</h4>
				<div>{user.description}</div>
			</div>
		</div>
	);
}

export default User;