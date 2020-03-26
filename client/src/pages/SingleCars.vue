<template>
    <MainPage title="Veículos Avulsos">
        <v-container>
            <v-data-table
                :headers="headers"
                :items="vehicles"
                sort-by="calories"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Avulsos</v-toolbar-title>
                        <v-divider
                        class="mx-4"
                        inset
                        vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">Novo veículo</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Adicionando veículo</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-text-field v-model="newItem.name" label="Qual veículo entrou?"></v-text-field>
                                        </v-row>
                                        <v-row>
                                            <v-textarea solo v-model="newItem.note" label="Observações"></v-textarea>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="primary" text @click="add">Adicionar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        class="mr-2"
                        @click="openItem(item)"
                    >
                        mdi-open-in-new
                    </v-icon>
                    <v-icon
                        class="mr-2"
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                   Nenhum veículo avulso encontrado
                </template>
            </v-data-table>
        </v-container>
    </MainPage>
</template>

<script>
import MainPage from '../layouts/MainPage.vue';
import { mapState, mapActions } from 'vuex';

export default {
    data: () => ({
        dialog: false,
        headers: [
            {
                text: 'Veículo',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Data', value: 'date' },
            { text: 'Hora', value: 'hour' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,

        newItem: {},
    }),

    components: {
        MainPage
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
    },

    created () {
        this.initialize()
    },

    computed: {
        ...mapState({
            vehicles: state => state.vehicle.open
        })
    },

    methods: {
        ...mapActions('vehicle', [
            'getVehicles',
            'addVehicle'
        ]),

        initialize () {
            this.getVehicles(false);
        },

        openItem (item) {
            this.editedIndex = this.cars.indexOf(item)
            this.newItem = Object.assign({}, item)
            this.dialog = true
        },

        async deleteItem (item) {
            const confirmed = this.$swal.fire({
                title: 'Tem certeza que deseja excluir este veículo?',
                text: 'Se você exclui-lo não será possível recuperar suas informações',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, tenho certeza'
            })

            if(confirmed){
                this.cars.splice(this.cars.indexOf(item), 1)
            }
        },

        close () {
            this.dialog = false
        },

        async add () {
            const success = await this.addVehicle({ name: this.newItem.name, note: this.newItem.note });
            if(success) {
                this.newItem = {};
                this.dialog = false;
            }
        }
    },
}
</script>