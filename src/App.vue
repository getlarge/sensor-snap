<template lang="html">
  <div id="app">
    <sensor-snap
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
import deviceTree from "@/assets/device-tree.json";
import SensorSnap from "@/components/SensorSnap";

export default {
  name: "App",

  components: {
    //  "sensor-snap": () => import("@/components/SensorSnap.vue"),
    "sensor-snap": SensorSnap,
  },

  data() {
    return {
      sensor: deviceTree.children[6],
      width: 450,
      height: 480,
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
    // setInterval(() => {
    //   const resource = this.sensor.resource.toString();
    //   const sensor = JSON.parse(JSON.stringify(this.sensor));
    //   console.log("oldSensor", sensor.resources[resource]);
    //   sensor.resources[resource] = this.sensor.resources[resource] + Math.floor(Math.random() + 10);
    //   this.sensor = sensor;
    //   console.log("newSensor", this.sensor.resources[resource]);
    // }, 3000);
  },

  methods: {
    onUpdateSensor(...args) {
      if (args[0] && args[0].id) {
        console.log("aloes-sensor updateSensor()", args);
        this.sensor = args[0];
      }
    },

    onDeleteSensor(...args) {
      console.log("aloes-sensor deleteSensor()", args);
    },
  },
};
</script>
