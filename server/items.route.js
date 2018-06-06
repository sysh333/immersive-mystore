const express = require('express');
const db = require('./connection');

const router = express.Router();

router.get('/', async (req, res, next) => {
  // DBの接続を取得する
  // 接続に対してクエリを発行する
  // 戻り値をjsonとしてレスポンスを返す
  // DBの接続は閉じること
  res.send('/api/items called');
});

module.exports = router;
