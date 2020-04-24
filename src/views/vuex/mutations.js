import * as type from "./mutations_type";
export default {
    [type.ADDTODO](state,text){
        let todoinfo={};
        todoinfo.text=text;
        todoinfo.isDone=false;
        todoinfo.isEdit=false;
        todoinfo.id=state.todoInfos.length;
        state.todoInfos.push(todoinfo)
    },
    [type.SELECT_TYPE](state,typetext){
        state.selects=typetext;
    },
    [type.DONETODO](state,id){
        state.todoInfos.map((item) =>{
            if(item.id==id){
                item.isDone=true;
            }
        })
    },
    [type.IMGSRC](state,imgsrc){
        state.imgsrc=imgsrc;
        
    },
    [type.USERINFO](state,userInfo){
        state.userInfo=userInfo;
        
    }
}