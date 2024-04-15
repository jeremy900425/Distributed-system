const mqtt = require('mqtt');
const client = mqtt.connect();
client.subscribe('EVENT'); //請填入適當的值
let eventSeq = ['CO', 'CF', 'DO', 'DF'];

client.on('message', function (topic, message) {
    let item = eventSeq[0]; // 取得eventSeq的第一個元素
    // 除錯用
    // message是Buffer型別，要用message.toString()才能取得字串值
    console.log('input: ' + message.toString()); //message.toString()是 -m 後面的訊息

    if (message.toString() != 'LEAVE'){
      console.log('expected: ' + item);
      console.log('-----------------');
    }

    //if (…) …; // 如果message和item匹配，將匹配元素從陣列移出 (使用eventSeq.shift())
                // message是Buffer型別，要用message.toString()才能取得字串值
    if (message.toString() == item) {
        eventSeq.shift();
        if (eventSeq.length != 0){
          console.log('Seq ' + eventSeq);
        }
        else {
          console.log('Seq empty');
        }
        console.log('-----------------');
    }

    //if (…) { // 如果全部匹配
          // 送出LEAVE到EVENT topic並回復eventSeq的內容
    if (eventSeq.length == 0) {
        client.publish('EVENT', 'LEAVE');
        eventSeq = ['CO', 'CF', 'DO', 'DF'];
    }
});

