const router = require('express').Router();
const Chat = require('../models/chat.model');
const genChatid = require('../actions/ChatIDgen');
const User = require('../models/user.model');

router.route('/addchat').post((req,res)=>{
	// generate chatId on the server
    const chatId = req.body.chatId ? (req.body.chatId || req.query.chatId) : genChatid();
    const chatType = req.body.type;
    const thread = req.body.thread;
    const participants = req.body.participants;
    console.log('add chat req')

    const newChat = new Chat({
        chatId,
        chatType,
        participants,
        thread
    });
    newChat.save().then(()=>{
        console.log('chat saved')
        console.log(participants)
        participants.forEach((userParticipant)=>{
            User.updateOne({uid: userParticipant.uid}, {
                $push: {conversations: {
                    chatId: chatId,
                }}
            })
        })
        res.json({newChatId: chatId})
    }).catch((e)=>{
        res.status(400).json(e)
    })

});

router.route('/getchat').get((req,res)=>{
    const chatId = req.query.chatid;

    
    Chat.findOne({'chatId': chatId}, (err, result)=>{
        if (err){
            console.log(err);
            res.status(404).json(err)
        }
        res.json(result)
    })

})

router.route('/updatechat').post((req, res)=>{
    const senderuid = req.body.senderuid;
    const chatId = req.body.chatId;
    const text = req.body.txt;
    const time = req.body.time;
    function convertTime(sampletime, cmd){
        let date = sampletime.substr(4,11);
        let finalTime = '';
        let time = sampletime.substr(16,5);
        if (time.substr(0,2) == '00'){
            finalTime = `${12}:${time.substr(3,2)} AM`;
        } else if (Number(time.substr(0,2)) < 12 ){
            finalTime = `${time} AM`;
        } else if (time.substr(0,2) == "12"){
            finalTime = `${time} PM`;;
        } else if (Number(time.substr(0,2)) > 12){
            finalTime = `${time.substr(0,2) - 12}:${time.substr(3,2)} PM`;
        }
    
        return cmd == "date" ? date : finalTime
    }

    let newMsg = {
        senderuid: senderuid,
        type: "Sent",
        text: text,
        time: convertTime(time, "time"),
        date: convertTime(time, "date"),
    }

    Chat.updateOne({chatId: chatId}, {
        $push: {thread: newMsg}
    }).then(()=>{
        res.json({...newMsg, chatId: chatId});
        console.log(`Thread: ${chatId} added`)
    }).catch((e)=>{
        console.log(e);
    })

});

router.route('/updatechatpic').post((req, res)=>{
    const chatId = req.body.chatid ? req.body.chatid : req.query.chatid;
    const chatPic = req.body.chatpic ? req.body.chatpic : req.query.chatpic;

    Chat.updateOne({'chatId': chatId},{chatpic: chatPic}, {upsert: true}).then(()=>{
        res.json(`${chatId} chatPic updated`);
    }).catch((e)=>{
        console.log(e);
    });
})

router.route('/getchatpic').get((req, res)=>{
    const chatId = req.body.chatid ? req.body.chatid : req.query.chatid;

    Chat.findOne({'chatId': chatId},(err, result)=>{
        if (err){
            console.log(err)
        }
        if (result.chatpic){
            res.json({chatpic: result.chatpic})
        } else {
            res.json({chatpic: null})
        }
    })

});

module.exports = router;