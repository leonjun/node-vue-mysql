
const userApi = require('./api/userApi');
const fs=require('fs');
const path=require('path')
const bodyParse=require('body-parser')
const express=require('express')
const app=express();
app.use(bodyParse.urlencoded({extended:true}))
app.use(bodyParse.json())

app.use('/api/user',userApi)

app.listen(3000)
console.log(123)