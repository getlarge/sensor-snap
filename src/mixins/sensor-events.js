/**
 * @module mixins/SensorEvents
 * @description Mixin used in every component
 * @params {number} [width] - Component width
 * @params {number} [height] - Component height
 * @params {string} sensor - JSON stringified sensor instance
 * @properties {object} data
 * @properties {object} data.updatedSensor
 * @properties {number} data.updatedHeight
 * @properties {number} data.updatedWidth
 * @properties {boolean} data.aSide - Indicate widget side
 * @properties {boolean} data.elementsMounted - Indicate if DOM elements are mounted
 * @properties {object} computed
 * @properties {string} computed.viewBox - return SVG viewBox
 * @fires update-sensor
 * @fires update-setting
 * @fires delete-sensor
 * @fires flip-side
 */
export default {
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
    };
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`;
    },
  },

  methods: {
    updateSensor(...args) {
      this.$emit('update-sensor', ...args);
    },

    updateSetting(...args) {
      this.$emit('update-setting', ...args);
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args);
    },

    flipSide(value) {
      this.$emit('flip-side', value);
    },
  },

  watch: {
    sensor: {
      handler(sensor) {
        try {
          this.updatedSensor = JSON.parse(sensor);
        } catch (e) {
          this.updatedSensor = null;
        }
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
  },
};
