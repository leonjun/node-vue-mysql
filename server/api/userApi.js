var models=require('../db')
var express=require('express')
var router=express.Router();
var mysql=require('mysql')
var $sql=require('../sqlMap')
var multer =require("multer")
var upload=multer({dest:'uploads/'})
var path=require('path');
const fs=require('fs');

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

            
function formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    // var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    // var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    // var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD;
}
var imgsrc;
router.post('/img',upload.single('file'),(req,res)=>{
    
    //res.send("11111")
    
    
    var name=Date.now()+parseInt(Math.random()*999)+'.'+req.file.mimetype.split('/')[1];
    fs.readFile(req.file.path,(err,data)=>{
        if(err){
            res.send("失败");
            return;
        }
        fs.writeFile(path.join(__dirname,'../static/img/'+name),data,(err)=>{
            if(err){
                res.status(500).send({data:err,msg:"失败了"});
                
                return;
            }else{
                imgsrc="/img/"+name;
               
                res.send({msg:"success",data:'/img/'+name})
            }
            
        })
    })
})
router.post('/addUser',(request,response)=>{
    var sql=$sql.user.add;//sql语句
    let params=request.body;
    let dt= new Date().getTime()
    params.add_dt = formatDate(dt);
    if(!params.name||!params.password){
        response.status(500).send("账号或密码不能为空")
        return
    }
    var sql2=$sql.user.query;
    sql2+=` and a.name = '${params.name}'`;
    
    conn.query(sql2,(err,result)=>{   
                    if(err){  
                         response.status(500).send(err);
                               
                       return;                
                    }
                    if(result!=""){
                        response.json({"BK_STATUS":"01","msg":"用户已存在"})
                        return; 
                    }
                    if(result ==""){
                        
                        if(!params.level){
                            params.level=3
                        }
                        conn.query(sql,[params.name,params.password,params.add_dt,params.level,params.sex,params.phone,params.email,imgsrc,params.address],(err,result)=>{
                            if(err){
                                
                                response.status(500).send(err);
                                                 
                            }
                            if(result){
                                response.json({"BK_STATUS":"00","msg":"成功"})          
                            }
                        }) 
                    }
    })     
})
//登录
router.post('/login',(request,response)=>{
    var sql=$sql.user.query;//sql语句
    let params=request.body;
    
    if(params.name!=""){
        sql+=` and a.name = '${params.name}'`;
        conn.query(sql,(err,result)=>{
            if(err){
                return response.status(500).send(err)   
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
                    }if(result && result==""){
                        response.json({"BK_STATUS":"02","msg":"密码错误"})
                        //jsonWrite(response,result); 
                    }if(result && result!=""){
                        
                        response.json({"BK_STATUS":"00","msg":"成功",data:result})
                        
                        //jsonWrite(response,result);
                    }
                    
                })
            }
        })     
    }
    
   
})
// router.post('/queryList',(request,response)=>{
//     var sql=$sql.user.query;//sql语句   
//         conn.query(sql,(err,result)=>{
            
//             if(err){          
//                return;                
//             }
//             if(result){
//                 console.log(result)
//                 response.json({"data":result})
//                 //jsonWrite(response.result)
//             }
//         })
    
// })
router.post('/userListPage',(request,response)=>{
    let sql=$sql.user.query;
    let params=request.body;
    if(params.name!=""){
        sql+= ' and a.name like ' +`'%${params.name}%'`;
        console.log(sql)
    }
    
    conn.query(sql,(err,result)=>{
            
        if(err){
            response.send(err)          
           return;                
        }
        if(result){
            let _Users=result;
            //let params=request.body;
            let {page, pagesize} = params
            // let userLists = _Users.filter(user => {
            //     if (name && user.name.indexOf(name) == -1) return false;
            //     return true;
            // });
            let total = result.length;
            result = result.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
            response.json({"BK_STATUS":"00","msg":"成功","total":total,data:result})
        }
    })
})
router.post('/update',(request,response)=>{
    let sql =$sql.user.update;
    let params=request.body;
    let dt= new Date().getTime()
    params.last_md_dt = formatDate(dt);
    if(params.id!=""){
        
        conn.query(sql,[params.name,params.password,params.email,params.phone,params.sex,params.address,params.last_md_dt,params.imgsrc,params.level,params.id],(err,result)=>{
            if(err){
                response.send(err)
                return;
            }
            if(result){
                response.json({"BK_STATUS":"00","msg":"成功"})
            }
        })

    }else{
        response.status(500).send('id为空')
    }
})
router.post('/delete',(request,response)=>{
    let sql =$sql.user.delete;
    let params=request.body;
    
    if(params.id!=""){
        conn.query(sql,[params.id],(err,result)=>{
            if(err){
                response.send(err)
                return;
            }
            if(result){
                response.json({"BK_STATUS":"00","msg":"成功"})
            }
        })

    }else{
        response.status(500).send('id为空')
    }
})
//批量删除
router.post('/batchDelete',(request,response)=>{
    let sql =$sql.user.batchDelete;
    let params=request.body.ids;
    //console.log(params.length)
    if(params.length>0){
        var flag=true;
        for(let i=0;i<params.length;i++){
            conn.query(sql,params[i],(err,result)=>{
                if(err){
                    flag=false;
                    return;
                }
                // if(result){
                //     response.json({"BK_STATUS":"00","msg":"成功"})
                // }
            })
        }
        if(!flag){
            response.json({"BK_STATUS":"01","msg":"失败"});
            return;
        }
        response.json({"BK_STATUS":"00","msg":"成功"})
        

    }else{
        response.status(500).send('id为空')
    }
})
//富文本添加
router.post('/addUditor',(request,response)=>{
    let sql= $sql.user.addUditor;
    let params = request.body;
    let dt= new Date().getTime()
    params.fdate = formatDate(dt);
    if(params.title=="" || params.container==""){
        response.status(500).send("标题或者内容不能为空");
        return;
    }
    
    conn.query(sql,[params.title,params.container,params.fdate],(err,result)=>{
        if(err){
            
            response.status(500).send(err);
                             
        }
        if(result){
            response.json({"BK_STATUS":"00","msg":"成功"})          
        }
    }) 
})
//富文本查询
router.post('/queryUditor',(request,response)=>{
    let sql= $sql.user.queryUditor;
    conn.query(sql,(err,result)=>{
            
        if(err){
            response.send(err)          
           return;                
        }
        if(result){
            
            let params=request.body;
            let {page, pagesize} = params
             
             let total = result.length;
             result = result.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
             response.json({"BK_STATUS":"00","msg":"成功","total":total,data:result})
            //response.json({"BK_STATUS":"00","msg":"成功",data:result})
        }
    })
})
//删除富文本
router.post('/deletefwb',(request,response)=>{
    let sql =$sql.user.deletefwb;
    let params=request.body;
    
    if(params.id!=""){
        conn.query(sql,[params.id],(err,result)=>{
            if(err){
                response.send(err)
                return;
            }
            if(result){
                response.json({"BK_STATUS":"00","msg":"成功"})
            }
        })

    }else{
        response.status(500).send('id为空')
    }
})
//编辑富文本
router.post('/updatefwb',(request,response)=>{
    let sql =$sql.user.updatefwb;
    let params=request.body;
    let dt= new Date().getTime()
    params.fdate = formatDate(dt);
    if(params.id!=""){
        if(params.container==""){
            response.json({"BK_STATUS":"01","msg":"内容为空"});
            return;
        }
        conn.query(sql,[params.id,params.title,params.container,params.fdate],(err,result)=>{
            if(err){
                response.send(err)
                return;
            }
            if(result){
                response.json({"BK_STATUS":"00","msg":"成功"})
            }
        })

    }else{
        response.status(500).send('id为空')
    }
})
module.exports=router;