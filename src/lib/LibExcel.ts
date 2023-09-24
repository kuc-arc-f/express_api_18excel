import LibConfig from './LibConfig';
require('dotenv').config();
import LibPg from './LibPg';

const  LibExcel = {
  /**
  *
  * @param
  *
  * @return
  */  
  getItems :async function(userId: string)
  {
    try {
      const text = `
       SELECT * FROM public."Todo"
       where "userId" = '${userId}' 
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
}
export default LibExcel;
