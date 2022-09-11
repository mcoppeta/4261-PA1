const bodyParser = require('body-parser');
const express = require('express');
const { url } = require('inspector');
const app = express();
app.use(express.static('public'));

var urlencodedParser = bodyParser.urlencoded({ extended: false })

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get("/", function(req, res) {
    res.send("<h1>This is the Entry Point</h1>")
});

app.get("/db", async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM test_table');
        const results = {'results': (result) ? result.rows : null};
        res.send(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})

//app.use(express.json());

app.post('/user', urlencodedParser, async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`INSERT INTO users (username, password, notifications) VALUES (${req.body.username}, ${req.body.password}, ${req.body.notifications})`)
        res.send(result)
    } catch (err) {
        console.error(err)
        res.send("Error " + err)
    }
});

app.post('/user/login', urlencodedParser, async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT password FROM users WHERE username=${req.body.username}`)
        const expected = result.rows[0]['password'] || null;

        if (!expected) {
            let ret = {'status': 'User not found'};
            res.json(ret);
        }

        if (req.body.password == expected) {
            let ret = {'status': 'Success'}
            res.json(ret);
        } else {
            let ret = {'status': 'Incorrect username or password'};
            res.json(ret);
        }
    } catch (err) {
        res.send("Error " + err)
    }
});

app.listen(process.env.PORT || 3000, //necessary for deployment
    () => {
        console.log("Started Server");
    });