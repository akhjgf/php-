var http=require('http');
var config=require('./config');
var router=require('./router');
var server=http.createServer();
server.on('request',function(req,res){
    router(req,res)
})


server.listen(config.port,config.host,function(){
    console.log('server is running at'+config.host+':'+config.port)
})