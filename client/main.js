'use strict'

let ip = '192.168.1.55';
let port = 8080;
let socket = io.connect(ip + ':' + port,{'forceNew' : true});

socket.on('messages', (data) => {
    console.log(data);
    myRender(data);
});

function myRender(data){
    let html = data.map( (message, index) => {
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> says:
                <p>${message.text}</p>
            </div>
        `);
    }).join('');

    let divMsgs = document.getElementById('messages');
    divMsgs.innerHTML = html;
    divMsgs.scrollTop = divMsgs.scrollHeight;
}

function addMessage(event){
    let message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
    };

    document.getElementById('nickname').style.display = 'none';
    document.getElementById('text').value = '';


    socket.emit('add-message', message);

    return false;
}