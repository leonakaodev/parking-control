<template>
    <MainPage hide-options title="Calculadora">
        <v-container class="calculator-container">
            <v-row>
                <v-col cols="12" sm="6">
                    <strong class="big">Total à pagar:</strong>
                    <p class="big" v-html="$formatNumber(value, { style: 'currency', currency: 'BRL' })"></p>
                    <strong>Tempo decorrido:</strong>
                    <p v-html="$formatTime(date, {format: 'short'}).replace(':', 'h')"></p>
                </v-col>
                <v-col cols="12" sm="6">
                    <strong class="big">Valor pago:</strong>
                    <v-text-field
                        solo
                        single-line
                        clearable
                        v-model="paidOut"
                    ></v-text-field>
                    <strong>Troco:</strong>
                    <p v-html="$formatNumber(change, { style: 'currency', currency: 'BRL' })">R$ 0,00</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" align="right">
                    <v-btn color="primary" @click="close">
                        Fechar
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </MainPage>
</template>

<script>
import MainPage from '../layouts/MainPage.vue';

export default {
    data(){
        return {
            paidOut: 0,
            date: Date('now')
        }
    },
    components: {
        MainPage
    },
    props: {
        value: {
            type: Number,
            default: 10
        }
    },
    computed: {
        change() {
            return this.paidOut - this.value;
        }
    },
    methods: {
        close(){
            this.$router.push('/single-cars');
        }
    }
}
</script>

<style>
.calculator-container {
    font-size: 20px;
}

.calculator-container .big {
    font-size: xx-large;
}

.calculator-container .v-input {
    font-size: xx-large;
    width: 50%;
}

</style>