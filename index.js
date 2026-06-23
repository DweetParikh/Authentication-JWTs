const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "itslit";
const app = express();

app.use(express.json());

const users = [];

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if(users.find(u => u.username === username)) {
        res.json({
            message: "User Already Exists"
        });
        return;
    }

    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "You are Signed In"
    });
    console.log(users);
});

app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(foundUser => foundUser.username === username);

    if(!foundUser) {
        res.json({
            message: "User Not Found"
        });
    } else {
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        res.json({
            token: token
        });
    }
});

app.get("/me", function(req, res){
    const token = req.headers.token;
    const decodedUser = jwt.verify(token, JWT_SECRET);
    const foundUser = users.find(foundUser => foundUser.username === decodedUser.username);

    if(foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        });
    } else {
        res.statusCode(403).send({
            message: "Invalid Token"
        });
    }
});

app.listen(3000);
