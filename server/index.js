
const userApi = require('./api/userApi');
const fs=require('fs');
const path=require('path')
const bodyParse=require('body-parser')
const express=require('express')
const app=express();
const cors=require('cors');
app.use(cors())
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())
app.use(express.static(path.join(__dirname,"./static")))

app.use('/api/user',userApi)

app.listen(1234)
console.log(123)