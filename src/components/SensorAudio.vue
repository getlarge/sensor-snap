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
      @click.prevent.stop="updateSensor(updatedSensor, 5523, true)"
    />
    <image
      v-show="!isPlaying"
      :transform="`translate(${updatedWidth / 4}, ${updatedHeight / 4})`"
      :height="updatedHeight / 2"
      :width="updatedWidth / 2"
      v-bind="{ 'xlink:href': updatedSensor.icons[1] }"
      class="sensor-icon"
      @click.prevent.stop="playSound(audioClipBuffer)"
    />
    <image
      v-show="isPlaying"
      :transform="`translate(${updatedWidth / 4}, ${updatedHeight / 4})`"
      :height="updatedHeight / 2"
      :width="updatedWidth / 2"
      v-bind="{ 'xlink:href': updatedSensor.icons[2] }"
      class="sensor-icon"
      @click.prevent.stop="stopSound()"
    />
  </svg>
</template>

<script>
import SensorEvents from '@/mixins/sensor-events';

/**
 * @module components/SensorAudio
 * @description Child component called when Object Id : 3339
 * @description Resources : Clip : 5522, Trigger : 5523, Duration : 5524, Level : 5548, appType : 5750
 */
export default {
  name: 'SensorAudio',

  mixins: [SensorEvents],

  data() {
    return {
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
      handler(value) {
        if (!value || value === null || !this.audioContext) return null;
        return this.parseAudio(value);
      },
      immediate: true,
    },
  },

  mounted() {
    this.mountElements();
    if (this.audioClip && this.audioClip !== null) {
      this.parseAudio(this.audioClip);
    }
  },

  beforeDestroy() {
    this.isPlaying = false;
    this.elementsMounted = false;
  },

  methods: {
    mountElements() {
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.elementsMounted = true;
      } catch (e) {
        this.elementsMounted = false;
        return 'Web Audio API is not supported in this browser';
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
    async parseAudio(value) {
      // console.log('parseAudio', typeof value);
      if (value.type && value.data) {
        this.audioClipBuffer = await this.audioContext.decodeAudioData(
          Buffer.from(value.data).buffer,
        );
      } else if (value instanceof ArrayBuffer) {
        this.audioClipBuffer = await this.audioContext.decodeAudioData(value);
      } else if (typeof value === 'string') {
        this.audioClipBuffer = await this.audioContext.decodeAudioData(
          Buffer.from(value, 'base64').buffer,
        );
      }
      return null;
    },
  },
};
</script>
