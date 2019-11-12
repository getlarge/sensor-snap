<template>
  <div id="app">
    <SensorSnap
      :id="updatedSensor.id.toString()"
      :ref="`sensorSnap-${updatedSensor.id}`"
      :owner-id="updatedSensor.ownerId"
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
      sensor: deviceTree.children[11],
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
      randomColors: [
        {unit: 'hex', value: '#4C659E'},
        {unit: 'hex', value: '#F32D2B'},
        {unit: 'rgb', value: '40,200,100'},
        {unit: 'rgb', value: '200,120,40'},
        // {unit: 'hsl', value: '10,35%,40%'},
        // {unit: 'hsl', value: '36,50%,76%'},
      ],
      testInterval: 1,
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

  watch: {
    updatedSensor: {
      handler(value, oldValue) {
        if (value && value !== null) {
          if (oldValue && oldValue.id === value.id) {
            return;
          }
          if (value.type === 3336) this.startMapTest(5000);
          if (value.type === 3335) this.startColorTest();
          // if (value.type === 3340) this.startTimerTest();
          if (value.resource === 5700) this.startGaugeTest();
        }
      },
      immediate: true,
    },
  },

  methods: {
    updateSensorView(sensor) {
      this.updatedSensor = sensor;
    },

    async onUpdateSensor(...args) {
      if (args[0] && args[0].id) {
        const sensor = args[0];
        console.log('aloes-sensor updateSensor()', args);
        if (sensor.type === 3349 && args[1] === 5911) {
          const result = await this.cameraTest(1);
          args[1] = 5910;
          args[2] = result;
        } else if (sensor.type === 3339 && args[1] === 5523) {
          const result = await this.audioTest(1);
          args[1] = 5522;
          args[2] = result;
        } else if (sensor.type === 3340) {
          if (args[1] === 5523) {
            if (args[2] === 'start') {
              this.startTimerTest(1000, sensor.resources['5521']);
            } else if (args[2] === 'restart') {
              this.startTimerTest(1000, sensor.resources['5538']);
            } else if (args[2] === 'stop') {
              this.stopTimerTest();
            } else if (args[2] === 'pause') {
              this.stopTimerTest();
            }
          } else if (args[1] === 5850) {
            // if (args[2] === true) {
            //   this.startTimerTest(1000, sensor.resources['5538']);
            // } else if (args[2] === false) {
            //   this.stopTimerTest();
            // }
          }
        }
        this.updatedSensor = updateAloesSensors(sensor, args[1], args[2]);
        return this.updatedSensor;
      }
      return null;
    },

    onUpdateSetting(...args) {
      console.log('aloes-sensor updateSetting()', args);
      if (!args || !args[0].id) return null;
      const sensor = args[0];
      sensor[args[1].toString()] = args[2];
      sensor.resource = args[1];
      sensor.value = args[2];
      this.updateSensorView(sensor);
      return sensor;
    },

    onDeleteSensor(...args) {
      console.log('aloes-sensor deleteSensor()', args);
    },

    stopGaugeTest() {
      if (this.gaugeTimer && this.gaugeTimer !== null) {
        console.log('aloes-sensor stopGaugeTest()');
        clearInterval(this.gaugeTimer);
      }
    },

    startGaugeTest(interval) {
      // if (
      //   !this.$refs[`sensorSnap-${this.sensor.id}`] ||
      //   this.$refs[`sensorSnap-${this.sensor.id}`].componentsType !== 'gauge'
      // ) {
      //   return;
      // }
      if (!this.sensor || this.sensor.resource !== 5700) return;
      interval = interval || this.testInterval * 1000;
      this.stopGaugeTest();
      console.log('aloes-sensor startGaugeTest()');
      this.gaugeTimer = setInterval(() => {
        if (!this.sensor || this.sensor.resource !== 5700) {
          this.stopGaugeTest();
          return;
        }
        const resource = this.sensor.resource.toString();
        const sensor = JSON.parse(JSON.stringify(this.sensor));
        sensor.value =
          this.sensor.resources[resource] + Math.floor(Math.random() + 1);
        sensor.resources[resource] = sensor.value;
        // console.log('GAUGE UPDATE', sensor.value);
        this.updateSensorView(sensor);
      }, interval);
    },

    stopMapTest() {
      if (this.mapTimer && this.mapTimer !== null) {
        console.log('aloes-sensor stopMapTest()');
        clearInterval(this.mapTimer);
      }
    },

    startMapTest(interval) {
      if (!this.sensor || this.sensor.type !== 3336) return;
      interval = interval || this.testInterval * 1000;
      this.stopMapTest();
      console.log('aloes-sensor startMapTest()');
      this.mapTimer = setInterval(() => {
        if (!this.sensor || this.sensor.type !== 3336) {
          this.stopMapTest();
          return;
        }
        const sensor = JSON.parse(JSON.stringify(this.sensor));
        sensor.resources['5514'] = (
          Number(sensor.resources['5514']) + Math.floor(Math.random() + 1)
        ).toString();
        sensor.resources['5515'] = (
          Number(sensor.resources['5515']) + Math.floor(Math.random() + 1)
        ).toString();
        sensor.resources['5518'] = new Date().getTime();
        // console.log(
        //   'aloes-sensor startMapTest() with values :',
        //   sensor.resources['5514'],
        //   sensor.resources['5515'],
        //   sensor.resources['5518'],
        // );
        this.updateSensorView(sensor);
      }, interval);
    },

    stopTimerTest() {
      if (this.timer && this.timer !== null) {
        console.log('aloes-sensor stopTimerTest()');
        clearInterval(this.timer);
      }
    },

    startTimerTest(interval, timeLeft) {
      if (!this.sensor || this.sensor.type !== 3340) return null;
      interval = interval || this.testInterval * 1000;
      timeLeft = timeLeft || 35;
      this.stopTimerTest();
      console.log('aloes-sensor startTimerTest()');
      // this.sensor.resources['5521'] = timeLeft;
      this.sensor.value = timeLeft;
      this.sensor.resources['5538'] = timeLeft;
      this.sensor.resources['5850'] = 1;
      this.sensor.resources['5543'] = 0;
      this.sensor.resources['5526'] = 1;
      this.sensor.resources['5523'] = 'started';
      this.timer = setInterval(() => {
        if (!this.sensor || this.sensor.type !== 3340) {
          this.stopTimerTest();
          return;
        }
        const resource = '5538';
        const sensor = JSON.parse(JSON.stringify(this.sensor));
        sensor.resource = 5538;
        sensor.value = sensor.value - interval / 1000;
        // console.log('TIMER UPDATE', sensor.value);
        if (sensor.value <= 0) {
          sensor.value = 0;
          sensor.resources['5543'] = 1;
          sensor.resources['5523'] = 'stopped';
          this.stopTimerTest();
        }
        sensor.resources[resource] = sensor.value;
        this.updateSensorView(sensor);
      }, interval);
    },

    stopColorTest() {
      if (this.colorTimer && this.colorTimer !== null) {
        console.log('aloes-sensor stopColorTest()');
        clearInterval(this.colorTimer);
      }
    },

    startColorTest(interval) {
      if (!this.sensor || this.sensor.type !== 3335) return;
      interval = interval || this.testInterval * 1000;
      this.stopColorTest();
      console.log('aloes-sensor startColorTest()');
      this.colorTimer = setInterval(() => {
        if (!this.sensor || this.sensor.type !== 3335) {
          this.stopColorTest();
          return;
        }
        const resource = '5706';
        const sensor = JSON.parse(JSON.stringify(this.sensor));
        const randomColor = this.randomColors[
          Math.floor(Math.random() * this.randomColors.length)
        ];
        sensor.value = randomColor.value;
        sensor.resources[resource] = sensor.value;
        sensor.resources['5701'] = randomColor.unit;
        this.updateSensorView(sensor);
      }, interval);
    },

    arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach(b => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },

    async audioTest(testNumber) {
      try {
        const sensorIsAudio = componentsList.audio.list.some(
          objectId => objectId === this.sensor.type,
        );
        if (!sensorIsAudio) return null;
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
            return res;
          });
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
        const sensorIsCamera = componentsList.camera.list.some(
          objectId => objectId === this.sensor.type,
        );
        if (!sensorIsCamera) return null;
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
