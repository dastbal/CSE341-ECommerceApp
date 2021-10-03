const fs = require('fs');
const { parse } = require('path');
const path = require('path');
const p = path.join(path.dirname(require.main.filename),'data','cart.json')
module.exports = class Cart{
    static addPizza(id , price){
        // fetch the prevoous cart
        fs.readFile(p,(err,fileContent)=>{
            let cart = {
                pizzas:[],
                totalPrice : 0,
            };
            if(!err){
                cart = JSON.parse(fileContent);
            }
            // analyze the cart  to find  existing pizza
            let existingPizzaIndex =  cart.pizzas.findIndex(pizza => pizza.id ==id)
            let existingPizza =  cart.pizzas[existingPizzaIndex]
            let updatedPizza ;
            if(existingPizza){
                updatedPizza = {...existingPizza};
                updatedPizza.quantity =  updatedPizza.quantity + 1;
                cart.pizzas = [...cart.pizzas]  
                cart.pizzas[existingPizzaIndex] = updatedPizza;
            }else{
                updatedPizza = {id:id , quantity: 1};
                cart.pizzas = [...cart.pizzas,updatedPizza]
            }
            cart.totalPrice = cart.totalPrice  +  price
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err)
            })
        })
        // add new pizza increase quantity
    }
    static deletePizza(id,price){
        fs.readFile(p,(err,fileContent)=>{
            if(err){ return            }
            let updatedCart= { ...JSON.parse(fileContent)};
            let pizza =updatedCart.pizzas.filter( p=>  p.id == id);
            pizza = pizza[0]
            if(!pizza){ return;}
            const pizzaQuantity = pizza.quantity;
            updatedCart.pizzas =updatedCart.pizzas.filter(p=> p.id != id );
            updatedCart.totalPrice -=   price*pizzaQuantity;
            fs.writeFile(p,JSON.stringify(updatedCart),err=>{
                console.log(err)
            })
        })
    }

    static getPizza(cb){
        fs.readFile(p,(err,fileContent)=>{
            if(err){ cb(null)        }else{
                const cart = JSON.parse(fileContent);
                cb(cart)
            }
            
        })

    }

}