const service = require('../service/service');

exports.getUsers = async(req, res) => {
    try{
        const roomName = req.params.roomName;
        const userList = await service.retrieveUserList(roomName);
        return res.status(200).send({users : userList});
    } catch(err){
        console.log(err);
        return res.status(500).send("server error");
    }
}

exports.postUser = async(req, res) => {
    try{
        const {roomName, userName} = req.params;
        const postUserRes = await service.createUser(roomName, userName);
        if(postUserRes) return res.status(201).send({success: true});
        else return res.status(500).send({success : false});
        
    } catch(err){
        console.log(err);
        return res.status(500).send("server error");
    }
}

exports.getUserInRoom = async(req, res) => {
    try{
        const {roomName, userName} = req.params;
        const User = await service.retrieveUser(roomName, userName);
        console.log(User);
        if (User.length != 0)
            return res.status(200).send({success : true});
        else
            return res.status(200).send({success : false});
    } catch(err){
        console.log(err);
        return res.status(500).send("server error");
    }
}