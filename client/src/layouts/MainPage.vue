<template>
    <v-app id="teste">
        <v-app-bar color="orange darken-1" app>
            <v-btn v-if="back" text>
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            
            <v-spacer></v-spacer>
            <div v-if="!hideOptions">
                <v-btn text class="px-0 mr-5">
                    <v-icon>mdi-history</v-icon>
                </v-btn>
            </div>
            <v-menu offset-y transition="slide-y-transition">
                <template v-slot:activator="{ on }">
                    <div class="cursor-pointer">
                        <v-list-item-avatar class="mr-0" v-on="on">
                            <img src="https://randomuser.me/api/portraits/men/81.jpg">
                        </v-list-item-avatar>
                    </div>
                </template>
                <v-list dense>
                    <v-list-item @click="openSettings">
                        <v-list-item-icon> <v-icon>mdi-cog-outline</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Configurações</v-list-item-title></v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-icon> <v-icon>mdi-logout</v-icon> </v-list-item-icon>
                        <v-list-item-content> <v-list-item-title>Sair</v-list-item-title></v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-content app>
            <slot></slot>
        </v-content>
    </v-app>
</template>

<script>
export default {
    data: () => ({
    }),
    props: {
        title: {
            type: String,
            default: 'Page name'
        },
        back: {
            type: Boolean,
            default: false
        },
        hideOptions: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        openSettings(){
            console.log('Abrindo settings')
        },
        logout(){
            console.log('Fazendo logout')
        }
    }
}
</script>

<style>
#teste {
    height: 1000px;
}

.cursor-pointer>div{
    cursor: pointer;
}
</style>