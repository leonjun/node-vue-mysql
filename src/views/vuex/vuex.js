import actions from "./actions";
import mutations from "./mutations";
export default {
    state:{
        todoInfos:[],
        selects:"1"
    },
    actions:actions,
    mutations:mutations,
    getters:{
        getDoneLists:function(state){
            let list = state.todoInfos.filter((item =>{
                if(item.isDone){
                    return item;
                }
            }))
            return list;
        },
        getNoDoneLists:function(state){
            let list = state.todoInfos.filter((item =>{
                if(!item.isDone){
                    return item;
                }
            }))
            return list;
        }
    }
}