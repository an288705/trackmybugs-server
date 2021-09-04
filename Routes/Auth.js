const route = require('express').Router();
const userModel = require('../userModel');
const bugModel = require('../createBugModel');

route.post('/user',(req,result)=>{
    //create user
    userModel.create(req.body).then((user)=>{
        if(!user) return result.status(400).send('there was an error')

        result.send('created user')
    }).catch((err)=>result.status(400).send(err))
});

route.put('/user',(req,result)=>{
    //login
    const {_id,name,password,role} = req.body
    userModel.findByIdAndUpdate(_id,{name,password,role}).then((user)=>{
        if(!user) return result.status(400).send('no user')

        result.send('updated')
    })
        .catch((err)=>{
        if(!user) result.status(400).send(err)
        })
})
    .post('/',(req,result)=>{
        //encrypt this info
        userModel.findOne(req.body).then((user)=>{
            if(!user) return result.status(400).send('incorrect email/password')
            
            result.cookie('user',user);
            result.send(true);
        })
        .catch((err)=>{
            if(err) result.status(400).send(err);
        })
    })
    .get('/',(req,result)=>{
        userModel.find().then((user)=>{
            if(!user) return result.status(400).send('no users');

            result.send(user);
        })
        .catch((err)=>{
            if(err) result.status(400).send(err);
        })
    })

route.post('/bug',(req,result)=>{
    //create bug
    bugModel.create(req.body).then((bug)=>{
        if(!bug) return result.status(400).send('there was an error')

        result.send('created bug')
    }).catch((err)=>result.status(400).send(err))
})

route.put('/bug',(req,result)=>{
    //update
    const {_id, name, details, steps,version, priority, assigned,creator,time} = req.body;
    bugModel.findByIdAndUpdate(_id,{name, details, steps,version, priority, assigned,creator,time}).then((bug)=>{
        if(!bug) return result.status(400).send('no bug')

        result.send('updated')
    })
        .catch((err)=>{
        if(!bug) result.status(400).send(err)
        })
})
    .post('/',(req,result)=>{
        //encrypt this info
        bugModel.findOne(req.body).then((bug)=>{
            if(!bug) return result.status(400).send('incorrect email/password')
            
            result.cookie('bug',bug);
            result.send(true);
        })
        .catch((err)=>{
            if(err) result.status(400).send(err);
        })
    })
    .get('/bug',(req,result)=>{
        //allow get requests
        bugModel.find().then((bug)=>{
            if(!bug) return result.status(400).send('no bugs');
            
            result.send(bug);
        })
        .catch((err)=>{
            if(err) result.status(400).json(err);
        })
    })
    .delete('/bug',(req,result)=>{
        //allow delete requests
        const {_id} = req.body; //destructure from body
        
        bugModel.findByIdAndDelete(_id).then((bug)=>{
            if(!bug) return result.status(400).send('could not find bug');
            
            result.send(bug);
        })
        .catch((err)=>{
            if(err) result.status(400).send(err);
        })
    })

module.exports = route;