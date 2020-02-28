import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export const eventTrain = new Vue();

new Vue({
  render: h => h(App)
}).$mount("#app");
