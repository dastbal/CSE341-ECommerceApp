const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect= (cb)=> {

    
    MongoClient.connect('mongodb+srv://david:zh4K6CWu4XnwhoC1@cluster0.xxfws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client=>{
        console.log('connected');
        cb(client)
    })
    .catch(e=>{
        console.log(e);
        
    })
}
module.exports =mongoConnect;