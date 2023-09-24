import LibConfig from './LibConfig';
require('dotenv').config();
import LibPg from './LibPg';

const  LibBmCategory = {
  getItems :async function(req: any){
    try {
      const body = req.body;      
console.log(body.userId);
      const text = `
       SELECT * FROM public."BmCategory"
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
      SELECT * FROM public."BmCategory" where id = ${id}
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

  addBmCategory :async function(req: any){
    try {
//console.log(LibConfig.OK_CODE);
console.log(req.body);
      const body = req.body;
      const text = `
      INSERT INTO public."BmCategory" (name,
      "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, current_timestamp, current_timestamp) RETURNING *
      `;
      const values = [body.name, body.userId ]
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
      throw new Error('Error , BmCategory: '+ err);
    }    
  },
  updateBmCategory :async function(req: any){
    try {
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      UPDATE public."BmCategory" set name = $1,
      "updatedAt" = current_timestamp
      where id= $2
      RETURNING *
      `;
      const values = [body.name, body.id ]
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
      throw new Error('Error , updateBmCategory: '+ err);
    }    
  },  
  deleteBmCategory :async function(req: any){
    try {
      //console.log(LibConfig.OK_CODE);
      console.log(req.body);
      const body = req.body;
      const text = `
      delete FROM public."BmCategory" where id=  $1
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
      throw new Error('Error , deleteBmCategory: '+ err);
    }    
  },             
}
export default LibBmCategory;
