<template lang="html">
  <!-- inspired by https://github.com/marianoguerra/svg-color-picker -->
  <svg
    v-if="updatedSensor.type && hasRightType(updatedSensor.type)"
    :id="`sensor-color-${updatedSensor.id}`"
    :viewBox="viewBox"
    :height="updatedHeight"
    :width="updatedWidth"
    class="sensor-color"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <defs>
      <linearGradient :id="setId('light-gradient')">
        <stop
          v-for="(gradient, index) in lightGradientsStops"
          :key="`light-gradient-${index}`"
          :id="setId(gradient.id)"
          :offset="gradient.offset"
          :stop-color="gradient['stop-color']"
          :stop-opacity="gradient['stop-opacity']"
        />
      </linearGradient>
      <linearGradient :id="setId('saturation-gradient')">
        <stop
          v-for="(gradient, index) in saturationGradientsStops"
          :key="`saturation-gradient-${index}`"
          :id="setId(gradient.id)"
          :offset="gradient.offset"
          :stop-color="gradient['stop-color']"
          :stop-opacity="gradient['stop-opacity']"
        />
      </linearGradient>
      <linearGradient :id="setId('hue-gradient')">
        <stop
          v-for="(gradient, index) in hueGradientStops"
          :key="`hue-gradient-${index}`"
          :offset="gradient.offset"
          :stop-color="gradient['stop-color']"
          :stop-opacity="gradient['stop-opacity']"
        />
      </linearGradient>
    </defs>
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
      :transform="`translate(${updatedWidth / 7}, ${updatedHeight / 10})`"
      :r="updatedWidth / 15"
      class="color-button"
      @click.prevent.stop="setColor"
    />
    <circle
      :transform="`translate(${updatedWidth / 1.2}, ${updatedHeight / 10})`"
      :r="`${updatedWidth / 15}`"
      class="delete-button"
      @click="deleteSensor(updatedSensor)"
    />
    <text
      :id="`sensor-color-picker-${updatedSensor.id}`"
      :transform="`translate(${updatedWidth / 2}, ${updatedHeight / 3})`"
      x="0"
      text-anchor="middle"
      class="sensor-value"
    >
      {{ displayColor }}
    </text>
    <g :x="0" v-for="(slider, index) in sliders" :key="`slider-color-${index}`">
      <rect
        :id="slider.barId"
        :x="slider.barX"
        :y="slider.barY"
        :width="slider.barWidth"
        :height="slider.barHeight"
        :style="slider.barStyle"
        @mousedown="fakeHandler"
        @mouseup="slider.barListener"
      />
      <rect
        :id="slider.handleId"
        :x="slider.handleX"
        :y="slider.handleY"
        :width="slider.handleWidth"
        :height="slider.handleHeight"
        :style="slider.handleStyle"
      />
    </g>
    <!--  @mousedown="slider.handleListener"   -->
    <rect
      :id="setId('current-color')"
      :x="colorPickerX + colorPickerWidth + colorPickerHeight"
      :y="colorPickerY"
      :width="colorPickerHeight * 3"
      :height="colorPickerHeight * 5"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      @mousedown="fakeHandler"
    />
    <!-- :fill="hslColor()" -->
  </svg>
</template>

<script>
import {checkComponentType, getComponentResource} from '@/methods';
import SensorEvents from '@/mixins/sensor-events';

/**
 * Child component called when catching this ID : 3335
 *
 * Resources : color unit : 5701, color : 5706 appType 5750
 *
 * @exports components/SensorSwitch
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string[]} sensor - Json stringified sensor instance
 */

const toHex = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

export default {
  name: 'SensorColor',

  mixins: [SensorEvents],

  data() {
    return {
      picker: null,
      newHue: 0,
      newLightness: 50,
      newSaturation: 100,
      displayColor: null,
      sliders: [],
      hueGradientStops: [
        {offset: '0', 'stop-color': '#ffef15', 'stop-opacity': '1'},
        {offset: '0.16105497', 'stop-color': '#60ff18', 'stop-opacity': '1'},
        {offset: '0.35173747', 'stop-color': '#02fff9', 'stop-opacity': '1'},
        {offset: '0.48789391', 'stop-color': '#0202ff', 'stop-opacity': '1'},
        {offset: '0.70091939', 'stop-color': '#fd00ca', 'stop-opacity': '1'},
        {offset: '0.83720928', 'stop-color': '#ff1c1c', 'stop-opacity': '1'},
        {offset: '1', 'stop-color': '#ff0000', 'stop-opacity': '1'},
      ],
      lightGradientsStops: [
        {
          id: 'light-gradient-start',
          offset: '0',
          'stop-color': 'hsl(60, 100%, 0%)',
          'stop-opacity': '1',
        },
        {
          id: 'light-gradient-middle',
          offset: '0.5',
          'stop-color': 'hsl(60, 100%, 50%)',
          'stop-opacity': '1',
        },
        {
          id: 'light-gradient-end',
          offset: '1',
          'stop-color': 'hsl(60, 100%, 100%)',
          'stop-opacity': '1',
        },
      ],
      saturationGradientsStops: [
        {
          id: 'saturation-gradient-start',
          offset: '0',
          'stop-color': 'hsl(60, 0%, 50%)',
          'stop-opacity': '1',
        },
        {
          id: 'saturation-gradient-middle',
          offset: '0.5',
          'stop-color': 'hsl(60, 50%, 50%)',
          'stop-opacity': '1',
        },
        {
          id: 'saturation-gradient-end',
          offset: '1',
          'stop-color': 'hsl(60, 100%, 50%)',
          'stop-opacity': '1',
        },
      ],
    };
  },

  computed: {
    colors() {
      return getComponentResource('color', 'colors');
    },
    color: {
      get() {
        return this.updatedSensor.resources['5706'].trim();
      },
      set(value) {
        this.updatedSensor.resources['5706'] = value.trim();
      },
    },
    unit: {
      get() {
        return this.updatedSensor.resources['5701'] || 'hex';
      },
      set(value) {
        this.updatedSensor.resources['5701'] = value;
      },
    },
    marginX() {
      if (this.container) {
        return parseInt(this.container.getAttribute('x') || '0', 10) || 0;
      }
      return 0;
    },
    parentLeft() {
      if (this.container) {
        return (
          parseInt(this.container.getBoundingClientRect().left || 0, '10') || 0
        );
      }
      return 0;
    },
    parentX() {
      return this.marginX + this.parentLeft;
    },
    colorPickerX() {
      return this.updatedWidth / 10;
    },
    colorPickerY() {
      return this.updatedHeight / 2.5;
    },
    colorPickerWidth() {
      return this.updatedWidth / 2.5;
    },
    colorPickerHeight() {
      return this.updatedHeight / 11;
    },
    handleWidth() {
      return this.updatedWidth / 40;
    },
    xMin() {
      return this.colorPickerX;
    },
    xMax() {
      return this.colorPickerX + this.colorPickerWidth - this.handleWidth;
    },
    range() {
      return this.xMax - this.xMin;
    },
    stroke() {
      return '#000000';
    },
    strokeWidth() {
      return this.updatedHeight / 120;
      // return Math.round(this.updatedHeight / 120);
    },
    fill() {
      return 'hsl(60, 100%, 50%)';
    },
  },

  watch: {
    newHue: {
      handler() {
        if (!this.elementsMounted) return;
        this.updateGradients();
      },
      immediate: true,
    },
    color: {
      handler(color) {
        if (!color) return;
        this.parseColor(color);
        if (this.elementsMounted) {
          this.setHSL(this.newHue, this.newSaturation, this.newLightness);
          // this.setHSL(
          //   (this.newHue / 320 + 55) * this.colorPickerWidth +
          //     this.colorPickerX,
          //   (this.newSaturation / 100) * this.colorPickerWidth +
          //     this.colorPickerX,
          //   (this.newLightness / 100) * this.colorPickerWidth +
          //     this.colorPickerX,
          // );
          this.updateCurrentColor();
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.mountElements();
    this.$nextTick(() => {
      // this.parseColor();
      this.currentColor.style.fill = `hsl(${this.newHue}, ${
        this.newSaturation
      }%, ${this.newLightness}%)`;
      this.setHSL(this.newHue, this.newSaturation, this.newLightness);
      this.displayColor = this.getColorHex();
    });
  },

  beforeDestroy() {
    this.elementsMounted = false;
  },

  methods: {
    hasRightType(type) {
      return checkComponentType('color', type);
    },

    mountElements() {
      this.container = document.getElementById(
        `sensor-color-${this.updatedSensor.id}`,
      );
      this.sliders = [
        {
          barId: this.setId('hue-bar'),
          barX: this.colorPickerX,
          barY: this.colorPickerY,
          barWidth: this.colorPickerWidth,
          barHeight: this.colorPickerHeight,
          barStyle: `fill: url(#${this.setId('hue-gradient')}); stroke:${
            this.stroke
          }; stroke-width: ${this.strokeWidth};`,
          barListener: this.onHueHandleMove,
          handleId: this.setId('hue-handle'),
          handleX: this.colorPickerX,
          handleY: this.colorPickerY - 1,
          handleWidth: this.handleWidth,
          handleHeight: this.colorPickerHeight,
          handleStyle: `stroke: ${this.stroke}; stroke-width: ${
            this.strokeWidth
          }; cursor: pointer;`,
          handleListener: this.onHandleMouseDown,
        },
        {
          barId: this.setId('light-bar'),
          barX: this.colorPickerX,
          barY: this.colorPickerY + this.colorPickerHeight * 2,
          barWidth: this.colorPickerWidth,
          barHeight: this.colorPickerHeight,
          barStyle: `fill: url(#${this.setId('light-gradient')}); stroke:${
            this.stroke
          }; stroke-width: ${this.strokeWidth};`,
          barListener: this.onLightHandleMove,
          handleId: this.setId('light-handle'),
          handleX: this.colorPickerX,
          handleY: this.colorPickerY + this.colorPickerHeight * 2 - 1,
          handleWidth: this.handleWidth,
          handleHeight: this.colorPickerHeight,
          handleStyle: `stroke: ${this.stroke}; stroke-width: ${
            this.strokeWidth
          }; cursor: pointer;`,
          handleListener: this.onHandleMouseDown,
        },
        {
          barId: this.setId('saturation-bar'),
          barX: this.colorPickerX,
          barY: this.colorPickerY + this.colorPickerHeight * 4,
          barWidth: this.colorPickerWidth,
          barHeight: this.colorPickerHeight,
          barStyle: `fill: url(#${this.setId('saturation-gradient')}); stroke:${
            this.stroke
          }; stroke-width: ${this.strokeWidth};`,
          barListener: this.onSaturationHandleMove,
          handleId: this.setId('saturation-handle'),
          handleX: this.colorPickerX,
          handleY: this.colorPickerY + this.colorPickerHeight * 4 - 1,
          handleWidth: this.handleWidth,
          handleHeight: this.colorPickerHeight,
          handleStyle: `stroke: ${this.stroke}; stroke-width: ${
            this.strokeWidth
          }; cursor: pointer;`,
          handleListener: this.onHandleMouseDown,
        },
      ];

      this.lightGradientMiddle = this.getElementById('light-gradient-middle');
      this.saturationGradientMiddle = this.getElementById(
        'saturation-gradient-middle',
      );
      this.saturationGradientEnd = this.getElementById(
        'saturation-gradient-end',
      );
      this.currentColor = this.getElementById('current-color');
      this.elementsMounted = true;
    },

    setId(id) {
      return `${id}-${this.updatedSensor.id}`;
    },

    getElementById(id) {
      return document.getElementById(this.setId(id));
    },

    updateGradients() {
      this.lightGradientMiddle.setAttribute(
        'stop-color',
        'hsl(' + this.newHue + ', 100%, 50%)',
      );
      this.saturationGradientMiddle.setAttribute(
        'stop-color',
        'hsl(' + this.newHue + ', 50%, 50%)',
      );
      this.saturationGradientEnd.setAttribute(
        'stop-color',
        'hsl(' + this.newHue + ', 100%, 50%)',
      );
    },

    onHueHandleMove(evt) {
      const handle = this.getElementById('hue-handle');
      const newX = evt.clientX - this.parentX;
      this.setHandleX(handle, newX);
      this.newHue =
        ((newX - this.colorPickerX) / this.colorPickerWidth) * 320 + 55;
      this.updateCurrentColor();
    },

    onLightHandleMove(evt) {
      const handle = this.getElementById('light-handle');
      const newX = evt.clientX - this.parentX;
      this.setHandleX(handle, newX);
      this.newLightness =
        ((newX - this.colorPickerX) / this.colorPickerWidth) * 100;
      this.updateCurrentColor();
    },

    onSaturationHandleMove(evt) {
      const handle = this.getElementById('saturation-handle');
      const newX = evt.clientX - this.parentX;
      this.setHandleX(handle, newX);
      this.newSaturation =
        ((newX - this.colorPickerX - 2) / this.colorPickerWidth) * 100;
      this.updateCurrentColor();
    },

    setHandleX(handle, x) {
      let id;
      if (x > this.xMax || x < this.xMin) {
        return;
      }
      id = handle.ownerSVGElement.suspendRedraw(1000);
      handle.x.baseVal.value = x;
      handle.ownerSVGElement.unsuspendRedraw(id);
    },

    setHandleValue(handle, value) {
      this.setHandleX(handle, this.colorPickerX + (value / 100.0) * this.range);
    },

    getHandleValue(handle) {
      return (handle.x.baseVal.value - this.colorPickerX) / this.range;
    },

    getFillColor() {
      if (this.elementsMounted) {
        return this.currentColor.style.fill;
      }
      return null;
    },

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      let red = parseInt(result[1], 16);
      let green = parseInt(result[2], 16);
      let blue = parseInt(result[3], 16);
      // console.log('hexToRgb:res', red, green, blue);
      return {red, green, blue};
    },

    rgbToHsl(color) {
      let red = color.red;
      let green = color.green;
      let blue = color.blue;
      // console.log('rgbToHsl:req', red, green, blue);
      (red /= 255), (green /= 255), (blue /= 255);

      const max = Math.max(red, green, blue);
      const min = Math.min(red, green, blue);
      let hue, saturation;
      let lightness = (max + min) / 2;
      if (max === min) {
        hue = saturation = 0; // achromatic
      } else {
        const diff = max - min;
        saturation =
          lightness > 0.5 ? diff / (2 - max - min) : diff / (max + min);
        switch (max) {
          case red:
            hue = (green - blue) / diff + (green < blue ? 6 : 0);
            break;
          case green:
            hue = (blue - red) / diff + 2;
            break;
          case blue:
            hue = (red - green) / diff + 4;
            break;
        }
        hue /= 6;
      }

      hue = hue * 320 * 1.125;
      hue = Math.round(hue);
      saturation = saturation * 100;
      saturation = Math.round(saturation);
      lightness = lightness * 100;
      lightness = Math.round(lightness);
      return {hue, saturation, lightness};
    },

    parseColor() {
      // console.log('parseColor:req', this.unit, this.color);
      if (this.unit === 'hex') {
        const rgbColor = this.hexToRgb(this.color);
        const color = this.rgbToHsl(rgbColor);
        this.newHue = color.hue;
        this.newSaturation = color.saturation;
        this.newLightness = color.lightness;
      } else if (this.unit === 'rgb') {
        const colors = this.color.split(',');
        const rgbColor = {
          red: Number(colors[0].trim()),
          green: Number(colors[1].trim()),
          blue: Number(colors[2].trim()),
        };
        const color = this.rgbToHsl(rgbColor);
        this.newHue = color.hue;
        this.newSaturation = color.saturation;
        this.newLightness = color.lightness;
      } else if (this.unit === 'hsl') {
        const colors = this.color.split(',');
        const color = {
          hue: Number(colors[0].trim()),
          saturation: Number(
            colors[1].substring(0, colors[1].length - 1).trim(),
          ),
          lightness: Number(
            colors[2].substring(0, colors[2].length - 1).trim(),
          ),
        };
        this.newHue = color.hue;
        this.newSaturation = color.saturation;
        this.newLightness = color.lightness;
      }
    },

    getColorRGBArray() {
      const fillColor = this.getFillColor();
      if (fillColor.charAt(0) === '#') {
        const red = fillColor.slice(1, 3);
        const green = fillColor.slice(3, 5);
        const blue = fillColor.slice(5, 7);
        return [parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16)];
      }
      return fillColor
        .slice(4, -1)
        .split(', ')
        .map(item => parseInt(item, 10));
    },

    getColorHex() {
      const fillColor = this.getFillColor();
      if (fillColor.charAt(0) === '#') {
        return fillColor;
      }
      return (
        '#' +
        this.getColorRGBArray()
          .map(item => {
            const value = parseInt(item, 10);
            const first = value % 16;
            const second = Math.floor(value / 16);
            return toHex[second] + toHex[first];
          })
          .join('')
      );
    },

    getColorHSLArray() {
      return [
        this.getHandleValue(this.getElementById('hue-handle')),
        this.getHandleValue(this.getElementById('light-handle')),
        this.getHandleValue(this.getElementById('saturation-handle')),
      ];
    },

    hslColor() {
      return `hsl(${this.newHue}, ${this.newSaturation}%, ${
        this.newLightness
      }%)`;
    },

    getColorHSL() {
      let hue, saturation, light, array;
      array = this.getColorHSLArray();
      hue = ('' + array[0] * 100).slice(0, 8);
      saturation = ('' + array[1] * 100).slice(0, 8) + '%';
      light = ('' + array[2] * 100).slice(0, 8) + '%';
      return 'hsl(' + [hue, saturation, light].join(', ') + ')';
    },

    setHSL(hue, saturation, lightness) {
      this.setHandleValue(this.getElementById('hue-handle'), hue);
      this.setHandleValue(this.getElementById('light-handle'), lightness);
      this.setHandleValue(this.getElementById('saturation-handle'), saturation);
    },

    updateCurrentColor() {
      this.currentColor.style.fill = this.hslColor();
      if (this.elementsMounted) {
        this.displayColor = this.getColorHex();
      }
    },

    setColor() {
      if (this.unit === 'hex') {
        this.color = this.getColorHex();
      } else if (this.unit === 'rgb') {
        this.color = this.getColorRGBArray().toString();
      } else if (this.unit === 'hsl') {
        this.color = this.getColorHSL();
      }
      this.updateSensor(this.updatedSensor, 5706, this.color);
    },

    fakeHandler() {
      return false;
    },

    mousemoveListener(evt) {
      // console.log(
      //   'MOUSEMOVE',
      //   evt.clientX,
      //   evt.layerX,
      //   this.parentX,
      //   this.colorPickerWidth,
      //   evt.clientX - this.parentX,
      //   evt.layerX - this.parentX,
      // );
      this.setHandleX(evt.target, evt.clientX - this.parentX);
    },

    mouseupListener(evt) {
      evt.target.removeEventListener('mousemove', this.mousemoveListener, true);
      evt.target.removeEventListener('mouseup', this.mouseupListener, true);
      // document.removeEventListener('mousemove', this.mousemoveListener, true);
      // document.removeEventListener('mouseup', this.mouseupListener, true);
    },

    onHandleMouseDown(evt) {
      evt.target.addEventListener('mousemove', this.mousemoveListener, true);
      evt.target.addEventListener('mouseup', this.mouseupListener, true);
      // document.addEventListener('mousemove', this.mousemoveListener, true);
      // document.addEventListener('mouseup', this.mouseupListener, true);
    },
  },
};
</script>
