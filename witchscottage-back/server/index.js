const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const express = require("express");
const app = express();
const mysql = require("mysql2");
const { body, validationResult } = require('express-validator');

const generateAccessToken = require("./generateAccessToken");
const generateRefreshToken = require("./generateRefreshToken");

// Validation
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;

let refreshTokens = [];

const db = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,      // localhost
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});

app.use(express.json());
app.use(cors());
// middleware to read req.body <param>




// CREATE USER
app.post("/register", 

    // Data validation
    body('username').isLength({min: 5, max: 20}),
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 50 }),

    async(req, res) => {

    const errors = validationResult(req);

    // Failed validation
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const email = req.body.email;
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    db.getConnection( async(err, connection) => {
        if(err) throw (err)

        const sqlSearch = "SELECT * FROM user WHERE email = ?";
        const search_query = mysql.format(sqlSearch, [email]);

        const sqlInsert = "INSERT INTO user VALUES (?, ?, ?)";
        const insert_query = mysql.format(sqlInsert, [email, username, hashedPassword]);

        await connection.query(search_query, async(err, result) => {
            if(err) throw(err)
            // Search Results
            console.log(result.length);

            if(result.length != 0) {
                connection.release();
                // User already exists
                res.sendStatus(409);
            } else {
                await connection.query(insert_query, (err, result) => {
                    connection.release();

                    if(err) throw (err)
                    // Created new user
                    res.sendStatus(201);
                })
            }
        })
    })
});

app.post("/refreshToken", (req, res) => {
    if(!refreshTokens.includes(req.body.token))
        res.status(400).send({message: "Refresh Token Invalid", err: refreshTokens});
    
        refreshTokens = refreshTokens.filter((c) => c != req.body.token);
        
        const accessToken = generateAccessToken({email: req.body.email});
        const refreshToken = generateRefreshToken({email: req.body.email});
        refreshTokens.push(refreshToken);

        res.json({accessToken: accessToken, refreshToken: refreshToken});
})

app.delete("/logout", (req, res) => {
    refreshTokents = refreshTokens.filter((c) => c != req.body.token);

    res.status(204).send("Logged out!");
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.getConnection( async(err, connection) => {
        if(err) throw (err)
        const sqlSearch = "Select * FROM user WHERE email = ?";
        const search_query = mysql.format(sqlSearch, [email]);

        await connection.query(search_query, async(err, result) => {
            connection.release();

            if(err) throw (err)

            if(result.length == 0) {
                // User does not exists
                res.sendStatus(404);
            } else {
                const hashedPassword = result[0].password;

                if(await bcrypt.compare(password, hashedPassword).catch(err => {console.log(err)})) {
                    // Login Successful
                    // Generating accessToken
                    const accessToken = generateAccessToken({email: email});
                    const refreshToken = generateRefreshToken({user: req.body.email});
                    refreshTokens.push(refreshToken);

                    res.json({accessToken: accessToken, refreshToken: refreshToken, tokens: refreshTokens, username: result[0].username }).catch(err => {console.log(err)});

                } else {
                    // Incorrect Password
                    res.status(401).send("Password Incorrect").catch(err=>console.log(err));
                }
            }
        })
    })
})

db.getConnection((err, connection) => {
    if(err) throw (err)
    console.log("DB connected successful: " + connection.threadId);
});

const port = process.env.PORT;

app.listen(port,
    () => console.log(`Server Started on port ${port}...`));