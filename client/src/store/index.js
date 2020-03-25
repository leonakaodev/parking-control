import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        session: {
            hash: undefined
        },
        user: {
            logged: false,
            id: undefined,
            name: undefined
        }
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})
