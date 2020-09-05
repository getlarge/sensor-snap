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
      <rect
        x="0"
        :y="updatedHeight / 3"
        :height="updatedWidth / 1.5"
        :width="updatedWidth / 1.2"
        class="sensor-value"
        @click.prevent.stop="editTextInput()"
      />

      <text
        :id="`textResource-${updatedSensor.id}`"
        :ref="`sensorValue-${updatedSensor.id}`"
        :y="updatedHeight / 3"
        x="0"
        class="sensor-value"
        @click.prevent.stop="editTextInput()"
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
import SensorEvents from '@/mixins/sensor-events';

/**
 * @module components/SensorText
 * @description Child component called when Object Id : 3341
 * @description Resources : text : 5527, X coord : 5528, Y coord : 5529, clear Display : 5530, contrast : 5531
 * @description max X : 5545, max Y: 5546, level control: 5548, switch : 5850, appType 5750
 * @properties {string} name
 * @properties {object} data
 * @properties {object} computed
 * @properties {object} methods
 */
export default {
  name: 'SensorText',

  mixins: [SensorEvents],

  data() {
    return {
      textInput: null,
      textWidth: this.$props.width / 2,
      textContent: null,
      charNumber: 25,
    };
  },

  computed: {
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
    textResource: {
      handler(newValue) {
        if (newValue.length > this.charNumber) {
          this.textContent = [];
          for (let i = 0; i < newValue.length; i += this.charNumber) {
            const start = newValue.slice(i, i + this.charNumber);
            //  const index = newValue.indexOf(' ', i + this.charNumber - 8);
            //  const afterSpace = newValue.slice(i, index);
            this.textContent.push(start);
          }
        } else {
          this.textContent = [newValue];
        }
        if (this.elementsMounted) {
          this.textInput.style.fill = 'black';
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
    mountElements() {
      //  this.sensorValue = this.$refs[`sensorValue-${this.updatedSensor.id}`];
      this.textInput = document.getElementById(
        `textResource-${this.updatedSensor.id}`,
      );
      this.elementsMounted = true;
    },

    editTextInput() {
      if (!this.elementsMounted) {
        return null;
      }
      const fieldName = this.textInput.id.split('-')[0];
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
        this.textInput.style.fill = 'transparent';
        return this.updateSensor(this.updatedSensor, 5527, newValue);
      }
      return null;
    },

    spanHeight(index) {
      return this.updatedHeight / 3.5 + (this.updatedHeight / 15) * (index + 1);
    },
  },
};
</script>
