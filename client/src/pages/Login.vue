<template>
    <BlankPage>
        <v-container id="login" fill-height fluid>
            <v-row align="center" justify="center">
                <v-col cols="12">
                    <v-row justify="center" class="text-center">
                        <h1 class="huge">Estacionamento 7 de Setembro</h1>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row justify="center" class="text-center">
                        <h1>Bem vindo, faça login para continuar</h1>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row justify="center">
                        <v-card
                            class="ma-3 pa-6"
                            outlined
                            tile
                        >
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="user"
                                                label="Usuário / E-mail"
                                                required
                                                color="orange darken-1"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="password"
                                                type="password"
                                                label="Senha"
                                                required
                                                color="orange darken-1"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-btn
                                                :block="true"
                                                :rounded="true"
                                                color="orange darken-1"
                                                @click="login"
                                                :loading="loading"
                                            >
                                                Entrar
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-card>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </BlankPage>
</template>

<script>
import BlankPage from '../layouts/BlankPage.vue';
// import { mapActions } from 'vuex';

export default {
    data() {
        return {
            user: 'user',
            password: 'pass123',
            loading: false,
        }
    },
    components: {
        BlankPage
    },
    methods: {
        async login() {
            this.loading = true;
            const result = await this.$store.dispatch('login', { user: this.user, password: this.password });
            if(result) {
                this.$router.push('/dashboard');
            }
            this.loading = false;
        }
    },
}
</script>

<style>
#login {
    height: 100%;
    background-image: url('../assets/images/login-bg.jpg');
    background-repeat: no-repeat, repeat;
    background-position: center;
    background-size: cover;
}

#login h1,h2 {
    color: white;
}

#login .huge {
    font-size: 3.5em;
}
</style>