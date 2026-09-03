import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
const server= https.createServer({
     key:fs.readFileSync("./cert/server.key"),
     cert:fs.readFileSync("./cert/server.crt")
    },(req,res)=>{
  
    /*
    res.writeHead(200,{'Conten-type':'text/html'});
    res.write(`<h1>URLlalalala${req.url}</h1>`);
    res.end();*/

    /*
    const data = {name:'John Doe',age:30,city:'new york'};
    res.writeHead(200,{'Content-Type':'application/json'});
    res.end(JSON.stringify(data));*/
if (req.url === '/') {

    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlFile);

} else if (req.url?.endsWith('.js')) {

    const jsFile = fs.readFileSync(`./public${req.url}`, 'utf-8');

    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.end(jsFile);

} else if (req.url?.endsWith('.css')) {

    const cssFile = fs.readFileSync(`./public${req.url}`, 'utf-8');

    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(cssFile);

}else{
      try {
        const responseContent=fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.end(responseContent)
    } catch (error) {
         res.writeHead(400, {'Content-Type': 'text/html'});
         res.end();
    }
}

  

})

server.listen(8080,()=>{

    console.log("Server running on port 8080");
})