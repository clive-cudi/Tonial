import socketClient from 'socket.io-client';

const serverURI = "http://localhost:4767";
const socket = socketClient(serverURI);
socket.on('connection',()=>{
    console.log("connected to back end")
})

export default socket;