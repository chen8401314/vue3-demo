import {createStore} from "vuex";
import {getUserInfo} from "../common/api/userApi.js";
import router from "@/router";

export default createStore({
    namespaced: true,
    state: {
        userInfo:{},
    },
    getters: {},
    actions: {
        async getUserInfo(content) {
            try {
                let data = await getUserInfo();
                if (data == null) {

                }else{
                    content.commit('changeUserInfo',data);
                }
            } catch (error) {
                router.push({
                    name: 'Login'
                })
                throw error;
            }
        }
    },
    mutations: {
        changeUserInfo(state, value) {
            state.userInfo = value
        }

    }
})
