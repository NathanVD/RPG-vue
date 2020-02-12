import Vue from "vue";
import App from "./App.vue";
export const eventTrain = new Vue();

new Vue({
  render: h => h(App)
}).$mount("#app");
