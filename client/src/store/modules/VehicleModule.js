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
        },
        removeOpenVehicle(state, payload) {
            const id = payload;
            state.open = state.open.filter(vehicle => vehicle.id !== id);
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
        },
        async deleteVehicle(context, payload) {
            const { id } = payload;
            const confirmed = await Vue.swal.fire({
                title: 'Tem certeza que deseja excluir este veículo?',
                text: 'Se você exclui-lo não será possível recuperar suas informações',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, tenho certeza'
            })

            if(!confirmed){ return false; }
            try {
                const response = await Vue.axios.post('/', {
                    query: `
                        mutation ($vehicleId: Int) {
                            removed: removeVehicle(vehicleId: $vehicleId)
                        }
                    `,
                    variables: {
                        vehicleId: id
                    }
                });
                const success = response.data.data.removed;
                if(success) {
                    context.commit('removeOpenVehicle', id);
                }
                return success;
            } catch (err) {
                alert('Ocorreu um erro ao deletar, tente novamente.');
                return false;
            }
        }
    }
}