const server = require('fastify')();

let john = {
    name: "john",
    age: 18,
    attack: 100,
    defense: 100
};

let tom = {
    name: "tom",
    age: 19,
    attack: 105,
    defense: 90
};

let hogRiders = [john, tom];

server.get('/hogRider', function (req, res) {
    return hogRiders;
});

server.get('/hogRider/:name', function (req, res) {
  let result = hogRiders.find(element => element.name === req.params.name);
  if (result) {
      res.send(result);
  } else {
      res.status(404).send({"error": "not found"});
  }
});

server.post('/hogRider', function (req, res) {
  let newHogRider = req.body;
  hogRiders.push(newHogRider);
  return {count: hogRiders.length}; // 回應目前Hog Riders的總數
});

server.put('/hogRider/:name', function (req, res) {
  let index = hogRiders.findIndex(element => element.name === req.params.name);
  if (index !== -1) {
      // 使用req.body取得新的騎士資料並更新到hogRiders陣列中
      hogRiders[index] = req.body;
      // 回傳更新後的資料
      res.send(hogRiders[index]);
  } else {
      // 如果沒找到對應的騎士，回傳404錯誤
      res.status(404).send({"error": "not found"});
  }
});


server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
