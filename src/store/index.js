import {createStore} from "vuex";
import {getUserInfo} from "../common/api.js";

export default createStore({
    namespaced: true,
    state: {
        userInfo:{},
    },
    getters: {},
    actions: {
        async getUserInfo(content) {
            let data = await getUserInfo();
            content.commit('changeUserInfo',data);
        }
    },
    mutations: {
        changeUserInfo(state, value) {
            state.userInfo = value
        }

    }
})
