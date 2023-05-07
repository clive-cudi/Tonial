const router = require('express').Router();
const User = require('../models/user.model');

router.route('/adduser').post((req,res)=>{
    const username = req.body.username ? req.body.username : req.query.username;
    const email = req.body.email ? req.body.email : req.query.email;
    const uid = req.body.uid ? req.body.uid : req.query.uid;
    const connects = req.body.connects ? req.body.connects : req.query.connects;
    const conversations = req.body.conversations ? req.body.conversations : req.query.conversations;

    const newUser = new User({
        username,
        email,
        uid,
        connects,
        conversations,
    });

    newUser.save().then(()=>{
        res.json('User Added')
    }).catch((e)=>{
        res.status(400).json(e)
    })

});

router.route('/getconversations').get((req, res)=>{
    // const username = req.body.username;
    const uid = req.query.uid ? req.query.uid : req.body.uid;

    User.findOne({'uid': uid},(err, result)=>{
        if (err){
            console.log(err)
            res.status(400).json(err)
        }
        res.json(result)
    })

});

router.route('/getconnects').get((req, res)=>{
    const uid = req.query.uid ? req.query.uid : req.body.uid;
    console.log(`User: ${uid} Connected`)

    User.findOne({'uid': uid},(err, result)=>{
        if (err){
            console.log(err);
            res.status(400).json(err);
        }
        console.log('found');
        console.log(result);
        res.json(result?.connects ?? []);
    });


});

router.route('/updateprofilepic').post((req, res)=>{
    const uid = req.body.uid ? req.body.uid : req.query.uid;
    const profilePicURL = req.body.profilepicurl;
    console.log(`Updating profile pic: ${uid}`);

    User.updateOne({'uid': uid}, 
        {profilepic: profilePicURL}
    ,{upsert: true}).then(()=>{
        res.json(profilePicURL);
        console.log(`ProfilePic: ${uid} updated\nDownloadURL: ${profilePicURL}`)
    }).catch((e)=>{
        console.log(e)
    })

});

router.route('/getprofilepic').get((req,res)=>{
    const uid = req.body.uid ? req.body.uid : req.query.uid;

    User.findOne({'uid':uid},(err, result)=>{
        if (err){
            console.log(err)
        }
        if (result?.profilepic){
            res.json({result: result?.profilepic, email: result?.email, about: result?.about ? result?.about : null})
        } else {
            res.json({result: null, email: result?.email, about: result?.about ? result?.about : null})
        }
    })
})

router.route('/updatemail').post((req, res)=>{
    const uid = req.body.uid ? req.body.uid : req.query.uid;
    const new_email = req.body.email ? req.body.email : req.query.email;

    User.updateOne({'uid': uid},{email: new_email}, {upsert: true}).then(()=>{
        res.json(`${uid} Email updated`)
    }).catch((e)=>{
        console.log(e)
    })

});

router.route('/updateusername').post((req, res)=>{
    const uid = req.body.uid ? req.body.uid : req.query.uid;
    const new_username = req.body.username ? req.body.username : req.query.username;

    User.updateOne({'uid': uid},{username: new_username}, {upsert: true}).then(()=>{
        res.json(`${uid} username updated`)
    }).catch((e)=>{
        console.log(e)
    })

});

router.route('/updateabout').post((req, res)=>{
    const uid = req.body.uid ? req.body.uid : req.query.uid;
    const new_about = req.body.about ? req.body.about : req.query.about;

    User.updateOne({'uid' : uid}, {about: new_about}, {upsert: true}).then(()=>{
        res.json(`${uid} about updated`);
    }).catch((e)=>{
        console.log(e);
    });
});
module.exports = router;