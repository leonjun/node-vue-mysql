var models=require('../db')
var express=require('express')
var router=express.Router();
var mysql=require('mysql')
var $sql=require('../sqlMap')


var conn=mysql.createConnection(models.mysql);
conn.connect();

var jsonWrite=function(res,ret){
    if(typeof ret ==='undefined'){
        res.json({
            code:'1',
            msg:'操作失败'
        })
    }else{
        res.json(ret)
    }
}

router.post('/addUser',(request,response)=>{
    var sql=$sql.user.add;//sql语句
    let params=request.body;
    console.log(params)
    if(params.name==""||params.password==""){
        response.status(500).send("账号或密码不能为空")
        return
    }
    conn.query(sql,[params.name,params.password],(err,result)=>{
        if(err){
            if(err.sqlState==23000){
                response.status(500).send("账号已存在");
            }
            
            
        }
        if(result){
            var ss={
                statusText:"成功",
                status:200
            }        
            jsonWrite(response,ss);           
        }
    })   
})
router.post('/queryUser',(request,response)=>{
    var sql=$sql.user.query;//sql语句
    let params=request.body;
    if(params.name!=""){
        sql+=` where name = '${params.name}'`
       
    }
    conn.query(sql,(err,result)=>{
        if(err){
            return    
        }
        if(result && result==""){
            response.json({"BK_STATUS":"01","msg":"无此用户"})     
            //jsonWrite(response,result);           
        }
        if(result && result!=""){
            sql+=` and password = '${params.password}'`;
            conn.query(sql,(err,result)=>{
                if(err){
                    return
                }if(result){
                    response.json({"ttt":"1111"})
                    // jsonWrite(response,result); 
                }
                
            })
        }
    })   
})
module.exports=router;