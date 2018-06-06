const express = require('express');
const db = require('./connection');

const router = express.Router();

router.get('/', async (req, res, next) => {
  let connection;
  try {
    // DBの接続を取得する
    connection = await db.getConnection();
    // 接続に対してクエリを発行する
    // see: https://github.com/sidorares/node-mysql2
    const [rows/* , fields */] = await connection.query('select id, name, price, image_url from items');
    // 戻り値をjsonとしてレスポンスを返す
    res.json(rows);
  } catch (err) {
    // console.log('*** catch ***'); クエリをエラーにしてコメントを外すと出力される
    next(err);
  } finally {
    // console.log('*** finally ***'); コメントを外すと処理の成否に関わらず出力される
    // DBの接続は閉じること
    if (connection) {
      connection.close();
    }
  }
});

module.exports = router;
