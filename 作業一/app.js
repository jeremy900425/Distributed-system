const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  console.log(`接收到的訊息 ${msg}, 來自 ${rinfo.address}:${rinfo.port}`);
  server.send(`${rinfo.port}: ${msg}`, rinfo.port, rinfo.address, (error) => {
    if (error) {
      console.error(error);
    } else {
      server.close();
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(20213);

