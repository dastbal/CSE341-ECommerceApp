const mongoose = require('mongoose');
const Schema  =mongoose.Schema


const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
    
});

module.exports = mongoose.model('Pizza',pizzaSchema)




// const Cart = require('./cart');
// const getDb = require('../utils/database').getDb;
// const mongodb = require('mongodb');




// module.exports = class Pizza{
//     constructor(title,price,description,id,userId){
//         this.title = title
//         this.price = price
//         this.description = description
//         this._id = id? new mongodb.ObjectId(id) : null
//         this.UserId = userId
        
//     }
    
//     save(){
//         const db = getDb();
//         let dbOp;
//         if(this._id){
//             dbOp = db
//             .collection('pizzas')
//             .updateOne({_id: this._id},{ $set :this})

//         }else{
//             dbOp = db
//             .collection('pizzas')
//             .insertOne(this)
//         }
//         return dbOp
//             .then(result=>{
//                 console.log(result)
//                 console.log('printed the result since pizza model')
                
//             }).catch(e=>{
//                 console.log(e)
//             })
//         }
//         static fetchAll(){
//             const db = getDb();
//             return db.collection('pizzas')
//             .find()
//             .toArray()
//             .then(pizzas=>{
//                 console.log(pizzas)
//                 return pizzas
//             }).catch(e=>{
//                 console.log(e)
//             })
            
//         }
        
//         static findById(id){
//             const db = getDb();
//             return db.collection('pizzas')
//             .find({_id: new mongodb.ObjectId(id) })
//             .next()
//             .then(pizza=>{
//                 console.log(pizza)
//                 return pizza
//             }).catch(e=>{
//                 console.log(e)
//             })
//         }
        
//         static deleteById(id){
//             const db = getDb();
//             return db.collection('pizzas')
//             .deleteOne({_id:new mongodb.ObjectId(id) })
//             .then(r=>{
//                 console.log('deleted')
//             })
//             .catch(e=>{
//                 console.log(e)
//             })

//         }
//     }









// // working with file system and json

// // const { json } = require('body-parser');
// // const fs = require('fs');
 
// // const path = require('path');
// // const p = path.join(path.dirname(require.main.filename),'data','pizzas.json')

// // const getPizzasFromFile= (cb) =>{
// //     fs.readFile(p,(e,fileContent)=>{
// //         if(e){
// //             cb([])
// //         }else{
// //             cb(JSON.parse(fileContent));

// //         }
// //     })

// // }

// // module.exports = class Pizza{
// //     constructor(id ,title,price,description){
// //         this.id = id
// //         this.title = title
// //         this.price = price
// //         this.description = description
        
// //     }
    
// //     save(){
// //         getPizzasFromFile( pizzas=>{
// //             const id =this.id
// //             var index =0;
// //             var count =0; 
// //             if(id){
// //                 //  findIndex it was not working   I do not know why
// //                 pizzas.forEach(element => {  
// //                     if (element.id == id ){  index = count} 
// //                     count++
// //                 });
// //                 const existingPizzaIndex=  index
// //                 console.log(this.id)
// //                 console.log(existingPizzaIndex)
// //                 const updatedPizzas = [...pizzas];
// //                 updatedPizzas[existingPizzaIndex] = this;                
// //                 fs.writeFile(p,JSON.stringify(updatedPizzas),(e)=>{
                    
// //                     console.log(e);
// //                 });
// //             }else{

// //                 this.id = Math.round((Math.random()*10000000));
// //                 pizzas.push(this);
// //                 fs.writeFile(p,JSON.stringify(pizzas),(e)=>{
                    
// //                 console.log(e);
// //             })
// //         }

// //         });
// //                 //pizzas.push(this);
// //     }
// //     static fetchAll(cb){
// //         getPizzasFromFile(cb);
// //     }

// //     static finById(id,cb){
// //         getPizzasFromFile(pizzas =>{
// //             const pizza = pizzas.find(p=> p.id == id);
// //             cb(pizza);
// //         })

// //     }
// //     static deleteById(id){
        
// //         getPizzasFromFile(pizzas =>{
// //             const updatedPizzas  = pizzas.filter( p=>  p.id != id);
// //             const pizza  = pizzas.filter( p=>  p.id == id);
// //             console.log(updatedPizzas)
// //             //console.log(pizza)
// //             fs.writeFile(p,JSON.stringify(updatedPizzas), err=>{
// //                 if(!err){

// //                         Cart.deletePizza(id,pizza[0].price);
                    
                    

// //                 }

// //             })
// //         })
// //     }
// // }