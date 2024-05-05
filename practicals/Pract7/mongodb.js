const {MongoClient} = require('mongodb')
const url='mongodb://localhost:27017';
const database= 'student'
const client=new MongoClient(url);

const dbConnect=async()=>{
    const result=await client.connect();
    const db=await result.db(database);
    return db.collection('profile');
}

module.exports=dbConnect;