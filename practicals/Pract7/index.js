const dbConnect=require('./mongodb');
const express=require('express')
const app=express();
app.use(express.static('public'))
const getData=async ()=>{
let result=await dbConnect();
result=await result.find().toArray();
console.log(result)
}

getData();
app.use(express.json());
app.get('/getData',async(_,resp)=>{
let result=await dbConnect();
result=await result.find().toArray();
resp.send(result)
});

app.post('/insertData',async(req,resp)=>{
    let result=await dbConnect();
    result= await result.insertOne(req.body);
    resp.send("Data Inserted Successfully")

});

app.put('/updateData/:name',async(req,resp)=>{
    let result=await dbConnect();
    result=await result.updateOne(
        {name:req.params.name},
        {$set:req.body})
    resp.send(' Data Updated Successfully')
})

app.delete('/deleteData/:name',async(req,resp)=>{
    let result=await dbConnect();
    result=await result.deleteOne({name:req.params.name})
    resp.send("Data Deleted Successfully")
})

app.listen(4700,()=>{
    console.log("Server is started");
});