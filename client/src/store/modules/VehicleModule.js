import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        finished: [],
        open: []
    },
    mutations: {
        setList(state, payload) {
            const { data, list } = payload;
            state[list] = data;
        }
    },
    actions: {
        async getVehicles(context, payload) {
            const finished = payload;
            try {
                const response = await Vue.axios.post('/', {
                    query: `
                        query ($finished: Boolean) {
                            vehicles(finished: $finished) {
                                id
                                name
                                date
                                hour
                            }
                        }
                    `,
                    variables: {
                        finished
                    }
                });
                const vehicles = response.data.data.vehicles;
                context.commit('setList', {
                    list: finished ? 'finished' : 'open',
                    data: vehicles
                });
            } catch (err) {
                alert('Ocorreu um erro ao buscar os veículos, tente novamente.');
            }
        },
    }
}