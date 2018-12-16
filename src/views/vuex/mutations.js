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
    }
}