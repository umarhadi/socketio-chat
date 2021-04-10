const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('kontainer-pesan')
const messageForm = document.getElementById('kontainer-kirim')
const messageInput = document.getElementById('input-pesan')

const name = prompt('What is your name?')
appendMessage('Kamu bergabung')
socket.emit('user-baru', name)

socket.on('isi-pesan', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-bergabung', name => {
  appendMessage(`${name} bergabung`)
})

socket.on('user-keluar', name => {
  appendMessage(`${name} keluar`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('kirim-isi-pesan', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}