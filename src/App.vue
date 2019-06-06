<template>
  <div id="app">
    <SensorSnap
      :id="updatedSensor.id.toString()"
      :ref="`sensorSnap-${updatedSensor.id}`"
      :device-id="updatedSensor.deviceId"
      :dev-eui="updatedSensor.devEui"
      :dev-addr="updatedSensor.devAddr"
      :name="updatedSensor.name"
      :type="updatedSensor.type"
      :value="JSON.stringify(updatedSensor.value)"
      :frame-counter="updatedSensor.frameCounter"
      :resources="JSON.stringify(updatedSensor.resources)"
      :resource="updatedSensor.resource"
      :icons="updatedSensor.icons.toString()"
      :colors="JSON.stringify(sensor.colors)"
      :transport-protocol="sensor.transportProtocol"
      :transport-protocol-version="sensor.transportProtocolVersion"
      :message-protocol="sensor.messageProtocol"
      :message-protocol-version="sensor.messageProtocolVersion"
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
      @update-setting="onUpdateSetting"
      @delete-sensor="onDeleteSensor"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
import {updateAloesSensors} from 'aloes-handlers';
import deviceTree from '@/assets/device-tree.json';
import componentsList from '@/assets/components-list';
import SensorSnap from './components/SensorSnap.vue';

export default {
  name: 'app',

  components: {
    SensorSnap,
  },

  data() {
    return {
      sensor: deviceTree.children[1],
      width: 450,
      height: 480,
      randomPics: [
        '/icons/aloes/dither.png',
        '/icons/aloes/camera.png',
        '/icons/aloes/electrons.png',
        '/icons/aloes/clock.png',
        '/icons/aloes/pattern.png',
        '/icons/aloes/arduino.png',
      ],
      randomSounds: ['/sounds/fire.mp3', '/sounds/wind.mp3'],
    };
  },

  computed: {
    updatedSensor: {
      get() {
        return this.sensor;
      },
      set(value) {
        this.sensor = value;
      },
    },
  },

  mounted() {
    this.measurementTest();
  },

  methods: {
    async onUpdateSensor(...args) {
      if (args[0] && args[0].id) {
        console.log('aloes-sensor updateSensor()', args);
        if (args[0].type === 3349 && args[1] === 5911) {
          const result = await this.cameraTest(2);
          args[1] = 5910;
          args[2] = result;
        } else if (args[0].type === 3339 && args[1] === 5523) {
          const result = await this.audioTest(2);
          args[1] = 5522;
          args[2] = result;
        }
        this.updatedSensor = await updateAloesSensors(
          args[0],
          args[1],
          args[2],
        );
        return this.updatedSensor;
      }
      return null;
    },

    onUpdateSetting(...args) {
      console.log('aloes-sensor updateSetting()', args);
    },

    onDeleteSensor(...args) {
      console.log('aloes-sensor deleteSensor()', args);
    },

    measurementTest() {
      const sensorIsGauge = componentsList.gauge.list.find(
        objectId => objectId === this.sensor.type,
      );
      if (!sensorIsGauge) return null;
      setInterval(() => {
        const resource = this.sensor.resource.toString();
        const sensor = JSON.parse(JSON.stringify(this.sensor));
        sensor.value =
          this.sensor.resources[resource] + Math.floor(Math.random() + 1);
        sensor.resources[resource] = sensor.value;
        this.updatedSensor = sensor;
      }, 3000);
    },

    arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },

    async audioTest(testNumber) {
      try {
        // const sensorIsAudio = componentsList.audio.list.find(
        //   objectId => objectId === this.sensor.type,
        // );
        // if (!sensorIsAudio) return null;
        const randomSound = this.randomSounds[
          Math.floor(Math.random() * this.randomSounds.length)
        ];
        const buf = await fetch(`${randomSound}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('HTTP error, status = ' + response.status);
            }
            return response.arrayBuffer();
          })
          .then(res => {
            if (testNumber === 1) {
              return Buffer.from(res);
            } else if (testNumber === 2) {
              return this.arrayBufferToBase64(res);
            }
          });
        console.log('audioTest, buffer', testNumber, buf);
        return buf;
        // return this.$refs[`sensorSnap-${this.updatedSensor.id}`].sendCommand(
        //   'playSound',
        //   result,
        // );
      } catch (error) {
        return error;
      }
    },

    async cameraTest(testNumber) {
      try {
        const randomPic = this.randomPics[
          Math.floor(Math.random() * this.randomPics.length)
        ];
        const result = await fetch(`${randomPic}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('HTTP error, status = ' + response.status);
            }
            return response.arrayBuffer();
          })
          .then(buffer => {
            if (testNumber === 1) {
              return Buffer.from(buffer);
            } else if (testNumber === 2) {
              return this.arrayBufferToBase64(buffer);
            }
            return buffer;
          });
        console.log('cameraTest, buffer', testNumber, result);

        return result;
      } catch (error) {
        return error;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
