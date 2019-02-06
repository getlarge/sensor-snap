<template lang="html">
  <div class="sensor-map">
    <!-- MAP 
        LAT 5514, LNG 5515, VELOCITY 5517, appType 5750-->
    <!-- 
      see: http://www.petercollingridge.co.uk/tutorials/svg/interactive/interactive-map/ 
    https://www.amcharts.com/svg-maps/
  -->
    <svg v-if="updatedSensor.type === 3336" transform="translate(10,10)" />
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'SensorMap',

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
    }
  },

  watch: {
    sensor: {
      handler(sensor) {
        this.updatedSensor = JSON.parse(sensor)
      },
      immediate: true
    }
  },

  mounted() {
    // find country from input coordinates, load the right country's map
    // place the marker on the right coordinates
  },

  updated() {
    //  console.log("aloes-sensor updated()", this.iconsProps);
  },

  beforeDestroy() {
    this.counter = 0
  },

  methods: {
    checkResourceType() {
      const resourcesKeys = Object.getOwnPropertyNames(this.updatedResources)
      // list updateble resources
      // 5700, 5500, 5706, 5514, 5515, 5701, 5750
      let foundResource = resourcesKeys.find(key => key === '5700')
      if (!foundResource)
        foundResource = resourcesKeys.find(key => key === '5500')
      console.log(foundResource)
      return foundResource
    },

    updateSensor(...args) {
      this.$emit('update-sensor', ...args)
    },

    deleteSensor(...args) {
      this.$emit('delete-sensor', ...args)
    },

    flipSide(value) {
      this.$emit('flip-side', value)
    }
  }
}
</script>
