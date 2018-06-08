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

router.post('/', async (req, res, next) => {
  let connection;
  const { name, price, imageUrl } = req.body;

  try {
    connection = await db.getConnection();

    const queryInsert = 'INSERT INTO items (name, price, image_url) VALUES (?, ?, ?)';
    const [result] = await connection.query(queryInsert, [name, price, imageUrl]);

    res.json(result.insertId);
  } catch (err) {
    next(err);
  } finally {
    if (connection) {
      connection.close();
    }
  }
});

module.exports = router;
