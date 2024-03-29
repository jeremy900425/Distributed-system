var PROTO_PATH = __dirname + '/helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name}); //call.request.name為client端傳來的參數 message為server端回傳的訊息
    // first param: if no err send null
}

// add function here: sum x and y and return as {result: ...}
function add(call, callback) {
  // you can use call.request.x and call.request.y to obtain x and y
    ans = call.request.x + call.request.y
    console.log('x+y的結果為' + (ans));
    callback(null, {result: ans}); //result是proto定義好的
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    // step 5-(6): change the following statment to :
    server.addService(hello_proto.Greeter.service, {sayHello: sayHello, add:add});
    // server.addService(hello_proto.Greeter.service, {sayHello: sayHello}); //Greeter.services為proto檔案中的service名稱,{sayHello: sayHello}為server端的function名稱

	

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('server started');
    }); //server.bindAsync用途是綁定server端的ip和port,第一個參數為ip和port,第二個參數為server端的認證方式,第三個參數為callback function
    //=> {console.log('server started');}表示server端啟動成功後會印出'server started'

    //server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

}

main();
