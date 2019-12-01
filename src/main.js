import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "fullcalendar/dist/fullcalendar.min.css";
import "vue-datetime/dist/vue-datetime.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus);
library.add(faTrashAlt);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import FullCalendar from "vue-full-calendar";
import Datetime from "vue-datetime";
import VModal from "vue-js-modal";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(FullCalendar);
Vue.use(Datetime);
Vue.use(VModal);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
