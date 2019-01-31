<template lang="html">
  <svg class="aloes-sensor-audio">
    <!-- AUDIO CLIP
        CLIP 5522, TRIGGER 5523, LEVEL 5548, DURATION 5524, appType 5750-->
    <g
      v-if="updatedSensor.type === 3339"
      transform="translate(10,20)"
      @click="updateSensor(updatedSensor, 5523, 1)"
    >
      <circle cx="60" cy="60" r="60" class="sensor-button" />
    </g>
  </svg>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "SensorAudio",

  props: {
    sensor: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 140
    }
  },

  data() {
    return {
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null
    };
  },

  watch: {
    sensor: {
      handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true
    },
    width: {
      handler(width) {
        this.updatedWidth = width;
      },
      immediate: true
    },
    height: {
      handler(height) {
        this.updatedHeight = height;
      },
      immediate: true
    }
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    updateSensor(...args) {
      this.$emit("update-sensor", ...args);
    },

    flipSide(value) {
      this.$emit("flip-side", value);
    }
  }
};
</script>
