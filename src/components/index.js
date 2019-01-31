import Vue from "vue";
import SensorCamera from "./SensorCamera.vue";
import SensorGauge from "./SensorGauge.vue";
import SensorLevel from "./SensorLevel.vue";
import SensorSwitch from "./SensorSwitch.vue";
import SensorTime from "./SensorTime.vue";

const Components = {
  SensorCamera,
  SensorGauge,
  SensorLevel,
  SensorSwitch,
  SensorTime
};

const componentName = name => {
  if (!name || name === null) return null;
  return name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

Object.keys(Components).forEach(name => {
  Vue.component(componentName(name), Components[name]);
});

export default Components;
