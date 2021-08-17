const express = require('express');
const app = express();
const path = require('path');
var url = require('url');
var mysql = require('mysql');
const port = process.env.PORT || 3000

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "codesmashers",
    table: "contactinfo"
});

// con.connect(function(err) {
    //   if (err) throw err;
    //   console.log("Connected to database!");
    // });
    
app.use(express.urlencoded());
    
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/about.html');
});

app.get('/blog', function (req, res) {
    res.sendFile(__dirname + '/blog.html');
});

app.get('/contact', function (req, res) {
    res.sendFile(__dirname + '/contact.html');
});

app.post('/contact', function (req, res) {
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var subject = req.body.subject;
    var message = req.body.message;
    res.write('You sent the Fname "' + req.body.Fname + '".\n');
    res.write('You sent the Lname "' + req.body.Lname + '".\n');
    res.write('You sent the subject "' + req.body.subject + '".\n');
    res.write('You sent the message "' + req.body.message + '".\n');

    con.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Connected to database!");
        var sql = "INSERT INTO `contactinfo` (Fname, Lname, subject, message) VALUES ('"+Fname+"', '"+Lname+"','"+subject+"','"+message+"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Data Inserted Successfully!");
            res.end();
        })
    });


})


app.use(express.static(__dirname));

app.listen(port, () => {
    console.log("Application started listening at port 3000");
});