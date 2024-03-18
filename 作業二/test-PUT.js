const client = require('node-fetch');

(async () => {
    const hogRiderData = {
        name : "tom",
        age : 99,
        attack : 0,
        defense : 0
    };

    const resp = await client('http://localhost:3000/hogRider/tom', { // 修改這裡以包含hogRider名字
        method: 'PUT',
        body: JSON.stringify(hogRiderData), // 將hogRiderData物件轉換為JSON字串作為請求體
        headers: { 'Content-Type': 'application/json' } // 設定Content-Type標頭來告知服務器請求體的格式
    });

    const data = await resp.json(); // 解析回應中的JSON資料
    console.log(data); // 輸出回應資料
})();
