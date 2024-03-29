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

function main() {
    var client = new hello_proto.Greeter('localhost:50051',
        grpc.credentials.createInsecure());
        //var client是client端的物件,hello_proto.Greeter('localhost:50051',grpc.credentials.createInsecure())是client端的ip和port

    client.sayHello({name: 'Tom'}, function (err, response) {
      //sayHello為proto檔案中的rpc名稱,{name: 'Tom'}為client端傳給server端的參數 function (err, response)為callback function
        console.log('Greeting Response:', response.message);
    });
    client.add({x: 3, y: 2}, function (err, response) {
        console.log('Add Response:', response.result); //response.result是proto定義好的
    });
	// note that you should use response.result to get the outcome
}
//callback function用途是當server端回傳訊息後,client端可以透過callback function來處理server端回傳的訊息

main();
