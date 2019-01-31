<template lang="html">
  <svg class="aloes-sensor-audio">
    <!-- AUDIO CLIP
        CLIP 5522, TRIGGER 5523, LEVEL 5548, DURATION 5524, appType 5750-->
    <g
      v-if="updatedSensor.type === 3339"
      transform="translate(10,20)"
      @click="updateSensor(updatedSensor, 5523, 1)"
    >
      <circle cx="60" cy="60" r="60" class="sensor-button" />
    </g>
  </svg>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "SensorAudio",

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
      updatedWidth: null,
      updatedHeight: null
    };
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
    }
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    updateSensor(...args) {
      this.$emit("update-sensor", ...args);
    },

    flipSide(value) {
      this.$emit("flip-side", value);
    },

    // WIP
    initAudioPlayer() {
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var source;
      var pre = document.querySelector("pre");
      var myScript = document.querySelector("script");
      var play = document.querySelector(".play");
      var stop = document.querySelector(".stop");
      var errorDisplay = document.querySelector(".error");

      // use fetch to load an audio track, and
      // decodeAudioData to decode it and stick it in a buffer.
      // Then we put the buffer into the source
      function getData() {
        source = audioCtx.createBufferSource();

        return fetch("viper.ogg")
          .then(function(response) {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.arrayBuffer();
          })
          .then(function(buffer) {
            audioCtx.decodeAudioData(buffer, function(decodedData) {
              source.buffer = decodedData;
              source.connect(audioCtx.destination);
            });
          });
      }

      // wire up buttons to stop and play audio
      play.onclick = function() {
        getData()
          .then(function() {
            errorDisplay.innerHTML = "";
            source.start(0);
            play.disabled = true;
          })
          .catch(function(error) {
            errorDisplay.appendChild(
              document.createTextNode("Error: " + error.message)
            );
          });
      };

      stop.onclick = function() {
        source.stop(0);
        play.disabled = false;
      };

      // dump script to pre element
      pre.innerHTML = myScript.innerHTML;
    }
  }
};
</script>
