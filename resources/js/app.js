import Vue from "vue";
import routes from './router/index'
require('./bootstrap');



import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import CxltToastr from 'cxlt-vue2-toastr'

var toastrConfigs = {
    position: 'top right',
    showDuration: 2000
}
Vue.use(CxltToastr, toastrConfigs)


Vue.component('app-header', require('./components/Header.vue').default);


const app = new Vue({
    el: '#app',
    router: routes,
});
