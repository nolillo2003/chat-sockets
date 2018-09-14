'use strict'

// HTTP 
let express = require('express');
let app = express();
let server = require('http').Server(app);

// Socket.io
let io = require('socket.io')(server);

// Serve static content in a path
app.use('/hello-world',express.static('client'));

// Routes
app.get('/hello-world', (request, response) => {
    console.log(__dirname);
    response.status(200).send('Hello !!');    
});

// Array of messages
let messages = [{
    id: 1,
    text: 'Welcome to private chat of Socket.io and NodeJS',
    nickname: 'System-Bot'
}];

// Open socket
io.on('connection', (socket) => {
    console.log('Client IP: ' + socket.handshake.address + ' connected');
    socket.emit('messages', messages);

    socket.on('add-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

// Start server
server.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port 8080');
});

 
