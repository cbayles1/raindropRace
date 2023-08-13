const {createPool} = require('mysql');

const dbPool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'wHm&hxWBDPoZ@1$k',
    database: 'raindropDB',
    connectionLimit: 10
});

dbPool.query(`SHOW TABLES`, (err, res) => {
    console.log(res);
});