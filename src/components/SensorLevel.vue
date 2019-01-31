<template lang="html">
  <!-- inspired from https://github.com/lmgonzalves/elastic-range-input -->
  <!-- LEVEL
      output state : 5850,  dimmer  : 5851, on time: 5852, UNIT : 5701 appType 5750-->
  <svg
    v-if="hasRightType(updatedSensor.type)"
    :ref="`rangeWrapper-${updatedSensor.id}`"
    :width="updatedWidth"
    :height="updatedHeight"
    :viewBox="viewBox"
    class="sensor-level"
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
    <g :transform="`translate(0, ${updatedHeight / 4.8})`">
      <defs>
        <symbol
          :id="`rangeMarks-${updatedSensor.id}`"
          shape-rendering="crispEdges"
        >
          <path
            v-for="gradient in gradients"
            :key="gradient.pos"
            class="range-marks-path"
            :d="
              `M ${updatedWidth / gradient.margin} ${gradientHeight(
                gradient.pos
              )} l ${updatedWidth / gradient.width} 0`
            "
          ></path>
        </symbol>
        <!-- This clipPath element will allow us to hide/show the white marks properly -->
        <!-- The `path` used here is an exact copy of the `path` used for the slider below -->
        <clipPath
          :id="`rangeSliderClipPath-${updatedSensor.id}`"
          :ref="`rangeSliderClipPath-${updatedSensor.id}`"
          x="0"
          y="0"
        >
          <path class="range-slider-path" :d="newPath"></path>
        </clipPath>
      </defs>
      <use
        v-bind="{ 'xlink:href': `#rangeMarks-${updatedSensor.id}` }"
        class="range-marks-colored"
      ></use>
      <!-- Slider `path`, that will be morphed properly on user interaction -->
      <path class="range-slider-path" :d="newPath"></path>
      <!--  :d="`M 0 ${updatedHeight} l ${updatedWidth} 0 l 0 ${updatedHeight} l -${updatedWidth} 0 Z`" -->
      <use
        v-bind="{ 'xlink:href': `#rangeMarks-${updatedSensor.id}` }"
        class="range-marks-white"
        :clip-path="`url(#rangeSliderClipPath-${updatedSensor.id})`"
      ></use>
    </g>
    <g
      :ref="`rangeValues-${updatedSensor.id}`"
      class="range-values"
      :transfrom="`translateY(${rangeHeight - currentY}px)`"
    >
      <text
        :ref="`rangeValueTop-${updatedSensor.id}`"
        :transform="`scale(${1 - scale})`"
        :y="updatedHeight / 5.5"
        class="range-value range-value--top"
      >
        <tspan class="range-value-number range-value-number--top"></tspan>
        <tspan class="range-value-text range-value-text--top">
          <tspan>{{ rangeMax - rangeValue }}</tspan>
        </tspan>
      </text>
      <text
        :ref="`rangeValueBottom-${updatedSensor.id}`"
        :transform="`scale(${1 - (scaleMax - scale)})`"
        :y="updatedHeight / 3.5"
        class="rang-value range-value--bottom"
      >
        <tspan class="range-value-number range-value-number--bottom"></tspan>
        <tspan class="range-value-text range-value-text--bottom">
          <tspan>{{ rangeValue }}</tspan>
        </tspan>
      </text>
    </g>
  </svg>
</template>

<script>
/* eslint-disable no-console */
import anime from "@/lib/anime";
import componentsSchemas from "@/assets/components-list";

export default {
  name: "SensorLevel",

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
    }
  },

  data() {
    return {
      animeScript: null,
      updatedSensor: null,
      updatedWidth: null,
      updatedHeight: null,
      aSide: true,
      rangeWrapper: null,
      rangeValues: null,
      rangeSliderPaths: null,
      mouseX: 0,
      mouseY: 0,
      mouseInitialY: 0,
      mouseDy: 0,
      mouseDyLimit: 150,
      mouseDyFactor: 3,
      currentY: 0,
      scaleMax: 0.3,
      lastMouseDy: null,
      rangeWrapperLeft: null,
      pageX: 0,
      pageY: 0,
      loading: false,
      gradients: [
        { margin: 1.19, width: 14, pos: 15 },
        { margin: 1.17, width: 18, pos: 14 },
        { margin: 1.16, width: 21, pos: 13 },
        { margin: 1.15, width: 25, pos: 12 },
        { margin: 1.15, width: 25, pos: 11 },
        { margin: 1.15, width: 25, pos: 10 },
        { margin: 1.15, width: 25, pos: 9 },
        { margin: 1.15, width: 25, pos: 8 },
        { margin: 1.15, width: 25, pos: 7 },
        { margin: 1.15, width: 25, pos: 6 },
        { margin: 1.15, width: 25, pos: 5 },
        { margin: 1.15, width: 25, pos: 4 },
        { margin: 1.16, width: 21, pos: 3 },
        { margin: 1.17, width: 18, pos: 2 },
        { margin: 1.19, width: 14, pos: 1 }
      ]
    };
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`;
    },
    rangeHeight() {
      return this.updatedHeight - this.updatedHeight / 6;
    },
    rangeValue: {
      get() {
        return this.updatedSensor.resources["5851"];
      },
      set(value) {
        this.updatedSensor.resources["5851"] = parseInt(value);
      }
    },
    rangeMin() {
      if (!this.updatedSensor || !this.updatedSensor.resources) return 0;
      if (this.updatedSensor.resources["5701"] === "%") return 0;
      return 0;
    },
    rangeMax() {
      if (!this.updatedSensor || !this.updatedSensor.resources) return 100;
      if (this.updatedSensor.resources["5701"] === "%") return 100;
      return 100;
    },
    rangeMinY() {
      return (this.rangeHeight * this.rangeMin) / this.rangeMax;
    },
    rangeMaxY() {
      return (this.rangeHeight * this.rangeMax) / this.rangeMax;
    },
    scale() {
      const scale =
        ((this.rangeValue - this.rangeMin) / (this.rangeMax - this.rangeMin)) *
        this.scaleMax;
      return scale;
    },
    newSliderY() {
      return this.currentY + this.lastMouseDy / this.mouseDyFactor;
    },
    newY() {
      return this.currentY + this.mouseY - this.pageY;
    },
    newPath() {
      return this.buildPath(
        this.lastMouseDy,
        this.rangeHeight - this.newSliderY
      );
    }
  },

  watch: {
    sensor: {
      handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true
    },
    width: {
      handler(width) {
        this.updatedWidth = width;
      },
      immediate: true
    },
    height: {
      handler(height) {
        this.updatedHeight = height;
        //  this.rangeHeight = height - height / 6;
      },
      immediate: true
    }
  },

  created() {},

  mounted() {
    this.rangeWrapper = this.$refs[`rangeWrapper-${this.updatedSensor.id}`];
    this.rangeValues = this.$refs[`rangeValues-${this.updatedSensor.id}`];
    this.rangeSliderPaths = document.querySelectorAll(".range-slider-path");
    // todo define parseInt accuracy based on oma unit resource [5701]
    this.currentY = (this.rangeHeight * this.rangeValue) / this.rangeMax;
    this.$nextTick(() => {
      this.setListeners();
      this.updateValue();
    });
  },

  beforeDestroy() {
    this.rangeWrapper = null;
    this.rangeValues = null;
    this.rangeSliderPaths = null;
    this.removeEventListeners();
  },

  methods: {
    hasRightType(type) {
      return componentsSchemas.level.list.find(objectId => objectId === type);
    },

    gradientHeight(x) {
      return this.rangeHeight - (this.rangeHeight / 15) * x;
    },

    buildPath(dy, ty) {
      if (!dy || dy === null) dy = 0;
      if (!ty || ty === null) ty = 0;
      return `M 0 ${ty} q ${this.mouseX} ${dy} ${this.updatedWidth} 0 l 0 ${
        this.updatedHeight
      } l -${this.updatedWidth} 0 Z`;
    },

    updateValue() {
      anime.remove([
        this.rangeValues,
        this.rangeSliderPaths[0],
        this.rangeSliderPaths[1]
      ]);
      this.rangeValue = parseInt(
        (this.currentY * this.rangeMax) / this.rangeHeight
      );
      // Some maths calc
      if (Math.abs(this.mouseDy) < this.mouseDyLimit) {
        this.lastMouseDy = this.mouseDy;
      } else {
        this.lastMouseDy =
          this.mouseDy < 0 ? -this.mouseDyLimit : this.mouseDyLimit;
      }
      if (
        this.newSliderY < this.rangeMinY ||
        this.newSliderY > this.rangeMaxY
      ) {
        this.newSliderY =
          this.newSliderY < this.rangeMinY ? this.rangeMinY : this.rangeMaxY;
      }
    },

    // Function to simulate the elastic behavior
    elasticRelease() {
      // Morph the paths to the opposite direction, to simulate a strong elasticity
      anime({
        targets: this.rangeSliderPaths,
        d: this.buildPath(
          -this.lastMouseDy * 1.3,
          this.rangeHeight -
            (this.currentY - this.lastMouseDy / this.mouseDyFactor)
        ),
        duration: 150,
        easing: "linear",
        complete: () => {
          // Morph the paths to the normal state, using the `elasticOut` easing function (default)
          anime({
            targets: this.rangeSliderPaths,
            d: this.buildPath(0, this.rangeHeight - this.currentY),
            duration: 4000,
            elasticity: 500
          });
        }
      });

      // Translate the values to the opposite direction, to simulate a strong elasticity
      anime({
        targets: this.rangeValues,
        translateY:
          this.rangeHeight -
          (this.currentY + this.lastMouseDy / this.mouseDyFactor / 4),
        duration: 150,
        easing: "linear",
        complete: () => {
          anime({
            targets: this.rangeValues,
            translateY: this.rangeHeight - this.currentY,
            duration: 4000,
            elasticity: 500
          });
        }
      });
    },

    // Handle `mousedown` and `touchstart` events, saving data about mouse position
    mouseDown(e) {
      this.mouseY = this.mouseInitialY = e.targetTouches
        ? e.targetTouches[0].pageY
        : e.pageY;
      this.rangeWrapperLeft = this.rangeWrapper.getBoundingClientRect().left;
    },

    mouseMove(e) {
      if (this.mouseY) {
        this.pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
        this.pageY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
        this.mouseX = this.pageX - this.rangeWrapperLeft;
        this.mouseDy = (this.pageY - this.mouseInitialY) * this.mouseDyFactor;
        //  this.newY = this.currentY + this.mouseY - this.pageY;
        if (this.newY >= this.rangeMinY && this.newY <= this.rangeMaxY) {
          this.currentY = this.newY;
          this.mouseY = this.pageY;
        } else {
          this.currentY =
            this.newY < this.rangeMinY ? this.rangeMinY : this.rangeMaxY;
        }
        this.updateValue();
      }
    },

    mouseUp() {
      if (this.mouseDy) {
        this.elasticRelease();
        setTimeout(() => {
          if (this.loading) return null;
          this.loading = true;
          this.updateSensor(this.updatedSensor, 5851, this.rangeValue);
        }, 150);
      }
      this.mouseY = this.mouseDy = 0;
    },

    setListeners() {
      this.rangeWrapper.addEventListener("mousedown", this.mouseDown);
      this.rangeWrapper.addEventListener("touchstart", this.mouseDown);
      this.rangeWrapper.addEventListener("mousemove", this.mouseMove);
      this.rangeWrapper.addEventListener("touchmove", this.mouseMove);
      this.rangeWrapper.addEventListener("mouseup", this.mouseUp);
      this.rangeWrapper.addEventListener("mouseleave", this.mouseUp);
      this.rangeWrapper.addEventListener("touchend", this.mouseUp);
    },

    removeEventListeners() {
      if (this.rangeWrapper) {
        this.rangeWrapper.removeEventListener("mousedown", this.mouseDown);
        this.rangeWrapper.removeEventListener("touchstart", this.mouseDown);
        this.rangeWrapper.removeEventListener("mousemove", this.mouseMove);
        this.rangeWrapper.removeEventListener("touchmove", this.mouseMove);
        this.rangeWrapper.removeEventListener("mouseup", this.mouseUp);
        this.rangeWrapper.removeEventListener("mouseleave", this.mouseUp);
        this.rangeWrapper.removeEventListener("touchend", this.mouseUp);
      }
    },

    updateSensor(...args) {
      this.$emit("update-sensor", ...args);
      this.loading = false;
    },

    deleteSensor(...args) {
      this.$emit("delete-sensor", ...args);
    },

    flipSide(value) {
      this.$emit("flip-side", value);
    }
  }
};
</script>
