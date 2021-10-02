const { json } = require('body-parser');
const fs = require('fs');

const Cart = require('./cart');
 
const path = require('path');
const p = path.join(path.dirname(require.main.filename),'data','pizzas.json')

const getPizzasFromFile= (cb) =>{
    fs.readFile(p,(e,fileContent)=>{
        if(e){
            cb([])
        }else{
            cb(JSON.parse(fileContent));

        }
    })

}

module.exports = class Pizza{
    constructor(id ,title,price,description){
        this.id = id
        this.title = title
        this.price = price
        this.description = description
        
    }
    
    save(){
        getPizzasFromFile( pizzas=>{
            const id =this.id
            var index =0;
            var count =0; 
            if(id){
                //  findIndex it was not working   I do not know why
                pizzas.forEach(element => {  
                    if (element.id == id ){  index = count} 
                    count++
                });
                const existingPizzaIndex=  index
                console.log(this.id)
                console.log(existingPizzaIndex)
                const updatedPizzas = [...pizzas];
                updatedPizzas[existingPizzaIndex] = this;                
                fs.writeFile(p,JSON.stringify(updatedPizzas),(e)=>{
                    
                    console.log(e);
                });
            }else{

                this.id = Math.round((Math.random()*10000000));
                pizzas.push(this);
                fs.writeFile(p,JSON.stringify(pizzas),(e)=>{
                    
                console.log(e);
            })
        }

        });
                //pizzas.push(this);
    }
    static fetchAll(cb){
        getPizzasFromFile(cb);
    }

    static finById(id,cb){
        getPizzasFromFile(pizzas =>{
            const pizza = pizzas.find(p=> p.id == id);
            cb(pizza);
        })

    }
    static deleteById(id){
        
        getPizzasFromFile(pizzas =>{
            const updatedPizzas  = pizzas.filter( p=>  p.id != id);
            const pizza  = pizzas.filter( p=>  p.id == id);
            console.log(updatedPizzas)
            //console.log(pizza)
            fs.writeFile(p,JSON.stringify(updatedPizzas), err=>{
                if(!err){

                        Cart.deletePizza(id,pizza[0].price);
                    
                    

                }

            })
        })
    }
}