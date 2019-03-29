let http = require('http');
let url = require('url');
let fs = require('fs');
let util = require('util');

let Server = http.createServer((req,res)=>{

  var pathname = url.parse(req.url).pathname;
  console.log(pathname);
  fs.readFile(pathname.substring(1),(err,data) =>{
    if(err) {
      res.writeHead(404, {
        'Conten-type': 'text/html'
      });
    }
      else{
        res.writeHead(200,{
          'Conten-type':'text/html'
        })
      res.write(data.toString());
      }
    res.end("Hello world!");
  })

})
Server.listen(3000,'192.168.43.103',()=>{
  console.log("Hi  I'm working");
})
