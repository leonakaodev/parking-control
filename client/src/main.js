import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    router,
    created() {
        Vue.axios.defaults.baseURL = this.$store.state.session.url;
        Vue.axios.defaults.headers.common['Authorization'] = this.$store.state.session.hash;
    },
    render: h => h(App)
}).$mount('#app')
