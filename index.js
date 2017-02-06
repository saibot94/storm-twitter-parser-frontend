var express = require("express");

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    database: 'tweetdb'
});

connection.connect((err) => {
    if(err){
        console.log("error connecting to db...");
    } else {
        console.log("connected to db successfully...");
    }
});

var app = express();


app.use(express.static("ui"));

app.get('/', (req,resp) => {
    resp.sendFile("index.html");
})


app.get('/api/tweets', (req, resp) => {
    connection.query("select * from tweets", (err, rows, fields) => {
        if(err) {
            console.log("error selecting data...");
            resp.json({error: err.message});
        } else {
            resp.json(rows);
        }
    });
});


app.listen(3000);
console.log("Listening on port 3000!");