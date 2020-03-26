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
        },
        addOpenVehicle(state, payload) {
            const vehicle = payload;
            state.open.push(vehicle);
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
                return true;
            } catch (err) {
                alert('Ocorreu um erro ao buscar os veículos, tente novamente.');
                return false;
            }
        },
        async addVehicle(context, payload) {
            let vehicle = payload;
            const user = context.rootGetters.currentUser;
            vehicle.created_by = parseInt(user.id);
            try {
                const response = await Vue.axios.post('/', {
                    query: `
                        mutation ($vehicle: VehicleInput) {
                            vehicle: saveVehicle(vehicle: $vehicle) {
                                id
                                name
                                date
                                hour
                            }
                        }
                    `,
                    variables: {
                        vehicle
                    }
                });
                const newVehicle = response.data.data.vehicle;
                context.commit('addOpenVehicle', newVehicle);
                return true;
            } catch (err) {
                alert('Ocorreu um erro ao salvar, tente novamente.');
                return false;
            }
        }
    }
}