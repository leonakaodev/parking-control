import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios/dist/axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        session: {
            hash: undefined
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
            state.session.hash = payload.hash;
        }
    },
    actions: {
        async login(context, payload) {
            const { user, password } = payload;
            if(!user || !password) return false;
            console.log(payload);
            const response = await axios({
                url: 'http://localhost:4000',
                method: 'post',
                data: {
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
                }
            });
            const currentUser = response.data.data.user;
            if(currentUser) {
                context.commit('setUser', currentUser);
                context.commit('setSession', currentUser);
                return true;
            } else {
                return false;
            }
        }
    },
})
