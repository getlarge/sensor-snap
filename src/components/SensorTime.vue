<template lang="html">
  <!-- https://www.tutorialspoint.com/svg/src/clock.html -->
  <!-- todo : if AM make a blue circle, if PM make a yellow circle -->
  <svg
    v-if="updatedSensor.type && updatedSensor.type === 3333"
    :id="`sensorTime-${updatedSensor.id}`"
    :height="updatedHeight"
    :width="updatedWidth"
    :viewBox="viewBox"
    class="sensor-time"
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
      @click.prevent.stop="deleteSensor(updatedSensor)"
    />
    <image
      :transform="`translate(${updatedWidth / 10}, ${updatedHeight / 20})`"
      :height="`${updatedHeight / 10}`"
      :width="`${updatedWidth / 10}`"
      class="show-clock"
      v-bind="{
        'xlink:href': showClock ? agendaIcon : updatedSensor.icons[0],
      }"
      @click.prevent.stop="showClock = !showClock"
    />
    <defs>
      <g :id="`secondHand-${updatedSensor.id}`">
        <line
          :id="`secondHandLine-${updatedSensor.id}`"
          x1="0"
          :y1="-radius / 1.1"
          x2="0"
          y2="0"
          :stroke="colors.secondaryColor"
          :stroke-width="radius / 16"
          transform="rotate(0)"
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0"
          to="360"
          dur="60s"
          repeatCount="indefinite"
        />
      </g>
      <g :id="`minuteHand-${updatedSensor.id}`">
        <line
          :id="`minuteHandLine-${updatedSensor.id}`"
          x1="0"
          :y1="-radius / 1.2"
          x2="0"
          y2="0"
          :stroke="colors.primaryColor"
          :stroke-width="radius / 12"
          transform="rotate(0)"
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0"
          to="360"
          dur="60min"
          repeatCount="indefinite"
        />
      </g>
      <g :id="`hourHand-${updatedSensor.id}`">
        <line
          :id="`hourHandLine-${updatedSensor.id}`"
          x1="0"
          :y1="-radius / 1.3"
          x2="0"
          y2="0"
          :stroke="colors.primaryColor"
          :stroke-width="radius / 10"
          transform="rotate(0)"
        />
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0"
          to="360"
          dur="12h"
          repeatCount="indefinite"
        />
      </g>
      <g :id="`hourScale-${updatedSensor.id}`">
        <circle
          id="hourScaleLine"
          :cx="radius / 100"
          :cy="-(radius / 1.2 - radius / 100)"
          :r="radius / 15"
          stroke="none"
          :fill="colors.primaryColor"
        />
        <circle
          id="hourScaleLine"
          cx="0"
          :cy="-radius / 1.2"
          :r="radius / 15"
          stroke="none"
          fill="#ededed"
        />
      </g>

      <g :id="`clock-${updatedSensor.id}`" class="clock">
        <circle
          :cx="radius / 150"
          :cy="radius / 100"
          :r="radius - radius / 100"
          fill="none"
          stroke="#ededed"
          :stroke-width="updatedWidth / 40"
        />
        <circle
          cx="0"
          cy="0"
          :r="radius"
          fill="none"
          :stroke="colors.secondaryColor"
          :stroke-width="updatedWidth / 40"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(30)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(60)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(90)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(120)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(150)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(180)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(210)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(240)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(270)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(300)"
        />
        <use
          v-bind="{'xlink:href': `#hourScale-${updatedSensor.id}`}"
          transform="rotate(330)"
        />
        <use
          v-bind="{'xlink:href': `#secondHand-${updatedSensor.id}`}"
          transform="translate(0, 0)"
        />
        <use
          v-bind="{'xlink:href': `#minuteHand-${updatedSensor.id}`}"
          transform="translate(0, 0)"
        />
        <use
          v-bind="{'xlink:href': `#hourHand-${updatedSensor.id}`}"
          transform="translate(0, 0)"
        />
        <circle
          cx="0"
          cy="0"
          r="13"
          fill=""
          stroke="#ededed"
          stroke-width="20"
        />
      </g>

      <g :id="`calendarWeek-${updatedSensor.id}`" class="calendar-weeks">
        <text
          v-for="(weekDay, index) in weekDays"
          :key="index"
          :x="calendarDayWidth(weekDay.x)"
          y="0"
        >
          {{ weekDay.value }}
        </text>
      </g>

      <g :id="`calendarDay-${updatedSensor.id}`" class="calendar-days">
        <text
          v-for="(day, index) in days"
          :id="`calendarDay-${index + 1}-${updatedSensor.id}`"
          :key="index"
          :x="calendarDayWidth(day.x)"
          :y="calendarDayHeight(day.y)"
          @click.prevent.stop="showDay(day, index)"
        />
      </g>

      <g :id="`calendar-${updatedSensor.id}`">
        <rect
          x="0"
          y="0"
          :width="updatedWidth"
          :height="calendarHeight / 4"
          :fill="colors.secondaryColor"
        />
        <rect
          x="0"
          :y="calendarHeight / 4"
          :width="updatedWidth"
          :height="calendarHeight"
          fill="#fff"
        />
        <text
          :id="`calendarMonth-${updatedSensor.id}`"
          class="calendar-month"
          :x="updatedWidth / 3"
          :y="calendarHeight / 6.5"
        />
        <text
          :id="`calendarYear-${updatedSensor.id}`"
          class="calendar-year"
          :x="updatedWidth / 4"
          :y="calendarHeight / 6.5"
        />
        <use
          v-bind="{'xlink:href': `#calendarWeek-${updatedSensor.id}`}"
          :transform="
            `translate(${calendarWidth / 28}, ${calendarHeight / 2.6})`
          "
        />
        <use
          v-bind="{'xlink:href': `#calendarDay-${updatedSensor.id}`}"
          :transform="
            `translate(${calendarWidth / 28}, ${calendarHeight / 2.6})`
          "
        />
      </g>
    </defs>
    <use
      v-show="showClock"
      v-bind="{'xlink:href': `#clock-${updatedSensor.id}`}"
      :transform="`translate(${updatedWidth / 2}, ${updatedHeight / 1.8})`"
      @click.prevent.stop="updateSensor(updatedSensor, 5507, getSeconds)"
    />
    <use
      v-show="!showClock"
      v-bind="{'xlink:href': `#calendar-${updatedSensor.id}`}"
      :transform="`translate(0, ${updatedHeight / 5.5})`"
      @click.prevent.stop="updateSensor(updatedSensor, 5506, Date.now())"
    />
  </svg>
</template>

<script>
import {getComponentResource} from '@/methods';
import SensorEvents from '@/mixins/sensor-events';

/**
 * Child component called when catching these ID :3333
 *
 * Resources : 3333 : TIME 5506*, FRACTIONAL TIME 5507, appType 5750
 *
 * @exports components/SensorTime
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string[]} sensor - Json stringified sensor instance
 */
export default {
  name: 'SensorTime',

  mixins: [SensorEvents],

  data() {
    return {
      showClock: true,
      agendaIcon: '/icons/aloes/agenda.svg',
      hands: [],
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      days: [
        {x: 7, y: 5},
        {x: 6, y: 5},
        {x: 5, y: 5},
        {x: 4, y: 5},
        {x: 3, y: 5},
        {x: 2, y: 5},
        {x: 1, y: 5},
        {x: 7, y: 4},
        {x: 6, y: 4},
        {x: 5, y: 4},
        {x: 4, y: 4},
        {x: 3, y: 4},
        {x: 2, y: 4},
        {x: 1, y: 4},
        {x: 7, y: 3},
        {x: 6, y: 3},
        {x: 5, y: 3},
        {x: 4, y: 3},
        {x: 3, y: 3},
        {x: 2, y: 3},
        {x: 1, y: 3},
        {x: 7, y: 2},
        {x: 6, y: 2},
        {x: 5, y: 2},
        {x: 4, y: 2},
        {x: 3, y: 2},
        {x: 2, y: 2},
        {x: 1, y: 2},
        {x: 7, y: 1},
        {x: 6, y: 1},
        {x: 5, y: 1},
        {x: 4, y: 1},
        {x: 3, y: 1},
        {x: 2, y: 1},
        {x: 1, y: 1},
        {x: 7, y: 0},
        {x: 6, y: 0},
      ],
      weekDays: [
        {value: 'Su', x: 7, y: 0},
        {value: 'Mo', x: 6, y: 0},
        {value: 'Tu', x: 5, y: 0},
        {value: 'We', x: 4, y: 0},
        {value: 'Th', x: 3, y: 0},
        {value: 'Fr', x: 2, y: 0},
        {value: 'Sa', x: 1, y: 0},
      ],
    };
  },

  computed: {
    colors() {
      return getComponentResource('time', 'colors');
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
    calendarWidth() {
      return this.updatedWidth;
    },
    calendarHeight() {
      return this.updatedHeight / 1.6;
    },
  },

  mounted() {
    this.$nextTick(() => {
      if (this.updatedSensor.type === 3333) {
        const nowTime = new Date();
        this.displayTime(nowTime);
      }
    });
  },

  methods: {
    showDay(...args) {
      //  console.log('showDay', args);
      return args;
    },

    calendarDayWidth(x) {
      return this.calendarWidth - (this.calendarWidth / 7) * x;
    },
    calendarDayHeight(x) {
      return this.calendarHeight - (this.calendarHeight / 6) * x;
    },

    displayTime(nowTime) {
      //  console.log("displayTime", date);
      this.$el
        .querySelector(`#secondHandLine-${this.updatedSensor.id}`)
        .setAttribute(
          'transform',
          'rotate(' + (nowTime.getSeconds() / 60) * 360 + ')',
        );
      this.$el
        .querySelector(`#minuteHandLine-${this.updatedSensor.id}`)
        .setAttribute(
          'transform',
          'rotate(' + (nowTime.getMinutes() / 60) * 360 + ')',
        );
      this.$el
        .querySelector(`#hourHandLine-${this.updatedSensor.id}`)
        .setAttribute(
          'transform',
          'rotate(' + ((nowTime.getHours() % 12) / 12) * 360 + ')',
        );

      this.$el.querySelector(
        `#calendarYear-${this.updatedSensor.id}`,
      ).textContent = this.dateConverter;
      const firstDay = new Date(
        nowTime.getFullYear(),
        nowTime.getMonth(),
        1,
      ).getDay();
      const endDate = new Date(
        nowTime.getFullYear(),
        nowTime.getMonth() + 1,
        0,
      ).getDate();
      let dayCounter = 1;
      for (let i = 0; i <= 37; i++) {
        if (i > firstDay) {
          this.$el.querySelector(
            `#calendarDay-${i}-${this.updatedSensor.id}`,
          ).textContent = dayCounter < 10 ? '0' + dayCounter : dayCounter;
          dayCounter++;
          if (dayCounter > endDate) {
            break;
          }
        }
      }
      this.$el
        .querySelector(
          `#calendarDay-${firstDay + nowTime.getDate()}-${
            this.updatedSensor.id
          }`,
        )
        .setAttribute('fill', '#E76C6C');
      this.$el
        .querySelector(
          `#calendarDay-${firstDay + nowTime.getDate()}-${
            this.updatedSensor.id
          }`,
        )
        .setAttribute('font-weight', 'bold');
    },
  },
};
</script>
