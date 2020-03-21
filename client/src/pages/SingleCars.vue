<template>
    <MainPage title="Carros Avulsos">
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
                                <v-btn color="primary" dark class="mb-2" v-on="on">Novo avulso</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Adicionando avulso</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="openItem(item)"
                    >
                        mdi-open-in-new
                    </v-icon>
                    <v-icon
                        small
                        class="mr-2"
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:no-data>
                   Nenhum avulso encontrado
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
                text: 'Carro',
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

        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),

    components: {
        MainPage
    },

    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
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
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.$swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
            console.log(item);
            // this.cars.splice(this.cars.indexOf(item), 1)
        },

        close () {
            this.dialog = false
        },
    },
}
</script>