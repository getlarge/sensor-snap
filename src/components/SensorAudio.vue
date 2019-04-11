<template>
  <svg
    v-if="updatedSensor.type && updatedSensor.type === 3339"
    class="sensor-audio"
    :height="updatedHeight"
    :width="updatedWidth"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :viewBox="viewBox"
  >
    <text
      :transform="`translate(${updatedWidth / 2}, ${updatedHeight / 10})`"
      text-anchor="middle"
      x="0"
      class="sensor-title"
      @click="flipSide(!aSide)"
    >
      {{ updatedSensor.name }}
    </text>
    <circle
      :transform="`translate(${updatedWidth / 1.2}, ${updatedHeight / 10})`"
      :r="`${updatedWidth / 15}`"
      class="delete-button"
      @click="deleteSensor(updatedSensor)"
    />
    <circle
      :transform="`translate(${updatedWidth / 7}, ${updatedHeight / 10})`"
      :r="updatedWidth / 15"
      class="stream-button"
      @click.prevent.stop="
        !isPlaying ? playSound(audioClipBuffer) : stopSound()
      "
    />
    <image
      v-show="!isPlaying"
      :transform="`translate(${updatedWidth / 4}, ${updatedHeight / 4})`"
      :height="updatedHeight / 2"
      :width="updatedWidth / 2"
      v-bind="{'xlink:href': updatedSensor.icons[1]}"
      class="sensor-icon"
    />
    <image
      v-show="isPlaying"
      :transform="`translate(${updatedWidth / 4}, ${updatedHeight / 4})`"
      :height="updatedHeight / 2"
      :width="updatedWidth / 2"
      v-bind="{'xlink:href': updatedSensor.icons[2]}"
      class="sensor-icon"
    />
  </svg>
</template>

<script>
/**
 * Child component called when Object Id : 3339
 *
 * Resources : Clip : 5522, Trigger : 5523, Duration : 5524
 * Level : 5548, appType : 5750
 * @module components/SensorAudio
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string[]} sensor - Json stringified sensor instance
 */
export default {
  name: 'SensorAudio',

  props: {
    sensor: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 150,
    },
    height: {
      type: Number,
      default: 140,
    },
  },

  data() {
    return {
      updatedSensor: null,
      updatedHeight: null,
      updatedWidth: null,
      aSide: true,
      elementsMounted: false,
      audioContext: null,
      audioSource: null,
      audioClipBuffer: null,
      isPlaying: false,
    };
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`;
    },
    audioClip: {
      get() {
        return this.updatedSensor.resources['5522'];
      },
      set(value) {
        this.updatedSensor.resources['5522'] = value;
      },
    },
  },

  watch: {
    sensor: {
      handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true,
    },
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
    audioClip: {
      async handler(value) {
        if (!value || value === null || !this.audioContext) return null;
        if (value.type && value.data) {
          this.audioClipBuffer = await this.audioContext.decodeAudioData(
            Buffer.from(value.data).buffer,
          );
        } else if (value instanceof ArrayBuffer) {
          this.audioClipBuffer = await this.audioContext.decodeAudioData(value);
        }
        return null;
      },
      immediate: true,
    },
  },

  mounted() {
    this.mountElements();
  },

  beforeDestroy() {
    this.isPlaying = false;
    this.elementsMounted = false;
  },

  methods: {
    updateSensor(...args) {
      this.$emit('update-sensor', ...args);
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args);
    },

    flipSide(value) {
      this.$emit('flip-side', value);
    },

    mountElements() {
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.elementsMounted = true;
      } catch (e) {
        this.elementsMounted = false;
        throw 'Web Audio API is not supported in this browser';
      }
    },

    playSound(buffer) {
      if (!this.elementsMounted || !buffer) return null;
      this.audioSource = this.audioContext.createBufferSource();
      this.audioSource.buffer = buffer;
      this.audioSource.connect(this.audioContext.destination);
      this.audioSource.start(0);
      this.isPlaying = true;
    },

    stopSound() {
      if (!this.audioSource.stop) {
        this.audioSource.noteOff(0);
        this.isPlaying = false;
      } else {
        this.audioSource.stop(0);
        this.isPlaying = false;
      }
    },
  },
};
</script>
