<template>
    <MainPage back hide-options :title="vehicle.name">
        <v-container class="viewSingleCar-container">
            <v-row>
                <v-col cols="6">
                    <h2>Informações de Entrada</h2>
                    <strong>Dia</strong>
                    <p>{{ vehicle.date }}</p>
                    <strong>Horário</strong>
                    <p>{{ vehicle.hour }}</p>
                </v-col>
                <v-col cols="6">
                    <h2>Valores</h2>
                    <strong>Tempo decorrido</strong>
                    <p>5 horas</p>
                    <strong class="big primary--text">Preço</strong>
                    <p class="big primary--text">R$ 4,50</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <strong>Observações</strong>
                    <v-textarea
                        solo
                        :value="vehicle.note"
                        no-resize
                        disabled
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" align="right">
                    <v-btn color="primary">
                        Finalizar
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </MainPage>
</template>

<script>
import MainPage from '../layouts/MainPage.vue';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            vehicle: {}
        }
    },
    components: {
        MainPage
    },
    props: {
        id: {
            required: true
        }
    },
    methods: {
        ...mapActions('vehicle', [
            'getVehicle'
        ])
    },
    async created() {
        this.vehicle = await this.getVehicle(parseInt(this.id));
    }
}
</script>

<style>

.viewSingleCar-container {
    font-size: 18px;
}

.viewSingleCar-container h2 {
    margin-bottom: 50px;
}

.viewSingleCar-container .big {
    font-size: xx-large;
}

</style>