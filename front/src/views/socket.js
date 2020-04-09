const io = require('socket.io-client');

let socket = io.connect('http://localhost:4500');
export default socket;