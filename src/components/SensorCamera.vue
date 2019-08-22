<template>
  <svg
    v-if="updatedSensor.type && updatedSensor.type === 3349"
    class="sensor-camera"
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
      @click="debouncedUpdateSensor(updatedSensor, 5911, true)"
    />
    <!-- :stroke="updatedResources['5850'] ? updatedColors[0] : updatedColors[1]" -->
    <image
      v-show="!imageUrl || imageUrl === null"
      :transform="`translate(${updatedWidth / 4}, ${updatedHeight / 4})`"
      :height="updatedHeight / 2"
      :width="updatedWidth / 2"
      v-bind="{'xlink:href': updatedSensor.icons[0]}"
      class="sensor-icon"
    />
    <image
      v-show="imageUrl && imageUrl !== null"
      :ref="`streamViewer-${updatedSensor.id}`"
      :transform="`translate(${updatedWidth / 8}, ${updatedHeight / 4})`"
      :height="updatedHeight / 1.6"
      :width="updatedWidth / 1.4"
      v-bind="{'xlink:href': imageUrl}"
      class="stream-viewer"
    />
  </svg>
</template>

<script>
import debounce from 'lodash.debounce';

/**
 * Child component called when Object Id : 3349
 *
 * Resources : Bitmap input : 5910, Bitmap input reset : 5911, appType : 5750
 *
 * @module components/SensorCamera
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string[]} sensor - Json stringified sensor instance
 */
export default {
  name: 'SensorCamera',

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
    imgType: {
      type: String,
      required: false,
      default: 'jpeg',
    },
  },

  data() {
    return {
      updatedSensor: null,
      updatedHeight: null,
      updatedWidth: null,
      updatedImgType: null,
      aSide: true,
      imageUrl: null,
      fpm: [1, 2, 4, 6],
    };
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`;
    },
    bitmapInput: {
      get() {
        return this.updatedSensor.resources['5910'];
      },
      set(value) {
        this.updatedSensor.resources['5910'] = value;
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
    bitmapInput: {
      handler(value) {
        if (!value || value === null) return null;
        if (this.updatedSensor.resource === 5910) {
          this.imageUrl = null;
          return this.parseImage(value);
        }
      },
      immediate: true,
    },
    imgType: {
      handler(value) {
        if (!value || value === null) return null;
        this.updatedImgType = value;
      },
      immediate: true,
    },
  },

  created() {
    this.debouncedUpdateSensor = debounce(this.updateSensor, 150);
  },

  mounted() {
    this.mountElements();
    if (this.bitmapInput && this.bitmapInput !== null) {
      this.parseImage(this.bitmapInput);
    }
  },

  beforeDestroy() {
    this.imageUrl = null;
    this.timelapse = false;
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
      this.image = this.$refs[`streamViewer-${this.updatedSensor.id}`];
      this.elementsMounted = true;
    },

    getImage(blob) {
      if (!this.elementsMounted) return null;
      return new Promise((resolve, reject) => {
        const fReader = new FileReader();
        fReader.onload = () => {
          if (!fReader.result) reject(new Error('no result from file reader'));
          this.imageUrl = fReader.result;
          resolve(this.imageUrl);
        };
        if (blob instanceof Blob) {
          fReader.readAsDataURL(blob);
        }
      });
    },

    async parseImage(value) {
      try {
        if (value && typeof value === 'string') {
          const base64Flag = `data:image/${this.updatedImgType};base64,`;
          const blob = await (await fetch(`${base64Flag}${value}`)).blob();
          return this.getImage(blob);
        } else if (value.type && value.type === 'Buffer') {
          const blob = new Blob([Buffer.from(value.data).buffer]);
          return this.getImage(blob);
        }
        return null;
      } catch (error) {
        return error;
      }
    },
  },
};
</script>
