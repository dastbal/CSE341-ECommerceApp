const fs = require('fs');
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
    constructor(title,price,description){
        this.title = title
        this.price = price
        this.description = description
        
    }
    
    save(){
        this.id = Math.random().toString();
        getPizzasFromFile( pizzas=>{
            pizzas.push(this);
            fs.writeFile(p,JSON.stringify(pizzas),(e)=>{
                
                console.log(e);
            })

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
    // static delete(id){
        //     const x= pizzas.filter((pizza)=>{
            //         pizza.title != id
            
    //     })
    //     return x
    // }
}