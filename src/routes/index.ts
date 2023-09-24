const express = require('express');
const router = express.Router();
require('dotenv').config();
const ExcelJS = require('exceljs');

/* GET home page. */
router.get('/test', function(req: any, res: any) {
  try {
//console.log(process.env.API_KEY);
    res.send({ name: "GET /test" });
  } catch (error) {
    res.sendStatus(500);
  }
});
/**
* test_excel
* @param
*
* @return
*/
router.get('/test_excel', async function(req: any, res: any) {
    try {
console.log("#test_excel-start");
        const workbook = new ExcelJS.Workbook();
        workbook.addWorksheet('My Sheet');
        const worksheet = workbook.getWorksheet('My Sheet');
        // 列を定義
        worksheet.columns = [
        { header: 'ID', key: 'id' },
        { header: '名称', key: 'name' },
        { header: '価格', key: 'price' },
        ];
        // 行を定義
        worksheet.addRow({id: 1001, name: 'みかん', price: 370});
        worksheet.addRow({id: 1002, name: 'バナナ', price: 200});
        worksheet.addRow({id: 1003, name: 'りんご', price: 260});
        worksheet.addRow({id: 1004, name: 'トマト', price: 210});
        const uint8Array = await workbook.xlsx.writeBuffer();   
//console.log(uint8Array);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=test.xlsx'); // ファイル名を指定
        // バイナリデータをレスポンスとして送信
        res.send(uint8Array);
        console.log("#test_excel-end");
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;
