//*
var net = require('net');
var util = require('util');


var Proxy = module.exports = function(host, port) {
    
    var server = net.createServer({ pauseOnConnect: true }, function(serverSocket) {

        var irc = new net.Socket({ readable:true, writeable:true, allowHalfOpen: true });
        server.irc=irc;


        serverSocket.setNoDelay(false);
        serverSocket.setEncoding("utf-8");
        serverSocket.setKeepAlive(true);


        irc.setNoDelay(false);
        irc.setEncoding("utf-8");
        irc.setKeepAlive(true);
        
        serverSocket.pipe(irc);
        irc.pipe(serverSocket);

        serverSocket.on('data', data=> {
            console.log(`CLIENT: ${data}`);
            //irc.write(data);
        }); 
        serverSocket.on('end', (data)=> {
            console.log('serverSocket: end()',data);
            //irc.end(data);
        });
        irc.on("connect", ()=>{
            console.log("connected to irc server.. resuming client data ");
            serverSocket.resume(); 
        })
        irc.on('error', console.log);
        irc.on('data', data=>{
            console.log(`IRC: ${data}`);        
            //serverSocket.write(data);
        });
        irc.on('end', (data)=> {
            console.log("IRC socket: end()", data);
            //serverSocket.end(data);
        });
        serverSocket.on("connect",()=>{
            console.log("client connected to proxy.. connecting to irc server.. ");
            irc.connect(port, host);
        });
        serverSocket.on("error", console.log);
    });

    server.on('error', console.log);
    server.on('listening', ()=>console.log("waiting for incoming connections.."));

    return server;
}