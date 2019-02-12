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
import { updateAloesSensors } from 'aloes-handlers'
import deviceTree from '@/assets/device-tree.json'

export default {
  name: 'App',

  data() {
    return {
      sensor: deviceTree.children[6],
      width: 450,
      height: 480,
      randomPics: [
        '/icons/aloes/dither.png',
        '/icons/aloes/camera.png',
        '/icons/aloes/electrons.png',
        '/icons/aloes/clock.png',
        '/icons/aloes/pattern.png',
        '/icons/aloes/arduino.png'
      ]
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
  },

  methods: {
    async onUpdateSensor(...args) {
      if (args[0] && args[0].id) {
        console.log('aloes-sensor updateSensor()', args)
        if (args[0].type === 3349 && args[1] === 5911) {
          const result = await this.cameraTest(2)
          args[1] = 5910
          args[2] = result
        }
        this.sensor = await updateAloesSensors(args[0], args[1], args[2])
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

    arrayBufferToBase64(buffer) {
      let binary = ''
      const bytes = [].slice.call(new Uint8Array(buffer))
      bytes.forEach(b => (binary += String.fromCharCode(b)))
      return window.btoa(binary)
    },

    async cameraTest(testNumber) {
      const randomPic = this.randomPics[
        Math.floor(Math.random() * this.randomPics.length)
      ]
      const result = await fetch(`${randomPic}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error, status = ' + response.status)
          }
          return response.arrayBuffer()
        })
        .then(buffer => {
          if (testNumber === 1) {
            return Buffer.from(buffer)
          } else if (testNumber === 2) {
            return this.arrayBufferToBase64(buffer)
          }
          return buffer
        })
      return result
    }
  }
}
</script>
