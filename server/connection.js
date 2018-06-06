const mysql = require('mysql2/promise');

const getConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'my_store'
  });
};

module.exports = {
  getConnection
};
