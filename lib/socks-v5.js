// Socks5 module: https://github.com/M2Ys4U/socksjs  
//*
var SocksConnection = require('socksjs');

var remote = {
        host: 'irc.freenode.net',
        port: 6667,
        ssl: false
        
};
var socks = {
        host: 'localhost',
        port: 9999
};

var sock = SocksConnection.connect(remote, socks, (connected)=>{

    console.log(connected);
    console.log(remote,socks);

});
/* */
