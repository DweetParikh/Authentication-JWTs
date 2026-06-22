const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "itslit";
const app = express();

app.use(express.json());

const users = [];

app.post("/signup", function(req, res){

});

app.post("/signin", function(req, res){

});

app.get("/me", function(req, res){

});

app.listen(3000);
