const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4767;
const mongoose = require('mongoose');
const URI = `mongodb://clive:SycojaWMOAmtZEGB@cluster0-shard-00-00.9e7ml.mongodb.net:27017,cluster0-shard-00-01.9e7ml.mongodb.net:27017,cluster0-shard-00-02.9e7ml.mongodb.net:27017/TonialDB?ssl=true&replicaSet=atlas-1lfuk3-shard-0&authSource=admin&retryWrites=true&w=majority`;
const addUserRouter = require('./routes/addUser');
const addChatRouter = require('./routes/addChat');
const http = require('http');
const server = http.createServer(app);
const Chat = require('./models/chat.model');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET","POST"]
    }
})

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(URI, {useNewUrlParser: true});

app.use('/user', addUserRouter);
app.use('/chats', addChatRouter);

io.on('connection',(socket)=>{
    console.log(`New Client: id: ${socket.id}`)
    socket.on('message',(data)=>{
        console.log(data)
        const chatId = data.chatId;

        Chat.findOne({'chatId': chatId}, (err, result)=>{
            if (err){
                console.log(err);
            }
            console.log(result)
            if (result?.participants?.length > 2){
                // group chat
                console.log("group Message")
                // emit groupmsg with data as payload 
                socket.emit('groupmsg', data)
            } else {
                // private chat
                console.log("private Message")
                socket.emit('privatemsg',data)
            }
        })

    })
})


mongoose.connect(URI).then(() => {
    console.log("Connected to DB!!");
}).catch((db_connect_err) => {
    console.log(db_connect_err)
})

server.listen(port, ()=>{
    console.log(`Server up on port: ${port}`)
})