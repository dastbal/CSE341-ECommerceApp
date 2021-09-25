const fs = require('fs');
const reqHandler = (req,res)=>{
const url = req.url;
const method = req.method;

    
    if (url ==='/'){
        res.write('<html>');
    res.write('<head><title>My first server</title></head>');
    res.write('<body>');
    res.write('<h1>Hey there</h1>');
    res.write('<form action="/message" method="POST" ><input type="text" name="msg"> <button type="submit">SEND</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
    
}
if (url ==='/message' && method ==="POST"){
// this is for listen the request the  callback y¡is for each data that listen
    const body= [];
    req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
        
    });
    req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        const msg = parsedBody.split('=')[1];
        fs.writeFile('message.txt',msg,(err)=>{
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
            
        });
    })
    
    
}
res.setHeader('content-Type','text/html')
res.write('<html>');
res.write('<head><title>My first server</title></head>');
res.write('<body>');
res.write('<h1>Cool</h1>');
res.write('</body>');
res.write('</html>');
res.end();
}

module.exports = {
    handler : reqHandler,
    text: " hey there"
};