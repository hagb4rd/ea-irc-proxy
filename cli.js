
var args = require("minimist")(process.argv);
var util = require("util");
var lib = require("ea-lib");
var Proxy = require("./lib/irc-proxy");

var IRC_PORT = args.port || args.p || 6667;
var IRC_HOST = args.host || args.h || "chat.freenode.net";
var LISTEN_PORT = args.listen || args.l || 6667;

//--help if no arguments passed
args.help = args.help || [args.port,args.p,args.host,args.h,args.listen, args.l].every(x=>!x);
    
if(args.help || args["?"]) {
    //display helpc
    console.log("\n USAGE:\n ----------\n", "irc-proxy -h --host chat.freenode.net -p --port 6667 -l --listen 1080\n");
} else {
    //run ea-irc-proxy node 
    var proxy = Proxy(IRC_HOST,IRC_PORT).listen(LISTEN_PORT);
}