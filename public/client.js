const socket = io();

let name1;

let textArea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message__area");

// WE have to give name name until not given
do {
     name1 =   prompt("Please enter your name: ")
} while(!name1)


// We have to check if enter key is up
textArea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: name1,
        message: message.trim()
    }

    // Append message
    appendMessage(msg, 'outgoing')

    textArea.value = ''
    scrollToBottom()

    // Sending message to Server
    socket.emit('message', msg)
}

// Type is either incoming or outgoing
function appendMessage(msg, type) {
   let mainDiv = document.createElement('div');
   let className = type
   mainDiv.classList.add(className, 'message')

   let markup = `
   <h4>${msg.user}</h4>
   <p>${msg.message}</p>
   `

// Insert markup inside markup
mainDiv.innerHTML = markup
messageArea.appendChild(mainDiv)
}

// Receiving messages

socket.on('message', (msg) => {
    // Append message in DOM
    appendMessage(msg, 'incoming');
    scrollToBottom()
})

// Automatically scroll
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

