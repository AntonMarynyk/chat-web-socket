const crypto = require('crypto')
const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').Server(app)
const PORT = 4000
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

const DEFAULT_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

function randomId () {
  return crypto.randomBytes(16).toString('hex')
}

function generateRandomAvatarLink () {
  const sex = ['women', 'men']
  const index = Math.floor(Math.random() * 100)
  const sexTypeIndex = Math.floor(Math.random() * 2)

  return `https://randomuser.me/api/portraits/${sex[sexTypeIndex]}/${index}.jpg`
}

function subscribeSpamBot (currentUser) {
  const randomInterval = Math.floor(Math.random() * (120 - 10 + 1) + 10) * 1000

  setTimeout(() => {
    const from = BOTS[2].id
    const to = currentUser.id
    const text = 'SPAM BOT MESSAGE'
    messages.push({ from, to, text })
    io.emit('messageResponse', messages)

    subscribeSpamBot(currentUser)
  }, randomInterval)
}

function checkUserExistence (currentUser, socket) {
  const userIndex = users.findIndex((user) => user.id === currentUser.id)

  console.log(userIndex)

  if (userIndex === -1) {
    users.push(currentUser)
    subscribeSpamBot(currentUser)
  } else {
    users[userIndex] = { ...users[userIndex], status: 'online', socketId: socket.id }
  }
  console.log(users)
}

app.use(cors())
const BOTS = [
  {
    id: randomId(),
    name: 'Echo bot',
    avatar: 'data:image/jpeg;base64,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',
    description: DEFAULT_DESCRIPTION,
    status: 'online',
    handleMessage: (data) => {
      const { from, to } = data
      messages.push({ ...data, to: from, from: to })
    }
  },
  {
    id: randomId(),
    name: 'Reverse bot',
    avatar: 'https://klike.net/uploads/posts/2022-05/1652518811_13.jpg',
    description: DEFAULT_DESCRIPTION,
    status: 'online',
    handleMessage: (data) => {
      console.log('gsagasgsa')
      const { from, to, text } = data
      const reverseText = text.split('').reverse().join('')
      messages.push({ text: reverseText, to: from, from: to })
    }
  },
  {
    id: randomId(),
    name: 'Spam bot',
    avatar: 'https://resizing.flixster.com/-spngtVC6kLW5Sfse0BcKHrFzMU=/300x300/v2/https://flxt.tmsimg.com/assets/p8702479_i_h10_ac.jpg',
    description: DEFAULT_DESCRIPTION,
    status: 'online',
    handleMessage: () => {}
  },
  {
    id: randomId(),
    name: 'Ignore bot',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Squidward_Tentacles.svg',
    description: DEFAULT_DESCRIPTION,
    status: 'online',
    handleMessage: () => {}
  }
]
const users = []
const messages = []

io.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`)

  socket.on('generateNewUser', (data) => {
    console.log(data)
    const currentUser = {
      id: randomId(),
      name: `User${socket.id.slice(0, 4)}`,
      avatar: generateRandomAvatarLink(),
      description: DEFAULT_DESCRIPTION,
      status: 'online',
      socketId: socket.id
    }

    checkUserExistence(currentUser, socket)

    io.emit('userList', [...BOTS, ...users])
    io.emit('userGenerated', currentUser)
  })

  socket.on('checkUserExistence', (currentUser) => {
    currentUser.socketId = socket.id
    currentUser.status = 'online'
    checkUserExistence(currentUser, socket)

    io.emit('userList', [...BOTS, ...users])
  })

  socket.on('message', data => {
    messages.push(data)
    const toId = data.to
    const bot = BOTS.find((bot) => bot.id === toId)
    if (bot) {
      bot.handleMessage(data)
    }
    io.emit('messageResponse', messages)
  })

  socket.on('getMessageList', _ => {
    io.emit('messageList', messages)
  })

  socket.on('typing', data => {
    socket.broadcast.emit('typingResponse', data)
  })

  socket.on('disconnect', () => {
    console.log({ users, socketId: socket.id })
    const disconnectedUserIndex = users.findIndex(user => user.socketId === socket.id)
    console.log(disconnectedUserIndex)
    if (disconnectedUserIndex !== -1) {
      users[disconnectedUserIndex].status = 'offline'
    }
    io.emit('userList', [...BOTS, ...users])
    console.log(users)
    socket.disconnect()
  })
})

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
