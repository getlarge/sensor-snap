import Vue from 'vue';
import App from './App.vue';
import SensorSnap from './components';

Vue.use(SensorSnap);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
