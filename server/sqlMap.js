var sqlMap={
    user:{
        add:'insert into user(name,password,add_dt,level,sex,phone,email,imgsrc,address) values (?,?,?,?,?,?,?,?,?)',
        query:'select * from user a ,role b where a.level =b.level',
        delete:'delete from user where id = ?',
        update:'update user set name=?,password=?,email=?,phone=?,sex=?,address=?,last_md_dt=? ,imgsrc=?,level=? where id=?',
        batchDelete:'delete from user  where id=?',
        addUditor:'insert into editor(title,container) values(?,?)',
        queryUditor:'select * from editor',
        deletefwb:'delete from editor where id=?'
    }
}
module.exports=sqlMap