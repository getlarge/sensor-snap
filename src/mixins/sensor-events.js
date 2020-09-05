/**
 * Mixin used in every component
 *
 * @module mixins/SensorEvents
 * @vue-prop {number} [width] - Component width
 * @vue-prop {number} [height] - Component height
 * @vue-prop {string} sensor - Json stringified sensor instance
 * @vue-data {object} updatedSensor
 * @vue-data {number} updatedHeight
 * @vue-data {number} updatedWidth
 * @vue-data {boolean} aSide - Indicate widget side
 * @vue-data {boolean} elementsMounted - Indicate if DOM elements are mounted
 * @vue-computed {string} viewBox - return SVG viewBox
 * @method {void} updateSensor
 * @vue-event {void} update-sensor
 * @method {void} updateSetting
 * @vue-event {void} update-setting
 * @method {void} deleteSensor
 * @vue-event {void} delete-sensor
 * @method {void} flipSide
 * @vue-event {void} flip-side
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
