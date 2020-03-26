import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import VehicleModule from './modules/VehicleModule';

export default new Vuex.Store({
    state: {
        session: {
            url: 'http://localhost:4000',
            hash: localStorage.getItem('AuthToken') || ''
        },
        user: {
            id: localStorage.getItem('userId') || '',
            name: localStorage.getItem('userName') || ''
        }
    },
    mutations: {
        setUser(state, payload) {
            const { id, name } = payload;
            localStorage.setItem('userId', id);
            localStorage.setItem('userName', name);
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
    getters: {
        currentUser (state) {
            return state.user;
        }
    },
    modules: {
        vehicle: VehicleModule
    }
})
