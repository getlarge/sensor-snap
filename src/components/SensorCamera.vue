<template lang="html">
  <!-- CAMERA v-bind="{ 'xlink:href':updatedValue }"
      BITMAP INPUT 5910, BITMAP INPUT RESET 5911,appType 5750-->
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
      @click="
        updateSensor(updatedSensor, 5911, !updatedSensor.resources['5911'])
      "
    />
    <!-- :stroke="updatedResources['5850'] ? updatedColors[0] : updatedColors[1]" -->
    <image
      v-show="!imageUrl || imageUrl === null"
      :transform="`translate(${updatedWidth / 4}, ${updatedHeight / 4})`"
      :height="updatedHeight / 2"
      :width="updatedWidth / 2"
      v-bind="{ 'xlink:href': updatedSensor.icons[0] }"
      class="sensor-icon"
    />
    <image
      v-show="imageUrl && imageUrl !== null"
      :ref="`streamViewer-${updatedSensor.id}`"
      :transform="`translate(${updatedWidth / 8}, ${updatedHeight / 4})`"
      :height="updatedHeight / 1.6"
      :width="updatedWidth / 1.4"
      v-bind="{ 'xlink:href': imageUrl }"
      class="stream-viewer"
    />
    <!--     <foreignObject :transform="`translate(${updatedWidth / 8}, ${updatedHeight / 4})`">
      <canvas
        :ref="`streamContainer-${updatedSensor.id}`"
        class="stream-container"
        :height="updatedHeight / 1.6"
        :width="updatedWidth / 1.4"
      />
    </foreignObject> -->
  </svg>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "SensorCamera",

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
      updatedSensor: null,
      updatedHeight: null,
      updatedWidth: null,
      aSide: true,
      imageUrl: null,
      fpm: [1, 2, 4, 6],
      img: {},
      canvas: {},
      captures: [],
      uploadedFiles: [],
      counter: 0
    };
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`;
    },
    value: {
      get() {
        return this.updatedSensor.resources["5910"];
        //  return this.normalize(this.value, this.minRangeValue, this.maxRangeValue);
      },
      set(value) {
        this.updatedSensor.resources["5910"] = value;
      }
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
      },
      immediate: true
    },
    value: {
      handler(value) {
        if (!value || value === null) return null;
        if (value.type === "Buffer") {
          console.log("camera value", Buffer.from(value.data).buffer);
          const blob = new Blob([Buffer.from(value.data).buffer]);
          this.getImage(blob);
        }
      },
      immediate: true
    }
  },

  mounted() {
    if (this.value && this.value.type === "Buffer") {
      const blob = new Blob([Buffer.from(this.value.data).buffer]);
      this.getImage(blob);
    }
  },

  beforeDestroy() {
    this.counter = 0;
    this.timelapse = false;
  },

  methods: {
    updateSensor(...args) {
      this.$emit("update-sensor", ...args);
    },

    deleteSensor(...args) {
      this.$emit("delete-sensor", ...args);
    },

    flipSide(value) {
      this.$emit("flip-side", value);
    },

    // CAMERA
    // parseStream(payload, bufferSize) {
    //   if (payload.length === bufferSize) {
    //     //console.log(this.counter);
    //     if (this.counter === 1) {
    //       return (this.uploadedFiles = new Blob([payload], {
    //         type: "image/jpeg",
    //       }));
    //     } else {
    //       return (this.uploadedFiles = new Blob([this.uploadedFiles, payload], {
    //         type: "image/jpeg",
    //       }));
    //     }
    //   } else if (payload.length <= 4) {
    //     //console.log("last", this.counter);
    //     const blob = new Blob([this.uploadedFiles, payload], {
    //       type: "image/jpeg",
    //     });
    //     this.uploadedFiles = [];
    //     this.counter = 0;
    //     this.getImage(blob);
    //     if (this.url) {
    //       //var url = this.url.createObjectURL(blob);
    //       //console.log(url);
    //       //return this.downloadImage(name, url)
    //     } else {
    //       return false;
    //     }
    //   }
    // },

    getImage(blob) {
      const img = this.$refs[`streamViewer-${this.updatedSensor.id}`];
      return new Promise((resolve, reject) => {
        const fReader = new FileReader();
        if (img && img !== null) {
          fReader.onload = () => {
            if (!fReader.result) reject("no result from file reader");
            this.imageUrl = fReader.result;
            resolve(this.imageUrl);
            //  resolve(this.getBase64Image(img));
          };
          if (blob instanceof Blob) {
            fReader.readAsDataURL(blob);
          }
        } else {
          reject("no image to render");
        }
      });
    }

    // getBase64Image(img) {
    //   //console.log(img);
    //   const canvas = this.$refs[`streamContainer-${this.updatedSensor.id}`];
    //   canvas.getContext("2d").drawImage(img, 0, 0, 640, 480);
    //   this.captures.push(canvas.toDataURL("image/png"));
    // },
  }
};
</script>
