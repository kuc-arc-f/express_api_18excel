import LibConfig from './LibConfig';
require('dotenv').config();
//const pg = require("pg");
import LibPg from './LibPg';

const  LibTask = {
  getItems :async function(){
    try {
      const text = `
       SELECT * FROM public."Task" ORDER BY id DESC LIMIT 100
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
//console.log(res.rows);
      return res.rows;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },    
  getItem :async function(id: number){
    try {
      const text = `
      SELECT * FROM public."Task" where id = ${id}
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
  addTask :async function(req: any){
    try {
//console.log(LibConfig.OK_CODE);
console.log(req.body);
      const body = req.body;
      const text = `
      INSERT INTO public."Task" (title, content, "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, 0, current_timestamp, current_timestamp) RETURNING *
      `;      
      const values = [body.title, body.content ]
//console.log(text);
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
//      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTask: '+ err);
    }    
  },
  updateTask :async function(args: any){
  },  
  deleteTask :async function(args: any){
  },             
}
export default LibTask;
