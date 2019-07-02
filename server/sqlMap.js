var sqlMap={
    user:{
        add:'insert into user(name,password) values (?,?)',
        query:'select * from user'
    }
}
module.exports=sqlMap