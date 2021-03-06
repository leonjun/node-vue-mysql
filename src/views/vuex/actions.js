import * as type from "./mutations_type";
export default {
    addTodo({commit},todotext){
        commit(type.ADDTODO,todotext);
    },
    selectType({commit},typetext){
        commit(type.SELECT_TYPE,typetext);
    },
    doneTodo({commit},id){
        commit(type.DONETODO,id);
    },
    changeImg({commit},imgsrc){
        commit(type.IMGSRC,imgsrc);
    },
    setImg({commit},imgsrc){
        commit(type.IMGSRC,imgsrc);
    },
    setUserInfo({commit},userInfo){
        commit(type.USERINFO,userInfo);
    }

}