import mysql from 'mysql';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

const con = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `password`,
  database: `predictItDB`,
});

export default function getLastRecord(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  con.connect(function (err) {
    if (err) throw err;
    console.log(`Connected!`);
    // return last record from table
    const sql = `SELECT * FROM Biden_Resigns_2024`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      // console.log(result);
      for (let i = 0; i < result.length; i++) {
        result[i].scrapeResult = JSON.parse(result[i].scrapeResult);
      }
      res.send(result);
    });
  });
  // return res.send();
}
