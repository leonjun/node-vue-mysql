
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// var pool  = mysql.createPool({
//         host:'localhost',
//         port:'3306',
//         user:'root',
//         password:'123456',
//         database:'test'
//     });
module.exports={
    mysql:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456',
        database:'test'
    }
}

// function query(sql, callback) {
//         pool.getConnection(function (err, connection) {
//             // Use the connection
//             connection.query(sql, function (err, rows) {
//                 callback(err, rows);
//                 connection.release();//释放链接
//             });
//         });
//     }
//     exports.query = query;