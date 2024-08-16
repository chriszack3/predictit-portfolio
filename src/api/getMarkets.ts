import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import mysql from 'mysql';

const con = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `password`,
  database: `information_schema`,
});

con.connect(function (err) {
  if (err) throw err;
  console.log(`Connected!`);
});

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  const sql = `SELECT * FROM TABLES WHERE TABLE_SCHEMA = 'predictItDB'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}
