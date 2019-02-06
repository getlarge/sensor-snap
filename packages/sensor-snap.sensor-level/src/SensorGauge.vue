<template lang="html">
  <!--  GAUGES inspired from https://github.com/hongkiat/svg-meter-gauge -->
  <!-- Analog input / output
        *input state : 5600, minMeasuredValue 5601, maxMeasuredValue 5602, 
        *output state : 5650, maxRange : 5604, minRange : 5603, appType 5750, sensorType 5751-->
  <!-- CATCH 3300 until 3305 - 3315 - 3316 until 3330 - 3346-->
  <!--       v-if="updatedSensor.resources['5700']" -->
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
      :class="`dial ${dialClass}`"
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
      :class="`value-text ${valueTextClass}`"
    />
    <path
      :ref="`valueDialContainer-${updatedSensor.id}`"
      :class="`value ${valueDialClass}`"
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
        :transform="`translate(0, ${updatedHeight / 8})`"
        :height="`${updatedHeight / 5.3}`"
        :width="`${updatedWidth / 5}`"
        v-bind="{ 'xlink:href': updatedSensor.icons[0] }"
        class="sensor-icon"
      />
      <g
        v-if="displayNeedle"
        :transform="`rotate(${value} ${updatedWidth / 2} ${updatedHeight / 2})`"
      >
        <image
          :ref="`gaugeNeedle-${updatedSensor.id}`"
          :transform="`translate(0, ${updatedHeight / 8})`"
          :height="`${updatedHeight / 2.28}`"
          :width="`${updatedWidth / 7.5}`"
          class="meter-needle"
          v-bind="{ 'xlink:href': gaugeNeedle }"
        />
      </g>
      <text
        :transform="`translate(${updatedWidth / 10}, ${updatedHeight / 1.8})`"
        class="sensor-resources"
      >
        <tspan x="0" :y="`${updatedHeight / 10}`">
          Min range : {{ minRangeValue }}
        </tspan>
        <tspan x="0" :y="`${(updatedHeight / 10) * 1.4}`">
          Max range : {{ maxRangeValue }}
        </tspan>
        <tspan x="0" :y="`${(updatedHeight / 10) * 1.8}`">
          Min measurment : {{ minMeasuredValue }}
        </tspan>
        <tspan x="0" :y="`${(updatedHeight / 10) * 2.2}`">
          Max measurment : {{ maxMeasuredValue }}
        </tspan>
        <tspan x="0" :y="`${(updatedHeight / 10) * 2.5}`">
          Unit : {{ resourceUnit }}
        </tspan>
      </text>
    </g>
  </svg>
</template>

<script>
/* eslint-disable no-console */
import componentsSchemas from './assets/components-list'

export default {
  name: 'SensorGauge',

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
    },
    startAngle: {
      type: Number,
      default: 135
    },
    endAngle: {
      type: Number,
      default: 45
    },
    valueDialClass: {
      type: String,
      default: 'value'
    },
    valueTextClass: {
      type: String,
      default: 'value-text'
    },
    dialClass: {
      type: String,
      default: 'dial'
    },
    gaugeClass: {
      type: String,
      default: 'sensor-gauge'
    }
  },

  data() {
    return {
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      aSide: true,
      previousValue: 0,
      gaugeNeedle: '/icons/aloes/meter-gauge-needle.svg',
      displayValue: true,
      displayNeedle: false,
      gaugeColor: true,
      requestAnimationFrame: cb => {
        return setTimeout(cb, 1000 / 60)
      }
    }
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`
    },
    radius() {
      return Number(this.updatedWidth) / 2.5
    },
    centerX() {
      return this.updatedWidth / 2
    },
    centerY() {
      return this.updatedHeight / 1.8
    },
    minMeasuredValue: {
      get() {
        if (!this.updatedSensor.resources['5601']) return null
        return this.updatedSensor.resources['5601']
      },
      set(value) {
        this.updatedSensor.resources['5601'] = Number(value)
      }
    },
    maxMeasuredValue: {
      get() {
        if (!this.updatedSensor.resources['5602']) return null
        return this.updatedSensor.resources['5602']
      },
      set(value) {
        this.updatedSensor.resources['5602'] = Number(value)
      }
    },
    minRangeValue: {
      get() {
        if (!this.updatedSensor.resources['5603']) return 0
        return this.updatedSensor.resources['5603']
      },
      set(value) {
        this.updatedSensor.resources['5603'] = Number(value)
      }
    },
    maxRangeValue: {
      get() {
        if (!this.updatedSensor.resources['5604']) return 100
        return this.updatedSensor.resources['5604']
      },
      set(value) {
        this.updatedSensor.resources['5604'] = Number(value)
      }
    },
    mainResourceId() {
      if (this.updatedSensor.type === 3202) return '5600'
      if (this.updatedSensor.type === 3203) return '5650'
      return '5700'
    },
    resourceUnit() {
      return this.updatedSensor.resources['5701']
    },
    dialContainerPath() {
      return this.pathString(
        this.radius,
        this.startAngle,
        this.endAngle,
        this.flag()
      )
    },
    valueDialContainerPath() {
      return this.pathString(this.radius, this.startAngle, this.startAngle)
    },
    value: {
      get() {
        return this.updatedSensor.resources[this.mainResourceId]
        //  return this.normalize(this.value, this.minRangeValue, this.maxRangeValue);
      },
      set(value) {
        if (value < this.minMeasuredValue) {
          this.minMeasuredValue = value
        } else if (value > this.maxMeasuredValue) {
          this.maxMeasuredValue = value
        }

        this.updatedSensor.resources[this.mainResourceId] = this.normalize(
          value,
          this.minRangeValue,
          this.maxRangeValue
        )
      }
    },
    valueInPercentage() {
      return this.getValueInPercentage(
        this.value,
        this.minRangeValue,
        this.maxRangeValue
      )
    }
  },

  watch: {
    sensor: {
      handler(sensor) {
        this.updatedSensor = JSON.parse(sensor)
      },
      immediate: true
    },
    width: {
      handler(width) {
        this.updatedWidth = width
      },
      immediate: true
    },
    height: {
      handler(height) {
        this.updatedHeight = height
      },
      immediate: true
    },
    value: {
      handler(value) {
        console.log(value)
        if (!value || value === null) value = 0
        // if (value === this.value) {
        //   return;
        // }
        this.setValueAnimated(value)
        this.previousValue = value
      },
      immediate: true
    }
  },

  mounted() {
    console.log('sensor-gauge mounted()', this.updatedSensor, this.value)
    this.elementsMounted = false
    if (this.startAngle < this.endAngle) {
      const tmp = this.startAngle
      this.startAngle = this.endAngle
      this.endAngle = tmp
    }

    if (this.hasRightType(this.updatedSensor.type)) {
      this.mountElements()
    }
  },

  beforeDestroy() {
    this.elementsMounted = false
  },

  methods: {
    hasRightType(type) {
      return componentsSchemas.gauge.list.find(objectId => objectId === type)
    },

    updateSensor(...args) {
      this.$emit('update-sensor', ...args)
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args)
    },

    flipSide(value) {
      this.$emit('flip-side', value)
    },

    mountElements() {
      this.gaugeElement = this.$refs[`gaugeContainer-${this.updatedSensor.id}`]
      this.gaugeValuePath = this.$refs[
        `valueDialContainer-${this.updatedSensor.id}`
      ]
      this.gaugeValueElem = this.$refs[
        `valueTextContainer-${this.updatedSensor.id}`
      ]
      this.elementsMounted = true
    },

    label(val) {
      if (!val || val === null) val = 0
      return Math.round(val)
    },

    flag(val) {
      if (!val || val === null) val = 0
      return this.angle(val) <= 180 ? 0 : 1
    },

    angle(val) {
      if (!val || val === null) val = 100
      return this.getAngle(val, 360 - Math.abs(this.startAngle - this.endAngle))
    },

    easeInOutCubic(pos) {
      // https://github.com/danro/easing-js/blob/master/easing.js
      if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3)
      return 0.5 * (Math.pow(pos - 2, 3) + 2)
    },

    Animation(options) {
      const duration = options.duration
      let currentIteration = 1
      const iterations = 60 * duration
      const start = options.start || 0
      const end = options.end
      const change = end - start
      const step = options.step
      const easing = options.easing || this.easeInOutCubic
      const animate = () => {
        const progress = currentIteration / iterations
        const value = change * easing(progress) + start
        // console.log(progress + ", " + value);
        step(value, currentIteration)
        currentIteration += 1
        if (progress < 1) {
          this.requestAnimationFrame(animate)
        }
      }
      this.requestAnimationFrame(animate)
    },

    normalize(value, min, limit) {
      const val = Number(value)
      if (val > limit) return limit
      if (val < min) return min
      return val
    },

    getAngle(percentage, gaugeSpanAngle) {
      return (percentage * gaugeSpanAngle) / 100
    },

    getValueInPercentage(value, min, max) {
      const newMax = max - min
      const newVal = value - min
      return (100 * newVal) / newMax
      // var absMin = Math.abs(min);
      // return 100 * (absMin + value) / (max + absMin);
    },

    getCartesian(cx, cy, radius, angle) {
      const rad = (angle * Math.PI) / 180
      return {
        x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
        y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000
      }
    },

    getDialCoords(radius, startAngle, endAngle) {
      const cx = this.centerX
      const cy = this.centerY
      return {
        end: this.getCartesian(cx, cy, radius, endAngle),
        start: this.getCartesian(cx, cy, radius, startAngle)
      }
    },

    pathString(radius, startAngle, endAngle, largeArc) {
      const coords = this.getDialCoords(radius, startAngle, endAngle)
      const start = coords.start
      const end = coords.end
      const largeArcFlag = typeof largeArc === 'undefined' ? 1 : largeArc
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
        end.y
      ].join(' ')
    },

    setGaugeColor(value, duration) {
      if (!this.elementsMounted) return null
      let c = this.gaugeColor
      if (value < this.minRangeValue) {
        c = componentsSchemas.gauge.colors.secondaryColor
      } else if (value < this.maxRangeValue + this.minRangeValue / 2) {
        c = componentsSchemas.gauge.colors.successColor
      } else if (value < this.maxRangeValue) {
        c = componentsSchemas.gauge.colors.warningColor
      } else {
        c = componentsSchemas.gauge.colors.dangerColor
      }
      const dur = duration * 1000
      const pathTransition = `stroke ${dur} ms ease`
      const textTransition = `fill ${dur} ms ease`
      this.gaugeValuePath.style = [
        `stroke: ${c}`,
        `-webkit-transition: ${pathTransition}`,
        `-moz-transition: ${pathTransition}`,
        `transition: ${pathTransition}`
      ].join(';')

      this.gaugeValueElem.style = [
        `fill: ${c}`,
        `-webkit-transition: ${textTransition}`,
        `-moz-transition: ${textTransition}`,
        `transition: ${textTransition}`
      ].join(';')
    },

    updateValue(value) {
      this.value = value
      if (this.gaugeColor) {
        this.setGaugeColor(this.value, 0)
      }
      this.updateGauge(this.value)
    },

    setValueAnimated(value, duration) {
      if (this.previousValue === this.value) {
        return
      }
      if (this.gaugeColor) {
        this.setGaugeColor(this.value, duration)
      }
      this.Animation({
        start: this.previousValue || 0,
        end: this.value,
        duration: duration || 1,
        step: (val, frame) => {
          this.updateGauge(val, frame)
        }
      })
    },

    updateGauge(theValue) {
      if (!this.elementsMounted) return null
      // this is because we are using arc greater than 180deg
      const value = this.getValueInPercentage(
        theValue,
        this.minRangeValue,
        this.maxRangeValue
      )
      if (this.displayValue) {
        this.gaugeValueElem.textContent = this.label(theValue)
      }
      if (this.value > this.maxRangeValue) return
      if (this.value < this.minRangeValue) return
      this.gaugeValuePath.setAttribute(
        'd',
        this.pathString(
          this.radius,
          this.startAngle,
          this.angle(value) + this.startAngle,
          this.flag(value)
        )
      )
    }
  }
}
</script>
