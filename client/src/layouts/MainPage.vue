<template>
    <v-app>
        <div class="header">
            <v-app-bar color="orange darken-1">
                <v-toolbar-title>{{ title }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-app-bar>
        </div>
        <v-content>
            <slot></slot>
        </v-content>
    </v-app>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Page name'
        }
    }
}
</script>