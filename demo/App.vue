<template>
  <div id="app">
    <SensorSnap
      :id="updatedSensor.id.toString()"
      :ref="`sensorSnap-${updatedSensor.id}`"
      :device-id="updatedSensor.deviceId"
      :dev-eui="updatedSensor.devEui"
      :name="updatedSensor.name"
      :type="updatedSensor.type"
      :value="JSON.stringify(updatedSensor.value)"
      :frame-counter="updatedSensor.frameCounter"
      :resources="JSON.stringify(updatedSensor.resources)"
      :resource="updatedSensor.resource"
      :icons="updatedSensor.icons.toString()"
      :colors="updatedSensor.colors.toString()"
      :protocol-name="updatedSensor.protocolName"
      :protocol-version="updatedSensor.protocolVersion"
      :input-path="updatedSensor.inputPath || null"
      :output-path="updatedSensor.outputPath || null"
      :in-prefix="updatedSensor.inPrefix"
      :out-prefix="updatedSensor.outPrefix"
      :native-type="updatedSensor.nativeType"
      :native-resource="updatedSensor.nativeResource"
      :native-sensor-id="updatedSensor.nativeSensorId"
      :native-node-id="updatedSensor.nativeNodeId || null"
      :width="width"
      :height="height"
      class="sensor-snap"
      @update-sensor="onUpdateSensor"
      @delete-sensor="onDeleteSensor"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
import deviceTree from '@/assets/device-tree.json'

export default {
  name: 'App',

  data() {
    return {
      sensor: deviceTree.children[3],
      width: 450,
      height: 480
    }
  },

  computed: {
    updatedSensor: {
      get() {
        return this.sensor
      },
      set(value) {
        this.sensor = value
      }
    }
  },

  mounted() {
    //  this.measurementTest()
    //  this.cameraTest();
  },

  methods: {
    onUpdateSensor(...args) {
      if (args[0] && args[0].id) {
        console.log('aloes-sensor updateSensor()', args)
        this.sensor = args[0]
      }
    },

    onDeleteSensor(...args) {
      console.log('aloes-sensor deleteSensor()', args)
    },

    measurementTest() {
      setInterval(() => {
        const resource = this.sensor.resource.toString()
        const sensor = JSON.parse(JSON.stringify(this.sensor))
        console.log('oldSensor', sensor.resources[resource])
        sensor.value =
          this.sensor.resources[resource] + Math.floor(Math.random() + 500)
        sensor.resources[resource] = sensor.value
        this.sensor = sensor
        console.log('newSensor', this.sensor.resources[resource])
      }, 3000)
    },

    cameraTest() {
      const sensor = JSON.parse(JSON.stringify(this.sensor))
      console.log('oldSensor', sensor.resources['5910'])
      return fetch('/icons/aloes/clock.png')
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status)
          }
          return response.arrayBuffer()
        })
        .then(buffer => {
          // this.$refs[`sensorSnap-${this.sensor.id}`].sendCommand("getImage", new Blob([buffer]));
          sensor.value = Buffer.from(buffer)
          sensor.resources['5910'] = Buffer.from(buffer)
          this.sensor = sensor
          console.log('newSensor', this.sensor.resources['5910'])
        })
    }
  }
}
</script>
