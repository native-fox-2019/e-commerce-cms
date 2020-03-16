const express=require('express');
const app=express();
const route=require('./route');
const cors=require('cors');

app.use(express.json())
app.use(cors());

app.use(route);

module.exports=app;

