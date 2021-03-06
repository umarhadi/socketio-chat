const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('user-baru', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-bergabung', name)
  })
  socket.on('kirim-isi-pesan', message => {
    socket.broadcast.emit('isi-pesan', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-keluar', users[socket.id])
    delete users[socket.id]
  })
})