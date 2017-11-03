const connection = require('./connection');
const async = require('async');

async.waterfall([
    function (callback) {
        connection.query(
            `CREATE TABLE Admin (
                name varchar(30),
                email varchar(30),
                pw varchar(30),
                PRIMARY KEY(email)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query(
            `create table Hospital (
	            hID	       varchar(30),
                name      varchar(30),
                location   varchar(30),
                primary key (hID)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    },
    function (callback) {
        connection.query( // TODO: add the hospital table and add foreign key constraint here
            `CREATE TABLE Recruiter (
                name varchar(30),
                email varchar(30),
                pw varchar(30),
                hID char(6) NOT NULL,
                PRIMARY KEY(email),
                foreign key (hID) references Hospital(hID)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    }

], function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Tables have been created');
    require('./seed-db.js')();
});