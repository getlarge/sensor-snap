<template>
  <div class="sensor-snap">
    <component
      :is="componentName"
      v-if="refName !== null && sensor"
      v-show="aSide"
      :ref="`${refName}-${sensor.id}`"
      :sensor="JSON.stringify(sensor)"
      :height="updatedHeight"
      :width="updatedWidth"
      class="sensor-component"
      @update-sensor="updateSensor"
      @delete-sensor="deleteSensor"
      @flip-side="onFlippedSide"
    />
    <svg
      v-if="sensor"
      v-show="!aSide"
      :height="updatedHeight"
      :width="updatedWidth"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="sensor"
      @click.prevent="flipSide(!aSide)"
    >
      <!-- SENSOR DESCRIPTION -->
      <g :transform="`translate(${updatedWidth / 2}, ${updatedHeight / 10})`">
        <text text-anchor="middle" x="0" class="sensor-details">
          <tspan x="0" :y="`${updatedHeight / 8}`">
            IPSO : {{ sensor.type }}
          </tspan>
          <tspan x="0" :y="`${updatedHeight / 4}`">
            counter : {{ sensor.frameCounter }}
          </tspan>
          <tspan x="0" :y="`${updatedHeight / 3}`">
            {{ sensor.messageProtocol }} {{ sensor.messageProtocol }}
          </tspan>
          <tspan x="0" :y="`${updatedHeight / 2}`">
            routes :
          </tspan>
          <tspan x="0" :y="`${updatedHeight / 1.7}`">
            {{ sensor.inputPath }}
          </tspan>
          <tspan x="0" :y="`${updatedHeight / 1.5}`">
            {{ sensor.outputPath }}
          </tspan>
          <tspan
            v-if="sensor.resources['5750']"
            x="0"
            :y="`${updatedHeight / 1.2}`"
          >
            {{ sensor.resources['5750'] }}
          </tspan>
        </text>
      </g>
    </svg>
    <p v-else-if="refName === null || !sensor">
      INVALID SENSOR
    </p>
  </div>
</template>

<script>
/* eslint-disable no-console */
import componentsList from '../assets/components-list';
import deviceTree from '../assets/device-tree.json';
import {formatSensor, updateStyles} from '../methods';
import SensorCamera from './SensorCamera.vue';
import SensorGauge from './SensorGauge.vue';
import SensorLevel from './SensorLevel.vue';
import SensorSwitch from './SensorSwitch.vue';
import SensorTime from './SensorTime.vue';

const defaultSensor = deviceTree.children[7];

/**
 * Parent component handling data flow and sub components selection
 * @exports components/SensorSnap
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string} id - Required, sensorId
 */
export default {
  name: 'SensorSnap',

  components: {
    'sensor-camera': SensorCamera,
    'sensor-gauge': SensorGauge,
    'sensor-level': SensorLevel,
    'sensor-switch': SensorSwitch,
    'sensor-time': SensorTime,
    // 'sensor-camera': () => import('./SensorCamera.vue'),
    // 'sensor-gauge': () => import('./SensorGauge.vue'),
    // 'sensor-level': () => import('./SensorLevel.vue'),
    // 'sensor-switch': () => import('./SensorSwitch.vue'),
    // 'sensor-time': () => import('./SensorTime.vue'),
  },

  props: {
    id: {
      type: String,
      required: true,
      default: () => {
        return defaultSensor.id.toString();
      },
    },
    deviceId: {
      type: String,
      required: true,
      default: defaultSensor.deviceId.toString(),
    },
    name: {
      type: String,
      required: true,
      default: defaultSensor.name,
    },
    type: {
      type: Number,
      required: true,
      default: defaultSensor.type,
    },
    resources: {
      type: String,
      required: true,
      default: () => {
        return JSON.stringify(defaultSensor.resources);
      },
    },
    resource: {
      type: Number,
      required: true,
      default: null,
    },
    icons: {
      type: String,
      required: false,
      default: () => {
        return defaultSensor.icons.toString();
      },
    },
    colors: {
      type: String,
      required: false,
      default: () => {
        return JSON.stringify(defaultSensor.colors);
      },
    },
    value: {
      type: String,
      required: true,
      default: null,
      // default: () => {
      //   return defaultSensor.value.toString()
      // }
    },
    frameCounter: {
      type: Number,
      required: false,
      default: 0,
    },
    devEui: {
      type: String,
      required: false,
      default: null,
    },
    devAddr: {
      type: String,
      required: false,
      default: null,
    },
    transportProtocol: {
      type: String,
      required: true,
      default: defaultSensor.transportProtocol,
    },
    transportProtocolVersion: {
      type: String,
      required: false,
      default: null,
    },
    messageProtocol: {
      type: String,
      required: true,
      default: defaultSensor.messageProtocol,
    },
    messageProtocolVersion: {
      type: String,
      required: false,
      default: null,
    },
    inputPath: {
      type: String,
      required: false,
      default: null,
    },
    outputPath: {
      type: String,
      required: false,
      default: null,
    },
    inPrefix: {
      type: String,
      required: true,
      default: null,
    },
    outPrefix: {
      type: String,
      required: true,
      default: null,
    },
    nativeSensorId: {
      type: String,
      required: true,
      default: defaultSensor.nativeSensorId,
    },
    nativeNodeId: {
      type: String,
      required: false,
      default: null,
    },
    width: {
      type: Number,
      default: 450,
    },
    height: {
      type: Number,
      default: 480,
    },
  },

  data() {
    return {
      style: null,
      updatedResource: null,
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      aSide: true,
    };
  },

  computed: {
    /**
     * Detect which component to load for this sensor type ( OMA Object ID )
     * @inner
     * @returns {string} componentName
     */
    componentType() {
      if (this.$props.type === componentsList.audio.list[0]) {
        //  return "audio"
        //  return null;
      } else if (
        componentsList.camera.list.find(
          objectId => objectId === this.$props.type,
        )
      ) {
        return 'camera';
      } else if (this.$props.type === componentsList.color.list[0]) {
        //  return "color";
        return null;
      } else if (
        componentsList.gauge.list.find(
          objectId => objectId === this.$props.type,
        )
      ) {
        return 'gauge';
      } else if (
        componentsList.level.list.find(
          objectId => objectId === this.$props.type,
        )
      ) {
        return 'level';
      } else if (this.$props.type === componentsList.map.list[0]) {
        //  return "map"
        return null;
      } else if (
        componentsList.switch.list.find(
          objectId => objectId === this.$props.type,
        )
      ) {
        return 'switch';
      } else if (
        componentsList.time.list.find(objectId => objectId === this.$props.type)
      ) {
        return 'time';
      } else if (
        componentsList.timer.list.find(
          objectId => objectId === this.$props.type,
        )
      ) {
        //  return "timer"
        return null;
      }
      return null;
    },
    refName() {
      if (!this.componentType && this.componentType === null) return null;
      return componentsList[this.componentType].name;
    },
    componentName() {
      if (!this.refName || this.refName === null) return null;
      return this.refName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },
    sensor: {
      get() {
        //  return this.formatSensor();
        return formatSensor(this.$props);
      },
      // set(value) {
      //   this.updatedSensor = value;
      // },
    },
    stylesConf() {
      if (!this.componentType) {
        return {
          height: this.updatedHeight,
          width: this.updatedWidth,
        };
      }
      return {
        height: this.updatedHeight,
        width: this.updatedWidth,
        ...componentsList[this.componentType].colors,
        // successColor: "#69ff4f",
        // warningColor: `${this.sensor.colors[1]}`,
      };
    },
  },

  watch: {
    width: {
      handler(width) {
        this.updatedWidth = width;
      },
      immediate: true,
    },
    height: {
      handler(height) {
        this.updatedHeight = height;
      },
      immediate: true,
    },
  },

  mounted() {
    this.style = document.createElement('style');
    this.$nextTick(() => {
      if (this.style !== null) {
        const styles = updateStyles(
          this.sensor,
          this.stylesConf,
          this.componentName,
        );
        //  const styles = this.updateStyles(this.componentName);
        this.style.innerHTML = styles;
        this.$el.prepend(this.style);
      }
    });
  },

  beforeDestroy() {
    //  this.$el.removeChild(this.style);
  },

  methods: {
    updateSensor(...args) {
      if (args[0] && args[0].id) {
        this.$emit('update-sensor', ...args);
      }
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args);
    },

    flipSide(value) {
      if (this.refName !== null && this.sensor) {
        this.$refs[`${this.refName}-${this.sensor.id}`].flipSide(value);
      }
    },

    onFlippedSide(value) {
      this.aSide = value;
    },

    sendCommand(command, args) {
      // todo : validate inputs !!!
      this.$refs[`${this.refName}-${this.sensor.id}`][command](args);
    },
  },
};
</script>
