// THIS FILE IS AUTOMATICALLY GENERATED IN:
//
//   build-utils/update-file-index.js
//
// YOU SHOULD NEVER UPDATE THIS FILE DIRECTLY

import SensorAudio from './SensorAudio.vue'
import SensorCamera from './SensorCamera.vue'
import SensorGauge from './SensorGauge.vue'
import SensorLevel from './SensorLevel.vue'
import SensorMap from './SensorMap.vue'
import SensorSnap from './SensorSnap.vue'
import SensorSwitch from './SensorSwitch.vue'
import SensorText from './SensorText.vue'
import SensorTime from './SensorTime.vue'
import SensorTimer from './SensorTimer.vue'

// Export components individually
export { SensorAudio, SensorCamera, SensorGauge, SensorLevel, SensorMap, SensorSnap, SensorSwitch, SensorText, SensorTime, SensorTimer }

// What should happen if the user installs the library as a plugin
function install(Vue) {
  Vue.component('SensorAudio', SensorAudio)
  Vue.component('SensorCamera', SensorCamera)
  Vue.component('SensorGauge', SensorGauge)
  Vue.component('SensorLevel', SensorLevel)
  Vue.component('SensorMap', SensorMap)
  Vue.component('SensorSnap', SensorSnap)
  Vue.component('SensorSwitch', SensorSwitch)
  Vue.component('SensorText', SensorText)
  Vue.component('SensorTime', SensorTime)
  Vue.component('SensorTimer', SensorTimer)
}

// Export the library as a plugin
export default { install: install }
