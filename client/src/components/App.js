import React, {useMemo} from 'react';
import socketIO from 'socket.io-client';
import Chat from './Chat';

function App() {
	const socket = socketIO.connect('http://localhost:4000')
	return (
		<div className="App">
			<Chat socket={socket} />
		</div>
	);
}

export default App;
