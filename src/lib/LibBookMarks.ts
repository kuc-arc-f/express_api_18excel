import LibConfig from './LibConfig';
require('dotenv').config();
import LibPg from './LibPg';

const  LibBookMarks = {
  getItems :async function(req: any){
    try {
      const body = req.body;      
console.log(body.userId);
      const text = `
       SELECT * FROM public."BookMark"
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
      SELECT * FROM public."BookMark" where id = ${id}
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
  categoryBookMarks :async function(req: any){
    try {
//console.log(req);
      const body = req.body;      
      console.log(body.bmCategoryId);
      const text = `
       SELECT * FROM public."BookMark"
       where "bmCategoryId" = '${body.bmCategoryId}' 
       ORDER BY id DESC
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      return res.rows;
//console.log(items);
    } catch (err) {
      console.error(err);
      throw new Error('Error , categoryBookMarks');
    }          
  },  
  searchBookMarks :async function(req: any){
    try {
      const body = req.body;      
console.log(body);
//      console.log(body.bmCategoryId);
      const text = `
      SELECT * FROM public."BookMark"
      where  "userId" = '${body.userId}'
      and title like '%${body.seachKey}%'
      ORDER BY id DESC
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      return res.rows;
//console.log(items);
    } catch (err) {
      console.error(err);
      throw new Error('Error , searchBookMarks');
    }          
  },    
  addBookMark :async function(req: any){
    try {
//console.log(LibConfig.OK_CODE);
console.log(req.body);
      const body = req.body;
      const text = `
      INSERT INTO public."BookMark" (title, url, "bmCategoryId",
      "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, $3, $4, current_timestamp, current_timestamp) RETURNING *
      `;
      const values = [body.title, body.url, body.bmCategoryId, body.userId ]
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
      throw new Error('Error , addBookMark: '+ err);
    }    
  },
  updateBookMark :async function(req: any){
    try {
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      UPDATE public."BookMark" set title = $1,
      url = $2 ,
      "bmCategoryId" = $3,
      "updatedAt" = current_timestamp
      where id= $4
      RETURNING *
      `;
      const values = [body.title, body.url, body.bmCategoryId, body.id ]
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
      throw new Error('Error , updateBookMark: '+ err);
    }    
  },  
  deleteBookMark :async function(req: any){
    try {
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      delete FROM public."BookMark" where id=  $1
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
      throw new Error('Error , deleteBookMark: '+ err);
    }    
  },             
}
export default LibBookMarks;
