const io = require('socket.io')(3000)

const users = {}
io.on('connection', socket => {
  socket.on('user-baru', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-gabung', name)
  })
})