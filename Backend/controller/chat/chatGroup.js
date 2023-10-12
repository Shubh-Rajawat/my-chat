const chatgroupmodel = require("../../model/chat/chatGroup");
const usersmodel = require("../../model/users/users");
const messagemodel=require('../../model/chat/message')
const fs=require('fs')
const filedelte=(file)=>{
    if(file){
        fs.unlink(file,(err)=>{
            if(err) throw err

            console.log("file deleted");
        })
    }
}

exports.createGroupAndAddmember=async(req,res)=>{
    try {
            const {groupName,createdBy,members}=req.body        
            let img=req.file?req.file.path:""
            const group= await chatgroupmodel.create({
                groupName,createdBy,members,groupImage:img
            })

            res.status(200).send({
                status:true,
                msg:"group create successfully",
                data:group
            })

    } catch (error) {
        req.file && filedelte(req.file.path)

        res.status(200).send({
            status:false,
            msg:error.message
        })
    }
}

exports.addNewgroupMembers=async(req,res)=>{
    try {
            const {groupId,members}=req.body        
            const finddata=await chatgroupmodel.findOne({_id:groupId})
            
            console.log(finddata);
            let allmembers=[...finddata.members,...members]
            let alluser=[...new Set(allmembers)]
            if(finddata){
                await chatgroupmodel.updateOne({_id:groupId},{$set:{members:alluser}})
                res.status(200).send({
                    status:true,
                    msg:"new member add sucessfully"
                })
            }

    } catch (error) {
        res.status(200).send({
            status:false,
            msg:error.message
        })
    }
}


exports.removegroupMembers=async(req,res)=>{
    try {
            const {groupId,membersId}=req.body        
            
            const group=await chatgroupmodel.findOne({_id:groupId})
            console.log(group);

if(group){

    let index=group.members.indexOf(membersId)
    group.members.splice(index,1)
    console.log(group.members);
    
    if(index>-1){
        await group.save()
        return(res.status(200).send({
            status:true,
            msg:"member has been remove"
        }))
    }
    
}

res.status(200).send({
    status:false,
    msg:"this groupid not exits"
})
    } catch (error) {
        res.status(200).send({
            status:false,
            msg:error.message
        })
    }
}


exports.fetchGroupList=async(req,res)=>{
    try {
        const {userid}=req.body
        const group=await chatgroupmodel.find({members:userid})

        if(group.length){
            res.status(200).send({
                status:true,
                data:group
            })    
        }else{
            res.status(200).send({
                status:false,
                msg:"no group found"
            })
        }
    } catch (error) {
        res.status(200).send({
            status:false,
            msg:error.message
        })
    }
}

exports.fetchGroupingMembers=async(req,res)=>{
    try {
        const {groupId}=req.body
        const findata=await chatgroupmodel.findOne({_id:groupId})
        if(findata){
            const users=await usersmodel.find({_id:{$in:findata.members}})
            res.status(200).send({
                status:true,
              data:findata
            })
        }else{
            res.status(200).send({
                status:false,
                msg:"no data found"
            })
        }
    } catch (error) {
        res.status(200).send({
            status:false,
            msg:error.message
        })
    }
}


exports.groupChatDelete=async(req,res)=>{
    try {
        const {groupId}=req.body
        const findata=await chatgroupmodel.findOne({_id:groupId})
        

        if(findata){
            
            const deletgroup= await chatgroupmodel.deleteOne({_id:groupId})
     
            findata.groupImage && filedelte(findata.groupImage)
            
            res.status(200).send({
                status:true,
                msg:"group deleted"
            })   
        }else{
            res.status(200).send({
                status:false,
                msg:"no data found"
            })
        }
    } catch (error) {
        res.status(200).send({
            status:false,
            msg:error.message
        })
    }
}