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
            {{ sensor.protocolName }} {{ sensor.protocolVersion }}
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
import { updateAloesSensors } from 'aloes-handlers'
import componentsSchemas from './assets/components-list'
import SensorStyles from './styles/SensorStyles'
import deviceTree from './assets/device-tree'
import SensorCamera from './SensorCamera'
import SensorGauge from './SensorGauge'
import SensorLevel from './SensorLevel'
import SensorSwitch from './SensorSwitch'
import SensorTime from './SensorTime'

const defaultSensor = deviceTree.children[7]

export default {
  name: 'SensorSnap',

  components: {
    'sensor-camera': SensorCamera,
    'sensor-gauge': SensorGauge,
    'sensor-level': SensorLevel,
    'sensor-switch': SensorSwitch,
    'sensor-time': SensorTime
  },

  props: {
    id: {
      type: String,
      required: true,
      default: () => {
        return defaultSensor.id.toString()
      }
    },
    deviceId: {
      type: String,
      required: true,
      default: defaultSensor.deviceId.toString()
    },
    name: {
      type: String,
      required: true,
      default: defaultSensor.name
    },
    type: {
      type: Number,
      required: true,
      default: defaultSensor.type
    },
    resources: {
      type: String,
      required: true,
      default: () => {
        return JSON.stringify(defaultSensor.resources)
      }
    },
    resource: {
      type: Number,
      required: true,
      default: defaultSensor.resource
    },
    icons: {
      type: String,
      required: false,
      default: () => {
        return defaultSensor.icons.toString()
      }
    },
    colors: {
      type: String,
      required: false,
      default: () => {
        return defaultSensor.colors.toString()
      }
    },
    value: {
      type: String,
      required: true,
      default: () => {
        return defaultSensor.value.toString()
      }
    },
    frameCounter: {
      type: Number,
      required: false,
      default: defaultSensor.frameCounter
    },
    devEui: {
      type: String,
      required: true,
      default: defaultSensor.devEui
    },
    protocolName: {
      type: String,
      required: true,
      default: defaultSensor.protocolName
    },
    protocolVersion: {
      type: String,
      required: false,
      default: defaultSensor.protocolVersion
    },
    inputPath: {
      type: String,
      required: false,
      default: defaultSensor.inputPath || ''
    },
    outputPath: {
      type: String,
      required: false,
      default: defaultSensor.outputPath || ''
    },
    inPrefix: {
      type: String,
      required: true,
      default: defaultSensor.inPrefix
    },
    outPrefix: {
      type: String,
      required: true,
      default: defaultSensor.outPrefix
    },
    nativeSensorId: {
      type: String,
      required: true,
      default: defaultSensor.nativeSensorId
    },
    nativeNodeId: {
      type: String,
      required: false,
      default: defaultSensor.nativeNodeId || null
    },
    width: {
      type: Number,
      default: 450
    },
    height: {
      type: Number,
      default: 480
    }
  },

  data() {
    return {
      style: null,
      updatedName: null,
      updatedType: null,
      updatedValue: null,
      updatedIcons: null,
      updatedColors: null,
      updatedResources: null,
      updatedResource: null,
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      aSide: true
    }
  },

  computed: {
    componentType() {
      if (this.updatedType === componentsSchemas.audio.list[0]) {
        //  return "audio"
        //  return null;
      } else if (
        componentsSchemas.camera.list.find(
          objectId => objectId === this.updatedType
        )
      ) {
        return 'camera'
      } else if (this.updatedType === componentsSchemas.color.list[0]) {
        //  return "color";
        return null
      } else if (
        componentsSchemas.gauge.list.find(
          objectId => objectId === this.updatedType
        )
      ) {
        return 'gauge'
      } else if (
        componentsSchemas.level.list.find(
          objectId => objectId === this.updatedType
        )
      ) {
        return 'level'
      } else if (this.updatedType === componentsSchemas.map.list[0]) {
        //  return "map"
        return null
      } else if (
        componentsSchemas.switch.list.find(
          objectId => objectId === this.updatedType
        )
      ) {
        return 'switch'
      } else if (
        componentsSchemas.time.list.find(
          objectId => objectId === this.updatedType
        )
      ) {
        return 'time'
      } else if (
        componentsSchemas.timer.list.find(
          objectId => objectId === this.updatedType
        )
      ) {
        //  return "timer"
        return null
      }
      return null
    },
    refName() {
      if (!this.componentType && this.componentType === null) return null
      return componentsSchemas[this.componentType].name
    },
    componentName() {
      if (!this.refName || this.refName === null) return null
      return this.refName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    },
    sensor: {
      get() {
        return this.formatSensor()
      },
      set(value) {
        this.updatedSensor = value
      }
    },
    stylesConf() {
      if (!this.componentType) {
        return {
          height: this.updatedHeight,
          width: this.updatedWidth
        }
      }
      return {
        height: this.updatedHeight,
        width: this.updatedWidth,
        ...componentsSchemas[this.componentType].colors
        // successColor: "#69ff4f",
        // warningColor: `${this.sensor.colors[1]}`,
      }
    }
  },

  watch: {
    name: {
      handler(name) {
        this.updatedName = name
      },
      immediate: true
    },
    type: {
      handler(type) {
        this.updatedType = Number(type)
      },
      immediate: true
    },
    value: {
      handler(value) {
        //  this.parseUpdatedValue(value);
        this.updatedValue = JSON.parse(value)
      },
      immediate: true
    },
    icons: {
      handler(icons) {
        this.updatedIcons = icons.split(',')
      },
      immediate: true
    },
    colors: {
      handler(colors) {
        this.updatedColors = colors.split(',')
      },
      immediate: true
    },
    resources: {
      handler(resources) {
        this.updatedResources = JSON.parse(resources)
      },
      immediate: true
    },
    resource: {
      handler(resource) {
        this.updatedResource = resource
      },
      immediate: true
    },
    width: {
      handler(width) {
        this.updatedWidth = width
      },
      immediate: true
    },
    height: {
      handler(height) {
        this.updatedHeight = height
      },
      immediate: true
    }
  },

  mounted() {
    this.style = document.createElement('style')
    this.$nextTick(() => {
      if (this.style !== null) {
        const styles = this.updateStyles(this.componentName)
        this.style.innerHTML = styles
        this.$el.prepend(this.style)
      }
    })
  },

  beforeDestroy() {
    // this.removeListeners()
    //  this.$el.removeChild(this.style);
  },

  methods: {
    formatSensor() {
      if (this.$props.protocolName.toLowerCase() === 'mysensors') {
        this.updatedSensor = {
          id: this.$props.id,
          deviceId: this.$props.deviceId,
          devEui: this.$props.devEui,
          frameCounter: this.$props.frameCounter,
          protocolName: this.$props.protocolName,
          protocolVersion: this.$props.protocolVersion,
          inputPath: this.$props.inputPath,
          outputPath: this.$props.outputPath,
          inPrefix: this.$props.inPrefix,
          outPrefix: this.$props.outPrefix,
          nativeSensorId: this.$props.nativeSensorId,
          nativeNodeId: this.$props.nativeNodeId,
          name: this.updatedName,
          type: this.updatedType,
          resources: this.updatedResources,
          resource: this.updatedResource,
          icons: this.updatedIcons,
          colors: this.updatedColors,
          value: this.updatedValue
        }
        return this.updatedSensor
      } else if (this.$props.protocolName.toLowerCase() === 'aloeslight') {
        this.updatedSensor = {
          id: this.$props.id,
          deviceId: this.$props.deviceId,
          devEui: this.$props.devEui,
          frameCounter: this.$props.frameCounter,
          protocolName: this.$props.protocolName,
          protocolVersion: this.$props.protocolVersion,
          inputPath: this.$props.inputPath,
          outputPath: this.$props.outputPath,
          inPrefix: this.$props.inPrefix,
          outPrefix: this.$props.outPrefix,
          nativeSensorId: this.$props.nativeSensorId,
          name: this.updatedName,
          type: this.updatedType,
          resources: this.updatedResources,
          resource: this.updatedResource,
          icons: this.updatedIcons,
          colors: this.updatedColors,
          value: this.updatedValue
        }
        return this.updatedSensor
      }
      return null
    },

    updateSensor(...args) {
      if (args[0] && args[0].id) {
        const sensor = updateAloesSensors(args[0], args[1], args[2])
        this.sensor = sensor
        this.$emit('update-sensor', sensor)
      }
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args)
    },

    flipSide(value) {
      if (this.refName !== null && this.sensor) {
        this.$refs[`${this.refName}-${this.sensor.id}`].flipSide(value)
      }
    },

    onFlippedSide(value) {
      this.aSide = value
    },

    updateStyles(componentName) {
      if (!componentName || componentName === null) return null
      const styleName = componentName.split('-')[1]
      const styles = `${SensorStyles.picker(
        'snap',
        this.sensor,
        this.stylesConf
      )} ${SensorStyles.picker(styleName, this.sensor, this.stylesConf)}`
      //  console.log("updateStyles", styles);
      console.log('updateStyles', this.style)
      return styles
    },

    sendCommand(command, args) {
      // todo : validate inputs !!!
      this.$refs[`${this.refName}-${this.sensor.id}`][command](args)
    }
  }
}
</script>
