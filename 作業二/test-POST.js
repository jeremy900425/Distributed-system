const client = require('node-fetch');

(async () => {
    const hogRiderData = {
        name: "mary",
        age: 17,
        attack: 99,
        defense: 99
    };

    const resp = await client('http://localhost:3000/hogRider', {
        method: 'POST', // 設定請求方法為POST
        body: JSON.stringify(hogRiderData), // 將hogRiderData物件轉換為JSON字串作為請求體
        headers: { 'Content-Type': 'application/json' } // 設定Content-Type標頭來告知服務器請求體的格式
    });

    const data = await resp.json(); // 解析回應中的JSON資料
    console.log(data); // 輸出回應資料
})();
