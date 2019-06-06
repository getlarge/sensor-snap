<template lang="html">
  <svg
    v-if="updatedSensor.type && updatedSensor.type === 3340"
    :id="`sensorTimer-${updatedSensor.id}`"
    :height="updatedHeight"
    :width="updatedWidth"
    :viewBox="viewBox"
    class="sensor-timer"
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
      :transform="`translate(${updatedWidth / 7}, ${updatedHeight / 10})`"
      :r="updatedWidth / 15"
      :class="switchButtonClass"
      @click="
        updateSensor(updatedSensor, 5850, !updatedSensor.resources['5850'])
      "
    />
    <circle
      :transform="`translate(${updatedWidth / 1.2}, ${updatedHeight / 10})`"
      :r="`${updatedWidth / 15}`"
      class="delete-button"
      @click="deleteSensor(updatedSensor)"
    />

    <g
      class="setters"
      :transform="`translate(${updatedWidth / 3.6},${updatedHeight / 3.4})`"
    >
      <g class="minutes-set">
        <text
          :x="updatedWidth / 80"
          :y="updatedHeight / 6"
          data-setter="minutes-plus"
        >
          +
        </text>
        <text
          :x="updatedWidth / 7.5"
          :y="updatedHeight / 6"
          data-setter="minutes-minus"
        >
          -
        </text>
      </g>
      <g class="seconds-set">
        <text
          :x="updatedWidth / 3.8"
          :y="updatedHeight / 6"
          data-setter="seconds-plus"
        >
          +
        </text>
        <text
          :x="updatedWidth / 2.65"
          :y="updatedHeight / 6"
          data-setter="seconds-minus"
        >
          -
        </text>
      </g>
    </g>

    <g
      :transform="`translate(${updatedWidth / 2},${updatedHeight / 1.8})`"
      class="cron-group"
    >
      <circle :r="updatedWidth / 2.3" class="cron-base" />
      <g transform="rotate(-90)">
        <circle :r="updatedWidth / 2.3" class="cron-progress" />
        <g id="cron-pointer">
          <circle
            :cx="updatedWidth / 2.3"
            cy="0"
            :r="updatedWidth / 40"
            class="cron-dot"
          />
        </g>
      </g>
    </g>

    <g
      class="controls"
      :transform="`translate(${updatedWidth / 2},${updatedHeight / 1.6})`"
    >
      <text :x="-updatedWidth / 4.1" :y="0" class="display-remain-time">
        {{ setTimeString(wholeTime) || '60:00' }}
      </text>
      <g :transform="`translate(0,${updatedHeight / 15})`" text-anchor="middle">
        <text
          :x="-(updatedWidth / 15)"
          :y="updatedHeight / 9"
          class="play"
          id="pause"
          @click.prevent.stop="pauseTimer"
        >
          {{ playButton }}
        </text>
        <text
          :x="updatedWidth / 15"
          :y="updatedHeight / 9"
          class="stop"
          id="break"
          @click.prevent.stop="stopTimer"
        >
          ■
        </text>
      </g>
    </g>
  </svg>
</template>

<script>
import {getComponentResource} from '../methods';

/**
 * Child component called when catching these ID: 3340
 *
 * Resources : whole_time : 5521, remain_time: 5538, appType: 5750
 *
 * @module components/SensorTimer
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string[]} sensor - Json stringified sensor instance
 */
export default {
  name: 'SensorTimer',

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
      showClock: true,
      aSide: true,
      elementsMounted: false,
      toggleTimer: true,
      intervalTimer: null,
      isPaused: false,
      isStarted: false,
      internalTimer: true,
      externalTimer: false,
    };
  },

  computed: {
    viewBox() {
      return `0 0 ${this.updatedWidth} ${this.updatedHeight}`;
    },
    colors() {
      return getComponentResource('timer', 'colors');
    },
    wholeTime: {
      get() {
        return this.updatedSensor.resources['5521'] || 60 * 60;
      },
      set(value) {
        this.updatedSensor.resources['5521'] = value;
      },
    },
    timeLeft: {
      get() {
        return this.updatedSensor.resources['5538'] || 0;
      },
      set(value) {
        this.updatedSensor.resources['5538'] = value;
      },
    },
    timerState: {
      get() {
        return this.updatedSensor.resources['5850'];
      },
      set(value) {
        this.updatedSensor.resources['5850'] = value;
      },
    },
    switchButtonClass() {
      if (this.timerState) {
        return `switch-button switched-on`;
      }
      return `switch-button switched-off`;
    },
    radius() {
      return this.updatedWidth / 2.5;
    },
    dateConverter() {
      //  const d = new Date(this.updatedSensor.resources["5506"] * 1000) || new Date();
      const d = new Date();
      return `${d.getDate()} ${this.months[d.getMonth()]} ${d.getFullYear()}`;
    },
    getSeconds() {
      const d = new Date();
      return d.getSeconds();
    },
    playButton() {
      if (this.isStarted && !this.isPaused) {
        return '▮▮';
      }
      return '▶';
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
    timeLeft: {
      handler(value) {
        if (value !== null) {
          this.displayTimeLeft(value);
        }
      },
      immediate: true,
    },
    timerState: {
      handler(value) {
        if (value === false || value === 0) {
          if (this.timeLeft > 5) {
            this.pauseCron();
          } else {
            this.stopCron();
          }
        } else if (value === true || value === 1) {
          if (
            this.isStarted === false &&
            (!this.timeLeft || this.timeLeft === 0)
          ) {
            this.startCron();
          } else if (
            this.isPaused ||
            (this.isStarted === false && this.timeLeft > 0)
          ) {
            this.restartCron();
          }
          // if (!this.isStarted) {
          //   this.isStarted = true;
          //   this.restartCron();
          // }
        }
      },
      immediate: true,
    },
  },

  mounted() {
    if (this.updatedSensor.type === 3340) {
      this.mountElements();
    }
    this.$nextTick(() => {
      this.setListeners();
    });
  },

  beforeDestroy() {
    this.elementsMounted = false;
  },

  methods: {
    updateSensor(...args) {
      this.$emit('update-sensor', ...args);
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args);
    },

    flipSide(value) {
      this.$emit('flip-side', value);
    },

    mountElements() {
      this.progressBar = this.$el.querySelector('.cron-progress');
      //  this.indicator = this.$el.getElementById('e-indicator');
      this.pointer = this.$el.querySelector('.cron-dot');
      this.pointerGroup = this.$el.getElementById('cron-pointer');
      this.length = Math.PI * 2 * (this.updatedWidth / 2.3);
      this.progressBar.style.strokeDasharray = this.length;
      this.displayOutput = this.$el.querySelector('.display-remain-time');
      this.setterBtns = this.$el.querySelectorAll('text[data-setter]');
      this.elementsMounted = true;
    },

    setListeners() {
      if (this.elementsMounted) {
        this.setterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const param = btn.dataset.setter;
            switch (param) {
              case 'minutes-plus':
                this.setTimer(1 * 60);
                break;
              case 'minutes-minus':
                this.setTimer(-1 * 60);
                break;
              case 'seconds-plus':
                this.setTimer(1);
                break;
              case 'seconds-minus':
                this.setTimer(-1);
                break;
            }
          });
        });
      }
    },

    updateCronDisplay(value, timePercent) {
      const offset = -this.length - (this.length * value) / timePercent;
      this.progressBar.style.strokeDashoffset = offset;
      if (this.isStarted && !this.isPaused) {
        this.pointer.style.stroke = this.colors.successColor;
        this.progressBar.style.stroke = this.colors.successColor;
      } else {
        // this.pointer.style.stroke = this.colors.secondaryColor;
        // this.progressBar.style.stroke = this.colors.secondaryColor;
      }
      this.pointerGroup.style.transform = `rotate(${(360 * value) /
        timePercent}deg)`;
    },

    setTimeString(timeLeft) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      return `${minutes < 10 ? '0' : ''}${minutes}:${
        seconds < 10 ? '0' : ''
      }${seconds}`;
    },

    displayTimeLeft(timeLeft) {
      if (this.elementsMounted) {
        const displayString = this.setTimeString(timeLeft);
        this.displayOutput.textContent = displayString;
        this.updateCronDisplay(timeLeft, this.wholeTime);
      }
    },

    setWholeTime(seconds) {
      if (this.wholeTime + seconds > 0) {
        this.wholeTime += seconds;
        this.updateSensor(this.updatedSensor, 5523, 'updated');
        this.updateSensor(this.updatedSensor, 5521, this.wholeTime);
        //  this.displayTimeLeft(this.wholeTime);
      }
    },

    setTimeLeft(seconds) {
      if (this.timeLeft + seconds > 0) {
        this.timeLeft += seconds;
        //  this.displayTimeLeft(this.timeLeft);
        this.updateSensor(this.updatedSensor, 5538, this.timeLeft);
      }
    },

    setTimer(seconds) {
      //  console.log('changeTime', seconds, isPaused);
      if (this.isPaused) {
        this.setTimeLeft(seconds);
      } else {
        this.setWholeTime(seconds);
      }
    },

    startTimer(seconds) {
      const remainTime = Date.now() + seconds * 1000;
      //  this.displayTimeLeft(seconds);
      if (this.internalTimer) {
        if (this.intervalTimer && this.intervalTimer !== null) {
          clearInterval(this.intervalTimer);
          this.intervalTimer = null;
        }

        this.intervalTimer = setInterval(() => {
          this.timeLeft = Math.round((remainTime - Date.now()) / 1000);
          if (this.timeLeft < 0) {
            this.updateSensor(this.updatedSensor, 5850, false);
            //  this.updateSensor(this.updatedSensor, 5538, this.timeLeft);
            return;
          }
          this.updateSensor(this.updatedSensor, 5538, this.timeLeft);
        }, 1000);
      }
      // if (externalTimer) updateSensor
      //  this.updateSensor(this.sensor, 5538, remainTime);
    },

    startCron() {
      this.updateSensor(this.updatedSensor, 5523, 'started');
      this.startTimer(this.wholeTime);
      this.isStarted = true;
      this.isPaused = false;
      if (this.elementsMounted) {
        this.pointer.style.stroke = this.colors.successColor;
        this.progressBar.style.stroke = this.colors.successColor;
        this.setterBtns.forEach(btn => {
          btn.disabled = true;
          btn.style.opacity = 0.5;
        });
      }
    },

    restartCron() {
      this.updateSensor(this.updatedSensor, 5523, 'restarted');
      this.updateSensor(this.updatedSensor, 5538, this.timeLeft);
      this.startTimer(this.timeLeft);
      this.isPaused = false;
      this.isStarted = true;

      if (this.elementsMounted) {
        this.pointer.style.stroke = this.colors.successColor;
        this.progressBar.style.stroke = this.colors.successColor;
        this.setterBtns.forEach(btn => {
          btn.disabled = true;
          btn.style.opacity = 0.5;
        });
      }
    },

    pauseCron() {
      this.isPaused = true;
      this.isStarted = true;
      if (this.internalTimer) {
        if (this.intervalTimer && this.intervalTimer !== null) {
          clearInterval(this.intervalTimer);
        }
        this.intervalTimer = null;
      }
      this.updateSensor(this.updatedSensor, 5523, 'paused');
      this.updateSensor(this.updatedSensor, 5538, this.timeLeft);
      if (this.elementsMounted) {
        this.pointer.style.stroke = this.colors.primaryColor;
        this.progressBar.style.stroke = this.colors.primaryColor;
        this.setterBtns.forEach(btn => {
          btn.disabled = false;
          btn.style.opacity = 1;
        });
      }
    },

    stopCron() {
      if (this.internalTimer) {
        if (this.intervalTimer && this.intervalTimer !== null) {
          clearInterval(this.intervalTimer);
        }
        this.intervalTimer = null;
      }
      this.isStarted = false;
      this.isPaused = false;
      this.updateSensor(this.updatedSensor, 5523, 'stopped');
      this.updateSensor(this.updatedSensor, 5538, this.timeLeft);
      this.displayTimeLeft(this.wholeTime);
      if (this.elementsMounted) {
        this.pointer.style.stroke = this.colors.primaryColor;
        this.progressBar.style.stroke = this.colors.primaryColor;
        this.setterBtns.forEach(btn => {
          btn.disabled = false;
          btn.style.opacity = 1;
        });
      }
    },

    stopTimer() {
      if (this.toggleTimer) {
        this.timeLeft = 0;
        this.updateSensor(this.updatedSensor, 5850, false);
      }
    },

    pauseTimer() {
      if (this.toggleTimer) {
        if (this.isStarted === false && !this.timeLeft) {
          this.updateSensor(this.updatedSensor, 5850, true);
        } else if (
          this.isPaused ||
          (this.isStarted === false && this.timeLeft > 0)
        ) {
          this.updateSensor(this.updatedSensor, 5850, true);
        } else {
          this.updateSensor(this.updatedSensor, 5850, false);
        }
      }
    },
  },
};
</script>
