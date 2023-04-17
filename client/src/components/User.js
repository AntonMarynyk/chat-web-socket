import React, { useState, useEffect } from 'react';

function User({ user, setSelectedChat, selectedChat }) {
	const selected = selectedChat.id === user.id;
	const selectedClassName = selected ? 'user__selected' : '';
	const statusClassName = user.status === 'online' ? ' online' : ' offline';

	const [windowSize, setWindowSize] = useState([
		window.innerWidth,
		window.innerHeight,
	]);
 
	useEffect(() => {
		const handleWindowResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<div className={`user__container ${selectedClassName}`} onClick={() => setSelectedChat(user)}>
			<div className="user__image__container">
				<img src={user.avatar} alt="avatar" className="user__image" />
				<div className={`status_circle${statusClassName}`} />
			</div>
			{
				windowSize[0] > 700 && (
					<div
						className="user__name__container"
					>
						<h4 style={{ margin: 0 }}>{user.name}</h4>
						<p className="user__description user__description_color">{user.description}</p>
					</div>
				)
			}

		</div>
	);
}

export default User;
