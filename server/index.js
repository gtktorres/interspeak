var express = require('express');
var http = require('http');
var socket = require('socket.io');
var router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const log = console.log

const app = express()
const server = http.createServer(app)
const io = socket(server)
app.use(router)

io.on('connect', (socket) => {
	socket.on('join', ({name, room}, cb) => {
		const { error, user } = addUser({ id: socket.id, name, room })

		if (error) {
			return cb(error)
		}

		socket.join(user.room)

		socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` })
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`})

		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

		cb()
	})

	socket.on('sendMessage', (message, cb) => {
		const user = getUser(socket.id)

		io.to(user.room).emit('message', { user: user.name, text: message })

		cb()
	})

	socket.on('disconnect', () => {
		const user = removeUser(socket.id)

		io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` })
		io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
	})
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
	log(`server is running on port ${PORT}`)
})