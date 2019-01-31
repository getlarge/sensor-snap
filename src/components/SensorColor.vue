<template lang="html">
  <svg class="sensor-color">
    <!-- CAMERA v-bind="{ 'xlink:href':updatedValue }"
      BITMAP INPUT 5910, BITMAP INPUT RESET 5911,appType 5750-->
    <g
      v-if="updatedSensor.type === 3335"
      transform="translate(10,20)"
      @click="
        updateSensor(updatedSensor, 5706, updatedSensor.resources['5706'])
      "
    >
      <image
        x="0"
        y="0"
        transform="translate(30,25)"
        height="60"
        width="60"
        v-bind="{ 'xlink:href': updatedSensor.icons[0] }"
        class="sensor-icon"
      />
      <!-- add 2 sliders to chose color -->
      <circle
        :stroke="updatedSensor.resources['5706']"
        cx="60"
        cy="60"
        r="60"
        class="sensor-button"
      />
    </g>
  </svg>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "SensorColor",

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
      updatedSensor: null
    };
  },

  computed: {},

  watch: {
    sensor: {
      handler(sensor) {
        this.updatedSensor = JSON.parse(sensor);
      },
      immediate: true
    }
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    checkResourceType() {
      const resourcesKeys = Object.getOwnPropertyNames(this.updatedResources);
      // list updateble resources
      // 5700, 5500, 5706, 5514, 5515, 5701, 5750
      let foundResource = resourcesKeys.find(key => key === "5700");
      if (!foundResource)
        foundResource = resourcesKeys.find(key => key === "5500");
      console.log(foundResource);
      return foundResource;
    },

    updateSensor(...args) {
      //  console.log(sensor.resources);
      this.$emit("update-sensor", ...args);
      return null;
    }

    // INPUT RANGE http://marianoguerra.github.io/svg-color-picker/picker.svg
    // newSvgElement(name, attrs, parent) {
    //   var key,
    //     e = document.createElementNS(this.SVG_NS, name);
    //   for (key in attrs) {
    //     e.setAttribute(key, attrs[key]);
    //   }
    //   if (parent) {
    //     parent.appendChild(e);
    //   }
    //   return e;
    // },

    // newHandle(id, x, y, width, height, stroke, fill, strokeWidth) {
    //   width = width || 5;
    //   height = height || 12;
    //   stroke = stroke || "#000000";
    //   fill = fill || "#ffffff";
    //   strokeWidth = strokeWidth || 1;
    //   return this.newSvgElement("rect", {
    //     id,
    //     x,
    //     y,
    //     width,
    //     height,
    //     style: `stroke: ${stroke}; fill: ${fill}; stroke-width: ${strokeWidth}; cursor: pointer;`,
    //   });
    // },
    // byId(id, parent) {
    //   return (parent || document).getElementById(id);
    // },

    // LinearGradient(id, stops) {
    //   this.gradient = newSvgElement("linearGradient", {
    //     id: id,
    //   });
    //   stops.forEach((stopAttrs) => {
    //     this.gradient.appendChild(newSvgElement("stop", stopAttrs));
    //   });
    // },
    // addToParent(parent) {
    //   parent.appendChild(this.gradient);
    // },
    // mousemoveListener(evt) {
    //   this.setX(evt.clientX - this.parentX);
    // },

    // mouseupListener(evt) {
    //   document.removeEventListener("mousemove", this.mousemoveListener, true);
    //   document.removeEventListener("mouseup", this.mouseupListener, true);
    // },

    // mousedownListener(evt) {
    //   const dx = this.handle.x.baseVal.value - evt.clientX;
    //   document.addEventListener("mousemove", this.mousemoveListener, true);
    //   document.addEventListener("mouseup", this.mouseupListener, true);
    // },

    // initHandle(id, x, y, xMin, xMax, onMove, width, height, parentX) {
    //   this.handle = newHandle(id, x, y, width, height);
    //   this.id = id;
    //   this.x = x;
    //   this.y = y;
    //   this.xMin = xMin;
    //   this.xMax = xMax;
    //   this.range = this.xMax - this.xMin;
    //   this.onMove = onMove;
    //   this.parentX = parentX;
    //   this.handle.addEventListener("mousedown", this.mousedownListener, false);
    // },

    // addToParent(parent) {
    //   parent.appendChild(this.handle);
    // },
    // setX(x) {
    //   var id;
    //   if (x > this.xMax || x < this.xMin) {
    //     return;
    //   }
    //   id = this.handle.ownerSVGElement.suspendRedraw(1000);
    //   this.handle.x.baseVal.value = x;
    //   this.handle.ownerSVGElement.unsuspendRedraw(id);
    //   this.onMove(x);
    // },
    // setValue(value) {
    //   this.setX(this.x + (value / 100.0) * this.range);
    // },
    // getValue() {
    //   return (this.handle.x.baseVal.value - this.x) / this.range;
    // },

    // initRange(id, x, y, width, height, onHandleMove, gradientId, parentX, stroke, strokeWidth) {
    //   this.handle = new this.initHandle(
    //     `${id}-handle`,
    //     x,
    //     y - 1,
    //     x,
    //     x + width - 5,
    //     onHandleMove,
    //     5,
    //     height + 2,
    //     parentX,
    //   );
    //   stroke = stroke || "#000000";
    //   strokeWidth = strokeWidth || 1;
    //   this.range = this.newSvgElement("rect", {
    //     id: id,
    //     x: x,
    //     y: y,
    //     width: width,
    //     height: height,
    //     style: "fill:url(#" + gradientId + "); stroke: " + stroke + "; stroke-width: " + strokeWidth + ";",
    //     onmousedown: "return false",
    //   });
    //   this.range.addEventListener("mouseup", (event) => {
    //     this.handle.handle.x.baseVal.value = event.clientX - parentX;
    //     this.onHandleMove(event.clientX - parentX);
    //   });
    // },

    // addToParent(parent) {
    //   parent.appendChild(this.range);
    //   this.handle.addToParent(parent);
    // },
    // setValue(position) {
    //   this.handle.setValue(position);
    // },
    // getValue() {
    //   return this.handle.getValue();
    // },

    // initColorPicker(container, x, y, newHue, newSaturation, newLightness, width, height) {
    //   var that = this,
    //     stamp = Date.now(),
    //     defs,
    //     parentX = parseInt(container.getAttribute("x") || "0", 10),
    //     hueGradient,
    //     lightGradient,
    //     lightGradientMiddle,
    //     saturationGradient,
    //     saturationGradientMiddle,
    //     saturationGradientEnd;

    //   function ns(id) {
    //     return id + "-" + stamp;
    //   }
    //   width = width || 320;
    //   height = height || 10;
    //   newHue = newHue === undefined ? 0 : newHue;
    //   newLightness = newLightness === undefined ? 50 : newLightness;
    //   newSaturation = newSaturation === undefined ? 100 : newSaturation;

    //   this.currentColor = this.newSvgElement("rect", {
    //     x: x + width + height,
    //     y: y,
    //     width: height * 3,
    //     height: height * 5,
    //     style: "stroke: #000000; fill: hsl(60, 100%, 50%); stroke-width: 1;",
    //     onmousedown: "return false",
    //   });
    //   container.appendChild(this.currentColor);

    //   this.hueBar = new this.Range(ns("hue-bar"), x, y, width, height, onHueHandleMove, ns("hue-gradient"), parentX);
    //   this.lightBar = new this.Range(
    //     ns("light-bar"),
    //     x,
    //     y + height * 2,
    //     width,
    //     height,
    //     onLightHandleMove,
    //     ns("light-gradient"),
    //     parentX,
    //   );
    //   this.saturationBar = new this.Range(
    //     ns("saturation-bar"),
    //     x,
    //     y + height * 4,
    //     width,
    //     height,
    //     onSaturationHandleMove,
    //     ns("saturation-gradient"),
    //     parentX,
    //   );

    //   defs = this.newSvgElement("defs", {}, container);

    //   lightGradient = new this.LinearGradient(ns("light-gradient"), [
    //     {
    //       id: ns("light-gradient-start"),
    //       offset: "0",
    //       "stop-color": "hsl(60, 100%, 0%)",
    //       "stop-opacity": "1",
    //     },
    //     {
    //       id: ns("light-gradient-middle"),
    //       offset: "0.5",
    //       "stop-color": "hsl(60, 100%, 50%)",
    //       "stop-opacity": "1",
    //     },
    //     {
    //       id: ns("light-gradient-end"),
    //       offset: "1",
    //       "stop-color": "hsl(60, 100%, 100%)",
    //       "stop-opacity": "1",
    //     },
    //   ]);

    //   saturationGradient = new this.LinearGradient(ns("saturation-gradient"), [
    //     {
    //       id: ns("saturation-gradient-start"),
    //       offset: "0",
    //       "stop-color": "hsl(60, 0%, 50%)",
    //       "stop-opacity": "1",
    //     },
    //     {
    //       id: ns("saturation-gradient-middle"),
    //       offset: "0.5",
    //       "stop-color": "hsl(60, 50%, 50%)",
    //       "stop-opacity": "1",
    //     },
    //     {
    //       id: ns("saturation-gradient-end"),
    //       offset: "1",
    //       "stop-color": "hsl(60, 100%, 50%)",
    //       "stop-opacity": "1",
    //     },
    //   ]);

    //   hueGradient = new this.LinearGradient(ns("hue-gradient"), hueGradientStops);

    //   hueGradient.addToParent(defs);
    //   lightGradient.addToParent(defs);
    //   saturationGradient.addToParent(defs);

    //   lightGradientMiddle = this.byId(ns("light-gradient-middle"), container);
    //   saturationGradientMiddle = this.byId(ns("saturation-gradient-middle"), container);
    //   saturationGradientEnd = this.byId(ns("saturation-gradient-end"), container);

    //   this.hueBar.addToParent(container);
    //   this.lightBar.addToParent(container);
    //   this.saturationBar.addToParent(container);

    //   this.setHSL(newHue, newSaturation, newLightness);
    // },

    // updateCurrentColor() {
    //   var color = `hsl(${this.newHue},${this.newSaturation}%,${this.newLightness}%)`;
    //   this.currentColor.style.fill = color;
    // },

    // onHueHandleMove(newX) {
    //   this.newHue = ((newX - this.x) / this.width) * 320 + 55;
    //   lightGradientMiddle.setAttribute("stop-color", "hsl(" + this.newHue + ", 100%, 50%)");
    //   saturationGradientMiddle.setAttribute("stop-color", "hsl(" + this.newHue + ", 50%, 50%)");
    //   saturationGradientEnd.setAttribute("stop-color", "hsl(" + this.newHue + ", 100%, 50%)");
    //   this.updateCurrentColor();
    // },

    // onLightHandleMove(newX) {
    //   this.newLightness = ((newX - this.x) / this.width) * 100;
    //   this.updateCurrentColor();
    // },

    // onSaturationHandleMove(newX) {
    //   this.newSaturation = ((newX - this.x - 2) / this.width) * 100;
    //   this.updateCurrentColor();
    // },

    // // COLOR PICKER
    // _getFillColor() {
    //   return this.currentColor.style.fill;
    // },
    // getColorRGBArray() {
    //   var red,
    //     green,
    //     blue,
    //     fillColor = this._getFillColor();

    //   if (fillColor.charAt(0) === "#") {
    //     red = fillColor.slice(1, 3);
    //     green = fillColor.slice(3, 5);
    //     blue = fillColor.slice(5, 7);
    //     return [parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16)];
    //   } else {
    //     return this._getFillColor()
    //       .slice(4, -1)
    //       .split(", ")
    //       .map(function(item) {
    //         return parseInt(item, 10);
    //       });
    //   }
    // },
    // getColorRGB() {
    //   var fillColor = this._getFillColor();
    //   if (fillColor.charAt(0) === "#") {
    //     return fillColor;
    //   } else {
    //     return (
    //       "#" +
    //       this.getColorRGBArray()
    //         .map(function(item) {
    //           var value = parseInt(item, 10),
    //             first = value % 16,
    //             second = Math.floor(value / 16);

    //           return toHex[second] + toHex[first];
    //         })
    //         .join("")
    //     );
    //   }
    // },
    // getColorHSLArray() {
    //   return [this.hueBar.getValue(), this.saturationBar.getValue(), this.lightBar.getValue()];
    // },
    // getColorHSL() {
    //   var hue, saturation, light, array;
    //   array = this.getColorHSLArray();
    //   hue = ("" + array[0] * 100).slice(0, 8);
    //   saturation = ("" + array[1] * 100).slice(0, 8) + "%";
    //   light = ("" + array[2] * 100).slice(0, 8) + "%";

    //   return "hsl(" + [hue, saturation, light].join(", ") + ")";
    // },
    // setHSL(hue, saturation, lightness) {
    //   this.hueBar.setValue(hue);
    //   this.lightBar.setValue(lightness);
    //   this.saturationBar.setValue(saturation);
    // },
  }
};
</script>
