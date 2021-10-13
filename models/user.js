const mongoose = require('mongoose');
const Schema  =mongoose.Schema
const userSchema = new Schema({
    
    email: {
        type :String,
        required: true,
    },
    password: {
        type :String,
        required: true,
    },
    cart :{
        items:[
            {
                pizzaId:{
                    type: Schema.Types.ObjectId ,
                    ref:'Pizza',
                    required : true,
                },
                quantity : {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(pizza) {
    const cartPizzaIndex = this.cart.items.findIndex(p=> p.pizzaId.toString() == pizza._id.toString() );
    let newQuantity = 1;
    let updatedCartItems = [...this.cart.items];
    if(cartPizzaIndex !=-1){
        newQuantity = this.cart.items[cartPizzaIndex].quantity + 1
        updatedCartItems[cartPizzaIndex].quantity = newQuantity

    }else{
        updatedCartItems.push(
            {pizzaId: pizza._id, 
                quantity: newQuantity}
            )
    }
    const updatedCart = {items:updatedCartItems}
    this.cart = updatedCart;
    return this.save()



}

userSchema.methods.removeFromCart = function(id) {
    const updatedCartItems = this.cart.items.filter( pizza=> pizza.pizzaId.toString() !=  id.toString())
    this.cart.items = updatedCartItems
    return this.save()

}

userSchema.methods.clearCart = function() {
    this.cart = { items : []}
    return this.save()
}

module.exports = mongoose.model('User',userSchema);

// const getDb = require('../utils/database').getDb;
// const mongodb = require('mongodb');
// class User{
//     constructor(userName, email, cart, id){
//         this.name= userName
//         this.email= email
//         this.cart= cart
//         this._id=  id 
//     }
//     save(){
//         const db = getDb();
//         return db.collection('users').inserOne(this)
//         .then(result=>{
//             console.log(result)
//         })
        
//     }
//     getCart(){
//         const db = getDb();
//         const pizzaIds =this.cart.items.map(i=> i.pizzaId)
//         return db
//         .collection('pizzas')
//         .find({ _id : {$in :pizzaIds}}).toArray()
//         .then(pizzas=>{
//             return pizzas.map(p=>{ 
//                 return {  ...p ,
//                     quantity:this.cart.items.find(item=> item.pizzaId.toString()== p._id.toString() ).quantity
//                 }
//             })
//         })
//     }

//     addToCart(pizza){
//         const db = getDb();
//     const cartPizzaIndex = this.cart.items.findIndex(p=> p.pizzaId.toString() == pizza._id.toString() );
//     let newQuantity = 1;
//     let updatedCartItems = [...this.cart.items];
//     if(cartPizzaIndex !=-1){
//         newQuantity = this.cart.items[cartPizzaIndex].quantity + 1
//         updatedCartItems[cartPizzaIndex].quantity = newQuantity

//     }else{
//         updatedCartItems.push({pizzaId: new mongodb.ObjectId(pizza._id), quantity: newQuantity})
//     }
//     const updatedCart = {items:updatedCartItems}
//     return db
//     .collection('users')
//     .updateOne(
//         {_id : new mongodb.ObjectId(this._id)},
//         {$set : { cart: updatedCart}});


//     }

//     deletePizzaFromCart(id){
//         const db = getDb();
//         const updatedCart = this.cart.items.filter( pizza=> pizza.pizzaId.toString() != id.toString())
//         return db
//         .collection('users')
//         .updateOne(
//             {_id : new mongodb.ObjectId(this._id)},
//             {$set : { cart: {items : updatedCart}}});
    

//         }
        
//     addOrder(){
//         const db = getDb();
//         return this.getCart()
//         .then(pizzas =>{
            
//             const order = {
//                 items: pizzas,
//                 user:{
//                     _id:new mongodb.ObjectId(this._id),
//                     name: this.name,
//                 }
//             }
//             return db
//             .collection('orders')
//             .insertOne(order)
//         })
//         .then(r=>{
//             this.cart = {items : []};
//             return db
//             .collection('users')
//             .updateOne(
//             {_id : new mongodb.ObjectId(this._id)},
//             {$set : { cart: {items : []}}});

            
//         })

//     }
    
//     getOrders(){
//         const db = getDb();
//         return db.collection('orders')
//         .find({'user._id': new mongodb.ObjectId(this._id)}).toArray()

//     }
    
//     static findById(id){
//         const db = getDb();
//         return db
//         .collection('users')
//         .findOne({_id: new mongodb.ObjectId(id)})
//         .then(user=>{
//             console.log(user)
//             return user;
            
//         }).catch(e=>{

//             console.log(e)

//         })
        


//     }
// }

// module.exports = User;