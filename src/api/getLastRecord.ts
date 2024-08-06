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
    const sql = `SELECT * FROM VP_Nomination_2024 ORDER BY id DESC LIMIT 1`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
  // return res.send();
}
