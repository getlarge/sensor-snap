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
      @click="debouncedUpdateSensor(updatedSensor, 5850, !timerState)"
    />
    <circle
      :transform="`translate(${updatedWidth / 1.2}, ${updatedHeight / 10})`"
      :r="`${updatedWidth / 15}`"
      class="delete-button"
      @click="deleteSensor(updatedSensor)"
    />

    <g
      class="timer-modes"
      :transform="`translate(${updatedWidth / 6},${updatedHeight / 3.5})`"
    >
      <text
        :id="`timerMode-${updatedSensor.id}-0`"
        y="0"
        :x="`${updatedWidth / 6}`"
        @click.prevent.stop="debouncedSetTimerMode(0)"
      >
        0
      </text>
      <text
        :id="`timerMode-${updatedSensor.id}-1`"
        y="0"
        :x="`${updatedWidth / 3.2}`"
        @click.prevent.stop="debouncedSetTimerMode(1)"
      >
        1
      </text>
      <text
        :id="`timerMode-${updatedSensor.id}-2`"
        y="0"
        :x="`${updatedWidth / 2.4}`"
        @click.prevent.stop="debouncedSetTimerMode(2)"
      >
        2
      </text>
    </g>

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
      <text
        :ref="`timerClock-${updatedSensor.id}`"
        :id="`timer-clock-${updatedSensor.id}`"
        text-anchor="middle"
        :y="0"
        class="display-remain-time"
        @click.prevent.stop="editTimerField()"
      >
        <!--  {{ setTimeString(wholeTime) || '60:00' }}-->
        {{ setTimeString(wholeTime) }}
      </text>
      <g :transform="`translate(0,${updatedHeight / 15})`" text-anchor="middle">
        <text
          :x="-(updatedWidth / 15)"
          :y="updatedHeight / 9"
          class="play"
          id="pause"
          @click.prevent.stop="debouncedPauseTimer"
        >
          {{ playButton }}
        </text>
        <text
          :x="updatedWidth / 15"
          :y="updatedHeight / 9"
          class="stop"
          id="break"
          @click.prevent.stop="debouncedStopTimer"
        >
          ■
        </text>
      </g>
    </g>
  </svg>
</template>

<script>
import debounce from 'lodash.debounce';
import {getComponentResource, DeltaTimer} from '../methods';

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
      pointer: null,
      pointerGroup: null,
      length: 0,
      progressBar: null,
      displayOutput: null,
      timerClock: null,
      setterBtns: [],
      timerModeBtns: [],
      elementsMounted: false,
      intervalTimer: null,
      isPaused: true,
      isStarted: false,
      timerModes: [0, 1, 2],
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
        return this.updatedSensor.resources['5521'];
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
    timerOutput: {
      get() {
        return this.updatedSensor.resources['5543'];
      },
      set(value) {
        this.updatedSensor.resources['5543'] = value;
      },
    },
    timerMode: {
      get() {
        return this.updatedSensor.resources['5526'];
      },
      set(value) {
        this.updatedSensor.resources['5526'] = value;
      },
    },
    timerEvent: {
      get() {
        return this.updatedSensor.resources['5523'];
      },
      set(value) {
        this.updatedSensor.resources['5523'] = value;
      },
    },
    switchButtonClass() {
      if (this.timerState) {
        return `switch-button switched-on`;
      }
      return `switch-button switched-off`;
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
      handler(value, oldValue) {
        if (value !== oldValue && value !== null) {
          if (value < 0) value = 0;
          if (value > 0) {
            if (this.isStarted && !this.isPaused && !this.timerOutput) {
              this.stopTime = Date.now() + value * 1000;
              this.displayTimeLeft(value);
            } else if (!this.timerOutput && !this.isStarted) {
              //  this.startCron();
            } else if (this.timerState && !this.timerOutput && this.isPaused) {
              this.restartCron();
            }
          } else if (value === 0) {
            if (this.isStarted) {
              this.stopCron();
            }
          }
        }
      },
      immediate: true,
    },
    wholeTime: {
      handler(value) {
        if (value !== null) {
          if (value < 0) value = 0;
          if (!this.isStarted) {
            this.displayTimeLeft(value);
          }
        }
      },
      immediate: true,
    },
    timerOutput: {
      handler(value) {
        if (this.elementsMounted) {
          // if (
          //   oldValue &&
          //   oldValue !== value &&
          //   (value === false || value === 0)
          // ) {
          //   if (!this.isStarted && !this.isPaused) {
          //     this.startCron();
          //   } else if (this.isPaused && this.isStarted) {
          //     this.restartCron();
          //   }
          // }
          if (
            !this.isPaused &&
            this.isStarted &&
            (value === true || value === 1)
          ) {
            this.stopCron();
            //  this.pauseCron();
          }
        }
      },
      immediate: true,
    },
    timerState: {
      handler(value, oldValue) {
        if (this.elementsMounted && oldValue !== value) {
          if (value === true || value === 1) {
            if (!this.isStarted && !this.timeLeft) {
              this.startCron();
            } else if (this.isPaused && this.isStarted) {
              this.restartCron();
            }
          }
        }
      },
      immediate: true,
    },
    timerMode: {
      handler(value) {
        if (this.elementsMounted && value !== null) {
          this.timerModeBtns.forEach((btn, index) => {
            if (index === value) {
              btn.style.fill = this.colors.primaryColor;
            } else {
              btn.style.fill = this.colors.secondaryColor;
            }
          });
        }
      },
      immediate: true,
    },
    timerEvent: {
      handler(value) {
        if (this.elementsMounted && value !== null) {
          switch (value) {
            case 'start':
              if (!this.isStarted) {
                this.startCron();
              }
              break;
            case 'restart':
              if (!this.isStarted) {
                this.restartCron();
              }
              break;
            case 'stop':
              if (this.isStarted) {
                this.stopCron();
              }
              break;
            case 'pause':
              if (this.isStarted && !this.isPaused) {
                this.pauseCron();
              }
              break;
          }
        }
      },
      immediate: true,
    },
  },

  created() {
    this.debouncedUpdateSensor = debounce(this.updateSensor, 150);
    this.debouncedSetTimer = debounce(this.setTimer, 150);
    this.debouncedSetTimerMode = debounce(this.setTimerMode, 150);
    this.debouncedPauseTimer = debounce(this.pauseTimer, 150);
    this.debouncedStopTimer = debounce(this.stopTimer, 150);
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
    this.isStarted = false;
    this.isPaused = true;
    this.elementsMounted = false;
  },

  methods: {
    updateSensor(...args) {
      this.$emit('update-sensor', ...args);
    },

    updateSetting(...args) {
      if (args[0] && args[0].id) {
        this.$emit('update-setting', ...args);
      }
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args);
    },

    flipSide(value) {
      this.$emit('flip-side', value);
    },

    mountElements() {
      this.progressBar = this.$el.querySelector('.cron-progress');
      this.pointer = this.$el.querySelector('.cron-dot');
      this.pointerGroup = this.$el.getElementById('cron-pointer');
      this.length = Math.PI * 2 * (this.updatedWidth / 2.3);
      this.progressBar.style.strokeDasharray = this.length;
      this.displayOutput = this.$el.querySelector('.display-remain-time');
      this.timerClock = this.$refs[`timerClock-${this.updatedSensor.id}`];
      this.setterBtns = this.$el.querySelectorAll('text[data-setter]');
      this.timerModeBtns = this.timerModes.map(mode =>
        this.$el.getElementById(`timerMode-${this.updatedSensor.id}-${mode}`),
      );
      this.timerModeBtns[this.timerMode].style.fill = this.colors.primaryColor;
      this.setClock(1000);
      this.elementsMounted = true;
    },

    setListeners() {
      if (this.elementsMounted) {
        this.setterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const param = btn.dataset.setter;
            switch (param) {
              case 'minutes-plus':
                this.debouncedSetTimer(1 * 60);
                break;
              case 'minutes-minus':
                this.debouncedSetTimer(-1 * 60);
                break;
              case 'seconds-plus':
                this.debouncedSetTimer(1);
                break;
              case 'seconds-minus':
                this.debouncedSetTimer(-1);
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
      }
      this.pointerGroup.style.transform = `rotate(${(360 * value) /
        timePercent}deg)`;
    },

    setTimeString(timeLeft) {
      let timeIsValid = true;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      if (typeof seconds !== 'number' || seconds < 0 || seconds > 59) {
        timeIsValid = false;
      }
      if (typeof minutes !== 'number' || minutes < 0 || minutes > 500) {
        timeIsValid = false;
      }
      if (timeIsValid) {
        return `${minutes < 10 ? '0' : ''}${minutes}:${
          seconds < 10 ? '0' : ''
        }${seconds}`;
      }
      return this.setTimeString(0);
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
        this.displayTimeLeft(this.wholeTime);
        this.updateSetting(this.updatedSensor, 5521, this.wholeTime);
      }
    },

    setTimeLeft(seconds) {
      if (this.timeLeft + seconds > 0) {
        this.timeLeft += seconds;
        this.displayTimeLeft(this.timeLeft);
        this.updateSetting(this.updatedSensor, 5538, this.timeLeft);
      }
    },

    setTimer(seconds) {
      if (this.isStarted && this.isPaused) {
        this.setTimeLeft(seconds);
      } else if (!this.isStarted && this.isPaused) {
        this.setWholeTime(seconds);
      }
    },

    editTimerField() {
      if (!this.isStarted && this.elementsMounted) {
        const text = this.timerClock;
        if (text && text.id) {
          const newValue = prompt(
            `Please enter new time : `,
            this.setTimeString(this.wholeTime),
          );
          if (newValue && newValue !== null) {
            let timeIsValid = true;
            const parts = newValue.split(':');
            const seconds = Number(parts[1]);
            if (typeof seconds !== 'number' || seconds < 0 || seconds > 59) {
              timeIsValid = false;
            }
            const minutes = Number(parts[0]);
            if (typeof minutes !== 'number' || minutes < 0 || minutes > 500) {
              timeIsValid = false;
            }
            if (timeIsValid) {
              //  text.textContent = `${newValue}`;
              const timeLeft = minutes * 60 + seconds;
              if (this.isPaused) {
                //  this.timeLeft = timeLeft;
                this.updateSetting(this.updatedSensor, 5538, timeLeft);
              } else {
                //  this.wholeTime = timeLeft;
                this.updateSetting(this.updatedSensor, 5521, timeLeft);
              }
            }
          }
        }
      }
    },

    setTimerMode(mode) {
      try {
        if (this.isStarted) return null;
        switch (mode) {
          case 0:
            this.timerMode = 0;
            break;
          case 1:
            this.timerMode = 1;
            break;
          case 2:
            this.timerMode = 2;
            break;
          default:
            throw new Error('Unsupported mode');
        }
        this.updateSetting(this.updatedSensor, 5526, mode);
      } catch (error) {
        return error;
      }
    },

    startCron() {
      this.isStarted = true;
      this.isPaused = false;
      this.timerOutput = 0;
      this.timeLeft = this.wholeTime;
      //  console.log('startCron', this.timeLeft);
      if (this.elementsMounted) {
        this.intervalTimer.start();
        this.pointer.style.stroke = this.colors.successColor;
        this.progressBar.style.stroke = this.colors.successColor;
        this.setterBtns.forEach(btn => {
          btn.disabled = true;
          btn.style.opacity = 0.5;
        });
      }
    },

    restartCron() {
      this.isStarted = true;
      this.isPaused = false;
      this.timerOutput = 0;
      if (this.timeLeft <= 0) {
        this.timeLeft = this.wholeTime;
      }
      let timeLeft = this.timeLeft;
      if (timeLeft <= 0) {
        timeLeft = this.wholeTime;
      }
      //  console.log('restartCron', this.timeLeft);
      if (this.elementsMounted) {
        this.intervalTimer.start();
        this.pointer.style.stroke = this.colors.successColor;
        this.progressBar.style.stroke = this.colors.successColor;
        this.setterBtns.forEach(btn => {
          btn.disabled = true;
          btn.style.opacity = 0.5;
        });
      }
    },

    pauseCron() {
      this.isStarted = true;
      this.isPaused = true;
      //  console.log('pauseCron', this.timeLeft);
      if (this.elementsMounted) {
        this.intervalTimer.stop();
        this.pointer.style.stroke = this.colors.primaryColor;
        this.progressBar.style.stroke = this.colors.primaryColor;
        this.setterBtns.forEach(btn => {
          btn.disabled = false;
          btn.style.opacity = 1;
        });
      }
    },

    stopCron() {
      this.isStarted = false;
      this.isPaused = true;
      //  this.timeLeft = 0;
      //  console.log('stopCron', this.timeLeft);
      if (this.elementsMounted) {
        this.intervalTimer.stop();
        this.displayTimeLeft(this.wholeTime);
        this.pointer.style.stroke = this.colors.primaryColor;
        this.progressBar.style.stroke = this.colors.primaryColor;
        this.setterBtns.forEach(btn => {
          btn.disabled = false;
          btn.style.opacity = 1;
        });
      }
    },

    updateCron(data) {
      try {
        // const payload = {
        //   date: new Date(data.time),
        //   time: data.time,
        //   lastTime: data.lastTime,
        // };
        if (this.timeLeft <= 0) {
          //          this.stopCron();
        } else if (this.timeLeft > 0) {
          this.timeLeft -= 1;
          this.displayTimeLeft(this.timeLeft);
        }
        return data;
      } catch (error) {
        return error;
      }
    },

    setClock(interval) {
      if (this.intervalTimer && this.intervalTimer !== null) {
        this.intervalTimer.stop();
      }
      this.intervalTimer = new DeltaTimer(this.updateCron, {}, interval);
      // const start = this.intervalTimer.start();
      // console.log('Set clock :', start);
      return this.intervalTimer;
    },

    stopTimer() {
      this.updateSensor(this.updatedSensor, 5523, 'stop');
      this.stopCron();
    },

    pauseTimer() {
      if (!this.isStarted && this.isPaused) {
        this.updateSensor(this.updatedSensor, 5523, 'start');
        this.startCron();
      } else if (this.isPaused && this.isStarted) {
        this.updateSensor(this.updatedSensor, 5523, 'restart');
        this.restartCron();
      } else if (!this.isPaused && this.isStarted) {
        this.updateSensor(this.updatedSensor, 5523, 'pause');
        this.pauseCron();
      }
    },
  },
};
</script>
