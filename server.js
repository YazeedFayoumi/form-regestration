const express= require('express')
const app=express();

const {MongoClient}=require('mongodb')

const connection="mongodb+srv://yazeedfayoumi:EO7sN8WXMbjxNjOj@atlascluster.kgxlft7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"

const client= new MongoClient(connection)

const mydb= client.db('test')

const collection= mydb.collection('users')


app.get("/", function(req,res)
{
     res.send("hiii")
})

app.get("/users",async(req,res)=>{
     //find  =>{}=>all
     const users= await collection.find({}).toArray() 
     res.send(users)
})

app.get("/user/:username",async(req,res)=>{
     //find  =>{}=>all
     const users= await collection.findOne({'username':req.params.username}) 
     res.send(users)
})

var bodyParse= require('body-parser')

var urlEncoded= bodyParse.urlencoded({extended:false})

app.get("/form", function(req,res)
{
  res.sendFile(__dirname+"/form.html")
})

var fs= require('fs')

app.get("/userinfo", function(req,res){
     // var data=fs.readFileSync(__dirname+"/currentuser.txt")
     // res.json(data)

    var current= localStorage.getItem('currentUser')  //type of cash 
    res.json(data)
})

app.post("/login",urlEncoded, async(req,res)=>
{
      const findUser= await collection.findOne({'userName':req.body.userName})
      if (findUser) 
      {   //fs.writeFileSync(__dirname+"/currentuser.txt")
          localStorage.setItem('currentUser', findUser)
          res.sendFile(__dirname+"/form.html")
      }
      else{
          res.sendFile(__dirname+"/register.html")
      }
})


app.post("/register",urlEncoded, async(req,res)=>
{    //find 
     const createUser= await collection.insertOne({'userName': req.body.userName})
    
})







var server= app.listen(8007,function()
{
     var host = server.address().address
     var port=server.address().port

})