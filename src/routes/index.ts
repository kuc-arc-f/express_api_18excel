const express = require('express');
const router = express.Router();
require('dotenv').config();
const ExcelJS = require('exceljs');
import LibTodo from '../lib/LibTodo';
import LibExcel from '../lib/LibExcel';
import axios from 'axios';

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
        //
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
/**
* test_excel
* @param
*
* @return
*/
router.get('/test_excel_2', async function(req: any, res: any) {
try {
console.log("#test_excel-start");
//console.log("EXCELL_TEMPLAE_PATH=", process.env.EXCELL_TEMPLAE_PATH);
//console.log(req.query);
    // get data
    const items = await LibExcel.getItems(req.query.userId);
//console.log(items);
    //get_template
    //@ts-ignore
    const tempPath: string = process.env.EXCELL_TEMPLAE_PATH;
    const response = await axios.get(tempPath, { responseType: "arraybuffer" });
    const data = new Uint8Array(response.data);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(data);
    //
    const worksheet = workbook.getWorksheet('My Sheet');
    worksheet.pageSetup = {orientation:'portrait'};
    const startRow = 2;
    let iCount = 0;
    let row = worksheet.getRow(1);
    for (const item of items) {
      let pos = startRow + iCount;
      row = worksheet.getRow(pos);
      console.log(item);
      row.getCell(1).value = item.id;
      row.getCell(2).value = item.title;
      row.getCell(3).value = item.content;
      iCount += 1;
    }         
    //
    const uint8Array = await workbook.xlsx.writeBuffer();   
//console.log(uint8Array);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=test_2.xlsx'); // ファイル名を指定
    // バイナリデータをレスポンスとして送信
    res.send(uint8Array);
    console.log("#test_excel-end");
} catch (error) {
    console.error("error, test_excel_2");
    res.sendStatus(500);
}
});
module.exports = router;
