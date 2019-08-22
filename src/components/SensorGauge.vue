<template lang="html">
  <!--  GAUGES inspired from https://github.com/hongkiat/svg-meter-gauge -->
  <svg
    v-if="updatedSensor.type && hasRightType(updatedSensor.type)"
    :ref="`gaugeContainer-${updatedSensor.id}`"
    :viewBox="viewBox"
    :height="updatedHeight"
    :width="updatedWidth"
    :class="`sensor-gauge ${gaugeClass}`"
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
    <path
      :ref="`dialContainer-${updatedSensor.id}`"
      :class="`${dialClass}`"
      :fill="`none`"
      stroke=""
      :d="dialContainerPath"
    />
    <text
      :id="`valueTextContainer-${updatedSensor.id}`"
      :ref="`valueTextContainer-${updatedSensor.id}`"
      :x="centerX"
      :y="centerY"
      fill="#999"
      :class="`${valueTextClass}`"
    >
      {{ sensorValue }}
    </text>
    <path
      :ref="`valueDialContainer-${updatedSensor.id}`"
      :class="`${valueDialClass}`"
      :d="valueDialContainerPath"
    />
    <g
      :transform="`translate(${updatedWidth / 2.5}, ${updatedHeight / 8})`"
      @click="
        updatedSensor.resources['5650']
          ? updateSensor(updatedSensor, 5650, updatedSensor.resources['5650'])
          : null
      "
    >
      <image
        v-if="displayIcon"
        :transform="`translate(0, ${updatedHeight / 8})`"
        :height="`${updatedHeight / 5.3}`"
        :width="`${updatedWidth / 5}`"
        v-bind="{'xlink:href': updatedSensor.icons[0]}"
        class="sensor-icon"
      />
      <g
        v-if="displayNeedle"
        :transform="
          `rotate(${sensorValue} ${updatedWidth / 2} ${updatedHeight / 2})`
        "
      >
        <image
          :ref="`gaugeNeedle-${updatedSensor.id}`"
          :transform="`translate(0, ${updatedHeight / 8})`"
          :height="`${updatedHeight / 2.28}`"
          :width="`${updatedWidth / 7.5}`"
          class="meter-needle"
          v-bind="{'xlink:href': gaugeNeedle}"
        />
      </g>
      <text
        :ref="`resourcesDescription-${updatedSensor.id}`"
        :transform="`translate(${updatedWidth / 10}, ${updatedHeight / 1.8})`"
        class="sensor-resources"
      >
        <tspan
          :id="`minRangeValue-${updatedSensor.id}`"
          x="0"
          :y="`${updatedHeight / 10}`"
          class="editable-resource"
          @click.prevent.stop="editResourcesField(0, 5603)"
        >
          Min range : {{ minRangeValue }}
        </tspan>
        <tspan
          :id="`maxRangeValue-${updatedSensor.id}`"
          x="0"
          :y="`${(updatedHeight / 10) * 1.4}`"
          class="editable-resource"
          @click.prevent.stop="editResourcesField(1, 5604)"
        >
          Max range : {{ maxRangeValue }}
        </tspan>
        <tspan x="0" :y="`${(updatedHeight / 10) * 1.8}`">
          Min measurment : {{ minMeasuredValue }}
        </tspan>
        <tspan x="0" :y="`${(updatedHeight / 10) * 2.2}`">
          Max measurment : {{ maxMeasuredValue }}
        </tspan>
        <tspan
          :id="`unitResource-${updatedSensor.id}`"
          x="0"
          :y="`${(updatedHeight / 10) * 2.5}`"
          class="editable-resource"
          @click.prevent.stop="editResourcesField(4, 5701)"
        >
          Unit : {{ unitResource }}
        </tspan>
      </text>
    </g>
  </svg>
</template>

<script>
import {
  checkComponentType,
  getValueInPercentage,
  normalizeNumber,
  setRangeColors,
} from '../methods';

/**
 * Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346
 *
 * Resources : input state : 5600, minMeasuredValue 5601, maxMeasuredValue 5602
 *
 * output state : 5650, maxRange : 5604, minRange : 5603, appType 5750, sensorType 5751
 *
 * @module components/SensorGauge
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string[]} sensor - Json stringified sensor instance
 *
 */

export default {
  name: 'SensorGauge',

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
      previousValue: 0,
      gaugeNeedle: '/icons/aloes/meter-gauge-needle.svg',
      startAngle: 135,
      endAngle: 45,
      valueDialClass: 'value',
      valueTextClass: 'value-text',
      dialClass: 'dial',
      gaugeClass: 'sensor-gauge',
      displayValue: true,
      displayIcon: true,
      displayNeedle: false,
      gaugeColor: true,
      requestAnimationFrame: cb => {
        return setTimeout(cb, 1000 / 60);
      },
    };
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`;
    },
    radius() {
      return Number(this.updatedWidth) / 2.5;
    },
    centerX() {
      return this.updatedWidth / 2;
    },
    centerY() {
      return this.updatedHeight / 1.8;
    },
    minMeasuredValue: {
      get() {
        if (!this.updatedSensor.resources['5601']) return null;
        return this.updatedSensor.resources['5601'];
      },
      set(value) {
        this.updatedSensor.resources['5601'] = Number(value);
      },
    },
    maxMeasuredValue: {
      get() {
        if (!this.updatedSensor.resources['5602']) return null;
        return this.updatedSensor.resources['5602'];
      },
      set(value) {
        this.updatedSensor.resources['5602'] = Number(value);
      },
    },
    minRangeValue: {
      get() {
        if (!this.updatedSensor.resources['5603']) return 0;
        return this.updatedSensor.resources['5603'];
      },
      set(value) {
        this.updatedSensor.resources['5603'] = Number(value);
      },
    },
    maxRangeValue: {
      get() {
        if (!this.updatedSensor.resources['5604']) return 100;
        return this.updatedSensor.resources['5604'];
      },
      set(value) {
        this.updatedSensor.resources['5604'] = Number(value);
      },
    },
    mainResourceId() {
      if (this.updatedSensor.type === 3202) return '5600';
      if (this.updatedSensor.type === 3203) return '5650';
      return '5700';
    },
    unitResource: {
      get() {
        return this.updatedSensor.resources['5701'];
      },
      set(value) {
        this.updatedSensor.resources['5701'] = value;
      },
    },
    dialContainerPath() {
      return this.pathString(
        this.radius,
        this.startAngle,
        this.endAngle,
        this.flag(),
      );
    },
    valueDialContainerPath() {
      return this.pathString(this.radius, this.startAngle, this.startAngle);
    },
    sensorValue: {
      get() {
        //  return this.updatedSensor.resources[this.mainResourceId];
        return normalizeNumber(
          this.updatedSensor.resources[this.mainResourceId],
          this.minRangeValue,
          this.maxRangeValue,
        );
      },
      set(value) {
        //  if (!value || value === null) value = 0;
        this.updateValue(value);
      },
    },
    valueInPercentage() {
      return getValueInPercentage(
        this.sensorValue,
        this.minRangeValue,
        this.maxRangeValue,
      );
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
    sensorValue: {
      handler(val) {
        if (!val || val === null) return null;
        if (val < this.minMeasuredValue) {
          this.minMeasuredValue = val;
        } else if (val > this.maxMeasuredValue) {
          this.maxMeasuredValue = val;
        }
        return this.setValueAnimated(val);
      },
      immediate: true,
    },
  },

  mounted() {
    this.elementsMounted = false;
    if (this.startAngle < this.endAngle) {
      const tmp = this.startAngle;
      this.startAngle = this.endAngle;
      this.endAngle = tmp;
    }
    this.$nextTick(() => {
      if (this.hasRightType(this.updatedSensor.type)) {
        this.mountElements();
      }
    });
  },

  beforeDestroy() {
    this.elementsMounted = false;
  },

  methods: {
    hasRightType(type) {
      return checkComponentType('gauge', type);
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

    flipSide(value) {
      this.$emit('flip-side', value);
    },

    mountElements() {
      this.gaugeElement = this.$refs[`gaugeContainer-${this.updatedSensor.id}`];
      this.gaugeValuePath = this.$refs[
        `valueDialContainer-${this.updatedSensor.id}`
      ];
      this.gaugeValueElem = this.$refs[
        `valueTextContainer-${this.updatedSensor.id}`
      ];
      this.resourcesDescription = this.$refs[
        `resourcesDescription-${this.updatedSensor.id}`
      ];
      this.elementsMounted = true;
    },

    editResourcesField(index, resource) {
      if (this.elementsMounted) {
        const tspan = this.resourcesDescription.childNodes[index];
        if (tspan && tspan.id) {
          const resourceValue = tspan.id.split('-')[0];
          const fieldName = tspan.textContent.split(':')[0];
          if (this[resourceValue]) {
            const newValue = prompt(
              `Please enter ${fieldName.trim()}`,
              this[resourceValue],
            );
            if (newValue && newValue !== null) {
              tspan.textContent = `${fieldName.trim()} : ${newValue}`;
              this[resourceValue] = newValue;
              this.updateSetting(this.updatedSensor, resource, newValue);
            }
          }
        }
      }
    },

    label(val) {
      if (!val || val === null) val = 0;
      return Math.round(val);
    },

    flag(val) {
      if (!val || val === null) val = 0;
      return this.angle(val) <= 180 ? 0 : 1;
    },

    angle(val) {
      if (!val || val === null) val = 100;
      return this.getAngle(
        val,
        360 - Math.abs(this.startAngle - this.endAngle),
      );
    },

    updateValue(value) {
      this.updatedSensor.resources[this.mainResourceId] = normalizeNumber(
        value,
        this.minRangeValue,
        this.maxRangeValue,
      );
      //  this.setValueAnimated(value);
    },

    easeInOutCubic(pos) {
      // https://github.com/danro/easing-js/blob/master/easing.js
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    },

    Animation(options) {
      const duration = options.duration;
      let currentIteration = 1;
      const iterations = 60 * duration;
      const start = options.start || 0;
      const end = options.end;
      const change = end - start;
      const step = options.step;
      const easing = options.easing || this.easeInOutCubic;
      const animate = () => {
        const progress = currentIteration / iterations;
        const value = change * easing(progress) + start;
        // console.log(progress + ", " + value);
        step(value, currentIteration);
        currentIteration += 1;
        if (progress < 1) {
          this.requestAnimationFrame(animate);
        }
      };
      this.requestAnimationFrame(animate);
    },

    getAngle(percentage, gaugeSpanAngle) {
      return (percentage * gaugeSpanAngle) / 100;
    },

    getCartesian(cx, cy, radius, angle) {
      const rad = (angle * Math.PI) / 180;
      return {
        x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
        y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000,
      };
    },

    getDialCoords(radius, startAngle, endAngle) {
      const cx = this.centerX;
      const cy = this.centerY;
      return {
        end: this.getCartesian(cx, cy, radius, endAngle),
        start: this.getCartesian(cx, cy, radius, startAngle),
      };
    },

    pathString(radius, startAngle, endAngle, largeArc) {
      const coords = this.getDialCoords(radius, startAngle, endAngle);
      const start = coords.start;
      const end = coords.end;
      const largeArcFlag = typeof largeArc === 'undefined' ? 1 : largeArc;
      return [
        'M',
        start.x,
        start.y,
        'A',
        this.radius,
        this.radius,
        0,
        largeArcFlag,
        1,
        end.x,
        end.y,
      ].join(' ');
    },

    setGaugeColor(value, duration) {
      if (!this.elementsMounted) return null;
      let c = this.gaugeColor;
      c = setRangeColors(value, this.minRangeValue, this.maxRangeValue);
      const dur = duration * 1000;
      const pathTransition = `stroke ${dur} ms ease`;
      const textTransition = `fill ${dur} ms ease`;
      this.gaugeValuePath.style = [
        `stroke: ${c}`,
        `-webkit-transition: ${pathTransition}`,
        `-moz-transition: ${pathTransition}`,
        `transition: ${pathTransition}`,
      ].join(';');

      this.gaugeValueElem.style = [
        `fill: ${c}`,
        `-webkit-transition: ${textTransition}`,
        `-moz-transition: ${textTransition}`,
        `transition: ${textTransition}`,
      ].join(';');
    },

    setValueAnimated(value, duration) {
      if (!this.elementsMounted || this.previousValue === value) {
        return;
      }
      if (this.gaugeColor) {
        this.setGaugeColor(value, duration);
      }
      this.previousValue = value;
      this.Animation({
        start: this.previousValue || 0,
        end: value,
        duration: duration || 1,
        step: (val, frame) => this.updateGauge(val, frame),
      });
    },

    updateGauge(sensorValue) {
      if (!this.elementsMounted) return null;
      // this is because we are using arc greater than 180deg
      const value = getValueInPercentage(
        sensorValue,
        this.minRangeValue,
        this.maxRangeValue,
      );
      if (this.displayValue) {
        this.gaugeValueElem.textContent = this.label(sensorValue);
      }
      if (sensorValue > this.maxRangeValue) return;
      if (sensorValue < this.minRangeValue) return;
      this.gaugeValuePath.setAttribute(
        'd',
        this.pathString(
          this.radius,
          this.startAngle,
          this.angle(value) + this.startAngle,
          this.flag(value),
        ),
      );
    },
  },
};
</script>
