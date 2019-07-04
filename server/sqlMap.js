var sqlMap={
    user:{
        add:'insert into user(name,password,add_dt,level) values (?,?,?,2)',
        query:'select * from user',
        delete:'delete from user where id = ?',
        update:'update user set name=?,password=?,email=?,phone=?,sex=?,address=?,last_md_dt=? where id=?',
        batchDelete:'delete from user  where name in (?)'
    }
}
module.exports=sqlMap