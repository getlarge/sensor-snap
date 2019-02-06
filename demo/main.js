import Vue from 'vue'
import App from './App'

if (process.env.VUE_APP_E2E) {
  if (window.__e2e_lib) {
    Vue.use(require('sensor-snap').default)
  } else if (window.__e2e_components) {
    Vue.component('SensorSnap', require('sensor-snap.sensor-snap').default)
    Vue.component('SensorCamera', require('sensor-snap.sensor-camera').default)
    Vue.component('SensorGauge', require('sensor-snap.sensor-gauge').default)
    Vue.component('SensorLevel', require('sensor-snap.sensor-level').default)
    Vue.component('SensorSwitch', require('sensor-snap.sensor-switch').default)
    Vue.component('SensorTime', require('sensor-snap.sensor-time').default)
  }
} else {
  // Install the plugin directly from src in development
  Vue.use(require('../src').default)
}
//	Vue.use(require('../src').default)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
