<template lang="html">
  <svg
    v-if="updatedSensor.type && updatedSensor.type === 3341"
    :viewBox="viewBox"
    :height="updatedHeight"
    :width="updatedWidth"
    class="sensor-text"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
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
    <g>
      <text
        :id="`textResource-${updatedSensor.id}`"
        :ref="`sensorValue-${updatedSensor.id}`"
        :y="updatedHeight / 3"
        x="0"
        class="sensor-value"
        @click.prevent.stop="editSensorValue()"
      >
        <tspan
          v-for="(elem, index) in textContent"
          :key="index"
          :textLength="updatedWidth"
          lengthAdjust="spacing"
          :y="spanHeight(index)"
          :x="updatedWidth / 50"
        >
          {{ elem }}
        </tspan>
      </text>
    </g>
  </svg>
</template>

<script>
//  import {getComponentResource} from '../methods';

/**
 * Child component called when Object Id : 3341
 *
 * Resources : text : 5527, X coord : 5528, Y coord : 5529, clear Display : 5530, contrast : 5531
 *
 * max X : 5545, max Y: 5546, level control: 5548, switch : 5850, appType 5750
 *
 * @module components/SensorText
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string[]} sensor - Json stringified sensor instance
 */
export default {
  name: 'SensorText',

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
      updatedWidth: null,
      updatedHeight: null,
      aSide: true,
      elementsMounted: false,
      sensorValue: null,
      textWidth: this.$props.width / 2,
      textContent: null,
      charNumber: 25,
    };
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`;
    },
    textResource: {
      get() {
        return this.updatedSensor.resources['5527'];
      },
      set(value) {
        this.updatedSensor.resources['5527'] = value;
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
    textResource: {
      handler(newValue) {
        if (newValue.length > this.charNumber) {
          this.textContent = [];
          for (let i = 0; i < newValue.length; i += this.charNumber) {
            const start = newValue.slice(i, i + this.charNumber);
            //  const index = newValue.indexOf(' ', i + this.charNumber - 8);
            //  const afterSpace = newValue.slice(i, index);
            //  console.log('for index', i, index, start);
            this.textContent.push(start);
          }
        } else {
          this.textContent = [newValue];
        }
        if (this.elementsMounted) {
          this.sensorValue.style.fill = 'black';
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.mountElements();
  },

  beforeDestroy() {
    this.elementsMounted = false;
  },

  methods: {
    flipSide(value) {
      this.$emit('flip-side', value);
    },

    updateSensor(...args) {
      this.$emit('update-sensor', ...args);
    },

    updateSetting(...args) {
      this.$emit('update-setting', ...args);
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args);
    },

    mountElements() {
      //  this.sensorValue = this.$refs[`sensorValue-${this.updatedSensor.id}`];
      this.sensorValue = document.getElementById(
        `textResource-${this.updatedSensor.id}`,
      );
      this.elementsMounted = true;
    },

    editSensorValue() {
      try {
        if (!this.elementsMounted) return null;
        const fieldName = this.sensorValue.id.split('-')[0];
        let newValue;
        if (this.textResource) {
          newValue = prompt(
            `Please enter ${fieldName.trim()}`,
            this.textResource.trim(),
          );
        } else {
          newValue = prompt(`Please enter ${fieldName.trim()}`);
        }
        if (newValue && newValue !== null) {
          newValue = newValue.trim();
          this.sensorValue.style.fill = 'transparent';
          return this.updateSensor(this.updatedSensor, 5527, newValue);
        }
        return null;
      } catch (error) {
        return error;
      }
    },

    spanHeight(index) {
      return this.updatedHeight / 3.5 + (this.updatedHeight / 15) * (index + 1);
    },
  },
};
</script>
