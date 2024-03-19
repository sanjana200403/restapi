require('dotenv').config()
const express = require('express')
const members = require('./Member')
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.get('/users',(req,res)=>{
    try{

        res.status(200).json(members)
    }catch(err){
        res.status(500).json({msg:"something wrong"})
    }

})
app.get('/users/:id',(req,res)=>{
    try{
        console.log(req.url)
        console.log(req.params)

        const id= +req.params.id
        const found = members.some((item)=>item.id===id)
        console.log(found,"particular")
        if(found){
            const newmembers = members.filter((member)=>member.id===id)
            res.status(200).json(newmembers)
        }


    }catch(err){
        res.status(500).json({msg:"something wrong"})
    }
})
app.post('/user',(req,res)=>{
    const {id,name,email} = req.body
    members.push({id,name,email})
    res.status(200).json(members)
})
app.delete('/user/:id',(req,res)=>{
    const id = +req.params.id
    const found = members.some((mem)=>mem.id===id)
    if(found){
        const mem = members.filter((mem)=>mem.id !== id)
        res.status(200).json(mem)
    }
    else{
        res.status(400).json({"msg":"bad request"})
    }

})

app.put("/user/:id",(req,res) =>{
    const uid = +req.params.id
    const {name,email} = req.body

    const found = members.some(member=>member.id === uid)
    if(found){
        members.forEach(member =>{
            if(member.id===uid){
                member.name = name
                member.email =email
            }
        })
        res.status(200).json(members)
    }else{
        res.status(400).json({error:`No member found with this ${uid}`})
    }

})



app.listen(PORT,()=>{
    console.log("listening")
})
