const express = require('express');
const router = express.Router();
import ExcelJS from 'exceljs';
/* GET home page. */

/**
* test
* @param
*
* @return
*/
router.get('/test', async function(req: any, res: any) {
    try {
console.log("#test-start");
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
        worksheet.addRow({id: 1001, name: 'みかん', price: 270});
        worksheet.addRow({id: 1002, name: 'バナナ', price: 200});
        worksheet.addRow({id: 1003, name: 'りんご', price: 260});
        worksheet.addRow({id: 1004, name: 'トマト', price: 210});
        const uint8Array = await workbook.xlsx.writeBuffer();   
        //console.log(uint8Array);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename=test.xlsx'); // ファイル名を指定
        // バイナリデータをレスポンスとして送信
        res.send(uint8Array);
        console.log("#test2-end");
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
});

export default router;
