import LibConfig from './LibConfig';
require('dotenv').config();
import LibPg from './LibPg';

const  LibTodo = {
  /**
  *
  * @param
  *
  * @return
  */  
  getItems :async function(req: any){
    try {
      const body = req.body;      
console.log(body.userId);
      const text = `
       SELECT * FROM public."Todo"
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
      SELECT * FROM public."Todo" where id = ${id}
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
  addTodo :async function(req: any){
    try {
//console.log(LibConfig.OK_CODE);
console.log(req.body);
      const body = req.body;
      const text = `
      INSERT INTO public."Todo" (title, content, complete,
      "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, 0, $3, current_timestamp, current_timestamp) RETURNING *
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
      throw new Error('Error , addTodo: '+ err);
    }    
  },
  updateTodo :async function(req: any){
    try {
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      UPDATE public."Todo" set title = $1,
      content = $2 ,
      complete = $3,
      "updatedAt" = current_timestamp
      where id= $4
      RETURNING *
      `;
      const values = [body.title, body.content, body.complete, body.id ]
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
      throw new Error('Error , updateTodo: '+ err);
    }    
  },  
  updateComplete :async function(req: any){
    try {
      // updateCompleteTodo(id: Int!, complete: Int): Todo
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      UPDATE public."Todo" set complete = $1,
      "updatedAt" = current_timestamp
      where id= $2
      RETURNING *
      `;
      const values = [body.complete, body.id ]
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
      throw new Error('Error , updateComplete: '+ err);
    }    
  },  

  deleteTodo :async function(req: any){
    try {
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      delete FROM public."Todo" where id=  $1
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
      throw new Error('Error , deleteTodo: '+ err);
    }    
  },             
}
export default LibTodo;
