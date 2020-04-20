const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var cors = require('cors')
app.use(bodyParser.json());
const port = 8000;

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');

db.serialize(function() {
    db.run("CREATE TABLE TodoItems (name TEXT, completed BOOLEAN)");
   
    var stmt = db.prepare("INSERT INTO TodoItems VALUES (?, ?)");
    stmt.run("Make a full-stack project", false);
    
    stmt.finalize();
    db.each("SELECT rowid AS id, name, completed FROM TodoItems", function(err, row) {
        console.log(row.id + ": " + row.name + " => " + row.completed);
    });
});

app.options('*', cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/todos', (req, res) => {
    let rows = [];
    db.each("SELECT rowid AS id, name, completed FROM TodoItems", function(err, row) {
        rows.push(row);
    }, function () {
        res.json(rows);
    });
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))