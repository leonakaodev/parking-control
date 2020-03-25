import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        session: {
            url: 'http://localhost:4000',
            hash: localStorage.getItem('AuthToken') || ''
        },
        user: {
            id: undefined,
            name: undefined
        }
    },
    mutations: {
        setUser(state, payload) {
            const { id, name } = payload;
            state.user = { id, name };
        },
        setSession(state, payload) {
            const { hash } = payload;
            state.session.hash = hash;
            Vue.axios.defaults.headers.common['Authorization'] = hash;
            localStorage.setItem('AuthToken', hash);
        },
    },
    actions: {
        async login(context, payload) {
            const { user, password } = payload;
            if(!user || !password) return false;
            const response = await Vue.axios.post('/', {
                query: `
                    mutation ($user: String, $password: String) {
                        user: login(user: $user, password: $password) {
                            id,
                            name,
                            hash
                        }
                    }
                `,
                variables: {
                    user,
                    password
                }
            });
            const currentUser = response.data.data.user;
            if(currentUser) {
                context.commit('setUser', currentUser);
                context.commit('setSession', currentUser);
                return true;
            } else {
                context.commit('setUser', { id: undefined, name: undefined});
                context.commit('setSession', { hash: '' });
                return false;
            }
        }
    },
})
