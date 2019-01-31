<template lang="html">
  <div id="app">
    <sensor-snap
      :id="sensor.id.toString()"
      :ref="`sensorSnap-${sensor.id}`"
      :device-id="sensor.deviceId"
      :dev-eui="sensor.devEui"
      :name="sensor.name"
      :type="sensor.type"
      :value="JSON.stringify(sensor.value)"
      :frame-counter="sensor.frameCounter"
      :resources="JSON.stringify(sensor.resources)"
      :resource="sensor.resource"
      :icons="sensor.icons.toString()"
      :colors="sensor.colors.toString()"
      :protocol-name="sensor.protocolName"
      :protocol-version="sensor.protocolVersion"
      :input-path="sensor.inputPath || null"
      :output-path="sensor.outputPath || null"
      :in-prefix="sensor.inPrefix"
      :out-prefix="sensor.outPrefix"
      :native-type="sensor.nativeType"
      :native-resource="sensor.nativeResource"
      :native-sensor-id="sensor.nativeSensorId"
      :native-node-id="sensor.nativeNodeId || null"
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
    "sensor-snap": SensorSnap
  },

  data() {
    return {
      sensor: deviceTree.children[7],
      width: 450,
      height: 480
    };
  },

  methods: {
    onUpdateSensor(...args) {
      if (args[0] && args[0].id) {
        console.log("aloes-sensor updateSensor()", args);
      }
    },

    onDeleteSensor(...args) {
      console.log("aloes-sensor deleteSensor()", args);
    }
  }
};
</script>
