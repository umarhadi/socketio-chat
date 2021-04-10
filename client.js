const socket = io('http://localhost:3000')
const kontainerPesan = document.getElementById('kontainer-pesan')
const formPesan = document.getElementById('kontainer-kirim')
const inputPesan = document.getElementById('input-pesan')

const name = prompt('Siapa kamu?')
appendMessage('Kamu bergabung')
socket.emit('user-baru', name)

socket.on('isi-pesan', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-bergabung', name => {
    appendMessage(`${name} bergabung ke chat`)
})

socket.on('user-keluar', name => {
    appendMessage(`${name} keluar dari chat`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`Kamu: ${message}`)
    socket.emit('kirim-pesan', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}