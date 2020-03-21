<template>
    <MainPage title="Veículos Avulsos">
        <v-container>
            <v-data-table
                :headers="headers"
                :items="cars"
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
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="newItem.name" label="Qual veículo entrou?"></v-text-field>
                                            </v-col>
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
        cars: [],
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

    methods: {
        initialize () {
            this.cars = [
                {name: 'Honda Branco', date: '20/03/2020', hour: '15:42'}
            ]
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

        add () {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0')
            let mm = String(today.getMonth() + 1).padStart(2, '0')
            let yyyy = today.getFullYear()
            let date = dd + '/' + mm + '/' + yyyy
            let hh = String(today.getHours()).padStart(2, '0')
            let ii = String(today.getMinutes()).padStart(2, '0')
            let hour = hh + ':' + ii

            this.newItem.date = date
            this.newItem.hour = hour

            this.cars.push(this.newItem);

            this.newItem = {}
            this.dialog = false
        }
    },
}
</script>