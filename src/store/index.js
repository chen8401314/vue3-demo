import {createStore} from "vuex";
import {getUserInfo} from "../common/api/userApi.js";

export default createStore({
    namespaced: true,
    state: {
        userInfo:{},
    },
    getters: {},
    actions: {
        async getUserInfo(content) {
            let data = await getUserInfo();
            if (data == null) {

            }else{
                content.commit('changeUserInfo',data);
            }
        }
    },
    mutations: {
        changeUserInfo(state, value) {
            state.userInfo = value
        }

    }
})
