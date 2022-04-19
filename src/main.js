import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
// import BootstrapVue from "bootstrap-vue"

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
