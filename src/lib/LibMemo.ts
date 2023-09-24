import LibConfig from './LibConfig';
require('dotenv').config();
import LibPg from './LibPg';

const  LibMemo = {
  getItems :async function(req: any){
    try {
      const body = req.body;      
console.log(body.userId);
      const text = `
       SELECT * FROM public."Memo"
       where "userId" = '${body.userId}' 
       ORDER BY id DESC
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
//      console.log(res.rows);
      return res.rows;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },    
  getItem :async function(id: number){
    try {
      const text = `
      SELECT * FROM public."Memo" where id = ${id}
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      const data = res.rows[0];
//      console.log(data);
      return data;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem:' +err);
    }          
  },
  addMemo :async function(req: any){
    try {
//console.log(LibConfig.OK_CODE);
console.log(req.body);
      const body = req.body;
      const text = `
      INSERT INTO public."Memo" (title, content, 
      "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, $3, current_timestamp, current_timestamp) RETURNING *
      `;
      const values = [body.title, body.content, body.userId ]
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , addMemo: '+ err);
    }    
  },
  searchMemos :async function(req: any){
    try {
      const body = req.body;      
console.log(body);
      const text = `
      SELECT * FROM public."Memo"
      where  "userId" = '${body.userId}'
      and title like '%${body.seachKey}%'
      ORDER BY id DESC
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
//console.log(text);
//console.log(res.rows);
      return res.rows;
    } catch (err) {
      console.error(err);
      throw new Error('Error , searchMemos');
    }          
  },  
  updateMemo :async function(req: any){
    try {
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      UPDATE public."Memo" set title = $1,
      content = $2 ,
      "updatedAt" = current_timestamp
      where id= $3
      RETURNING *
      `;
      const values = [body.title, body.content, body.id ]
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , Memo: '+ err);
    }    
  },  
  deleteMemo :async function(req: any){
    try {
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      delete FROM public."Memo" where id=  $1
      RETURNING *
      `;
      const values = [body.id ]
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: body 
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteMemo: '+ err);
    }    
  },             
}
export default LibMemo;
