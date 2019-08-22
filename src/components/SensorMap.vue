<template>
  <div
    v-if="updatedSensor && updatedSensor.type && updatedSensor.type === 3336"
    :ref="`chart-${updatedSensor.id}`"
    class="sensor-map"
    :style="{
      height: updatedHeight + 'px',
      width: updatedWidth + 'px',
    }"
  ></div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import debounce from 'lodash.debounce';
import {getComponentResource, getDistanceFromCoordinates} from '../methods';

am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dataviz);

/**
 * Child component called when Object Id : 3336
 *
 * Resources : Latitude : 5514, Longitude : 5515, Uncertainity : 5516
 *
 * Velocity 5517, Timestamp : 5518, Compass direction : 5705, appType : 5750
 *
 * @exports components/SensorMap
 * @param {number} [width] - Component width
 * @param {number} [height] - Component height
 * @param {string[]} sensor - Json stringified sensor instance
 */
export default {
  name: 'SensorMap',

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
      updatedHeight: null,
      updatedWidth: null,
      updatedMapType: null,
      chart: null,
      sensorTitle: null,
      currentLocation: null,
      deleteBtn: null,
      targetSVG:
        'M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z',
      locationSeriesTemplate: {},
      locationSeries: {},
      lineSeries: null,
      shadowLineSeries: null,
      lastPoint: null,
      activeDistance: 1, // distance in meter to be considered active between each message
      activeDelay: 10, // delay in seconds to be considered active between each message
      autoZoom: true,
      markerMaxCount: 20,
      aSide: true,
    };
  },

  computed: {
    colors() {
      return getComponentResource('map', 'colors');
    },
    svg() {
      if (
        this.updatedSensor &&
        this.updatedSensor.id &&
        this.$refs[`chart-${this.updatedSensor.id}`]
      ) {
        return this.$refs[`chart-${this.updatedSensor.id}`].childNodes[1]
          .childNodes[0];
      }
      return null;
    },
    latitude: {
      get() {
        return this.updatedSensor.resources['5514'];
      },
      set(value) {
        this.updatedSensor.resources['5514'] = value;
      },
    },
    longitude: {
      get() {
        return this.updatedSensor.resources['5515'];
      },
      set(value) {
        this.updatedSensor.resources['5515'] = value;
      },
    },
    timestamp: {
      get() {
        return this.updatedSensor.resources['5518'];
      },
      set(value) {
        this.updatedSensor.resources['5518'] = value;
      },
    },
    location: {
      get() {
        return this.currentLocation;
      },
      set(value) {
        this.currentLocation = value;
      },
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
    timestamp: {
      handler(newValue, oldValue) {
        if (!newValue || oldValue === newValue) return null;
        if (oldValue !== null && typeof oldValue !== 'number') {
          oldValue = Number(oldValue);
        }
        if (typeof newValue !== 'number') {
          newValue = Number(newValue);
          if (isNaN(newValue)) {
            return null;
          }
        }
        const location = this.buildLocation();
        this.location = location;
      },
      immediate: true,
    },
    location: {
      handler(newValue, oldValue) {
        if (this.deboucedUpdateLocationSeries) {
          this.deboucedUpdateLocationSeries(newValue, oldValue);
        }
      },
      immediate: true,
    },
  },

  created() {
    this.debouncedUpdateSensor = debounce(this.updateSensor, 100);
    this.debouncedUpdateCustomMarkers = debounce(this.updateCustomMarkers, 20);
    this.deboucedUpdateLocationSeries = debounce(
      this.updateLocationSeries,
      100,
    );
  },

  mounted() {
    this.mountElements();
    if (
      this.elementsMounted &&
      this.location &&
      this.location !== null &&
      this.location.timestamp
    ) {
      this.updateLocationSeries(this.location);
      this.chart.zoomToGeoPoint(
        {
          latitude: this.location.latitude + 1,
          longitude: this.location.longitude + 1,
        },
        this.zoomLevel(0),
        true,
      );
      // this.chart.deltaLongitude = this.location.longitude;
    }
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    if (this.sensorTitle !== null) {
      this.sensorTitle.removeEventListener('click', () =>
        this.flipSide(!this.aSide),
      );
    }
    if (this.deleteBtn !== null) {
      this.deleteBtn.removeEventListener('click', () =>
        this.deleteSensor(this.updatedSensor),
      );
    }
    if (this.lineSeries && this.lineSeries !== null) {
      this.lineSeries.mapLines.clear();
      this.lineSeries.toBack();
    }
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
      try {
        if (!window.SVGPathElement || window.SVGPathElement === null) {
          return null;
        }
        let chart = am4core.create(
          this.$refs[`chart-${this.updatedSensor.id}`],
          am4maps.MapChart,
        );
        if (!chart || chart === null) return null;
        chart.geodata = am4geodata_worldLow;
        chart.projection = new am4maps.projections.Miller();
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ['AQ'];
        polygonSeries.useGeodata = true;

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template;
        // polygonTemplate.applyOnClones = true;
        // polygonTemplate.togglable = true;
        // polygonTemplate.tooltipText = '{name}';
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeOpacity = 0.5;
        // polygonTemplate.fill = chart.colors.getIndex(0);
        polygonTemplate.fill = chart.colors.getIndex(0).lighten(0.5);

        const hs = polygonTemplate.states.create('hover');
        hs.properties.fill = chart.colors.getIndex(0);

        chart.zoomControl = new am4maps.ZoomControl();

        this.locationSeries = chart.series.push(new am4maps.MapImageSeries());
        this.locationSeriesTemplate = this.locationSeries.mapImages.template;
        this.locationSeriesTemplate.propertyFields.latitude = 'latitude';
        this.locationSeriesTemplate.propertyFields.longitude = 'longitude';
        this.locationSeriesTemplate.tooltipText = '{title}';
        this.locationSeries.data = [];

        // Add lines
        const lineSeries = chart.series.push(new am4maps.MapLineSeries());
        lineSeries.mapLines.template.line.strokeWidth = this.updatedWidth / 200;
        lineSeries.mapLines.template.line.strokeOpacity = 0.5;
        lineSeries.mapLines.template.line.stroke = am4core.color(
          this.colors.primaryColor,
        );
        lineSeries.mapLines.template.line.nonScalingStroke = true;
        lineSeries.zIndex = 10;
        this.lineSeries = lineSeries;

        const shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
        shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
        shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
        shadowLineSeries.mapLines.template.shortestDistance = false;
        shadowLineSeries.zIndex = 5;
        this.shadowLineSeries = shadowLineSeries;

        this.chart = chart;

        if (!this.svg || this.svg === null) return null;
        const svgGroup = this.svg.childNodes[2].childNodes[1].childNodes[1]
          .childNodes[0];
        const sensorTitle = `<text
        id="sensor-title-${this.updatedSensor.id}"
        transform="translate(${this.updatedWidth / 2}, ${this.updatedHeight /
          10})"
        text-anchor="middle"
        x="0"
        class="sensor-title"
      >
        ${this.updatedSensor.name}
      </text>`;
        svgGroup.insertAdjacentHTML('beforeend', sensorTitle);
        this.sensorTitle = document.getElementById(
          `sensor-title-${this.updatedSensor.id}`,
        );

        const deleteBtn = `<circle
        id="delete-btn-${this.updatedSensor.id}"
        transform="translate(${this.updatedWidth / 1.2}, ${this.updatedHeight /
          10})"
        r="${this.updatedWidth / 15}"
        class="delete-button"
      />`;
        svgGroup.insertAdjacentHTML('beforeend', deleteBtn);
        this.deleteBtn = document.getElementById(
          `delete-btn-${this.updatedSensor.id}`,
        );
        this.elementsMounted = true;
        this.setListeners();
      } catch (error) {
        this.elementsMounted = false;
        return error;
      }
    },

    createCustomMarker(image) {
      const chart = image.dataItem.component.chart;
      const holderId = `map-marker-${image.timestamp}`;
      let holderIsNew = true;
      let holder = document.getElementById(holderId);
      if (!holder || holder === null) {
        holder = document.createElement('div');
        holder.id = holderId;
        holder.className = 'map-marker';
        holder.style.position = 'absolute';
      } else {
        holderIsNew = false;
      }
      holder.title = image.tooltipText;
      if (undefined !== image.url) {
        holder.onclick = () => {
          window.location.href = image.url;
        };
        holder.className += ' map-clickable';
      }

      const dotId = `dot-marker-${image.timestamp}`;
      let dot = document.getElementById(dotId);
      if ((!dot || dot === null) && image.active) {
        dot = document.createElement('div');
        dot.id = dotId;
        dot.className = 'dot';
        holder.appendChild(dot);
      } else if (dot && !image.active) {
        holder.removeChild(dot);
      }

      const pulseId = `pulse-marker-${image.timestamp}`;
      let pulse = document.getElementById(pulseId);
      if (!pulse || pulse === null) {
        pulse = document.createElement('div');
        pulse.id = dotId;
        pulse.className = 'pulse';
        holder.appendChild(pulse);
      }
      if (holderIsNew) {
        chart.svgContainer.htmlElement.appendChild(holder);
      } else {
        chart.svgContainer.htmlElement.replaceChild(
          holder,
          document.getElementById(holderId),
        );
        // chart.svgContainer.htmlElement.appendChild(holder);
      }
      return holder;
    },

    removeCustomMarker(image) {
      const chart = image.dataItem.component.chart;
      const holderId = `map-marker-${image.timestamp}`;
      let holder = document.getElementById(holderId);
      if (!holder || holder === null) {
        return null;
      }
      chart.svgContainer.htmlElement.removeChild(holder);
      return holder;
    },

    updateCustomMarkers() {
      if (!this.elementsMounted) return null;
      // if (this.locationSeries.mapImages.length >= this.markerMaxCount)
      this.locationSeries.mapImages.each(image => {
        if (!image || !image.timestamp || !image.latitude) return null;
        const diff = new Date().getTime() - image.timestamp;
        // console.log('DIFF UPDATE', diff);
        let updateMarker = false;
        if (image.isNew) {
          image.isNew = false;
          updateMarker = true;
        } else if (diff > this.activeDelay * 3 * 1000) {
          this.removeCustomMarker(image);
          this.removeLine(image);
          image.disabled = true;
          return;
        }

        if (image.timestamp === this.lastPoint.timestamp) {
          if (diff > 0 && diff < this.activeDelay * 1000 && image.hasMoved) {
            if (!image.active) updateMarker = true;
            image.active = true;
          } else {
            if (image.active) updateMarker = true;
            image.active = false;
          }
        } else {
          if (image.active) updateMarker = true;
          image.active = false;
        }

        if (updateMarker) {
          image.dummyData = {
            externalElement: this.createCustomMarker(image),
          };
        }

        const xy = this.chart.geoPointToSVG({
          longitude: image.longitude,
          latitude: image.latitude,
        });
        if (xy.y < 0 || xy.x < 0) {
          image.dummyData.externalElement.style.display = 'none';
        } else if (xy.y > this.updatedHeight || xy.x > this.updatedWidth) {
          image.dummyData.externalElement.style.display = 'none';
        } else {
          image.dummyData.externalElement.style.display = 'block';
        }
        if (image.dummyData && image.dummyData.externalElement) {
          image.dummyData.externalElement.style.top = xy.y + 'px';
          image.dummyData.externalElement.style.left = xy.x + 'px';
        }
      });
    },

    setListeners() {
      if (this.elementsMounted) {
        this.chart.events.on('ready', this.debouncedUpdateCustomMarkers);
        this.chart.events.on(
          'mappositionchanged',
          this.debouncedUpdateCustomMarkers,
        );
        this.sensorTitle.addEventListener('click', () => {
          this.flipSide(!this.aSide);
        });
        this.deleteBtn.addEventListener('click', () => {
          this.deleteSensor(this.updatedSensor);
        });
      }
    },

    zoomLevel(rate) {
      if (rate && rate !== null && typeof rate === 'number') {
        return (this.updatedHeight / 15) * rate;
      }
      return this.updatedHeight / 15;
    },

    setZoomRate(distance) {
      if (distance === 0) {
        return 3;
      } else if (distance > 0 && distance <= 50) {
        return 2.8;
      } else if (distance > 50 && distance <= 100) {
        return 2.5;
      } else if (distance > 100 && distance <= 250) {
        return 2.3;
      } else if (distance > 250 && distance <= 500) {
        return 2.1;
      } else if (distance > 500 && distance <= 1000) {
        return 1.7;
      }
      return 1;
    },

    checkDistance(distance) {
      if (distance > this.activeDistance) {
        return true;
      }
      return false;
    },

    addLocation(location) {
      const point = this.locationSeries.mapImages.create();
      point.latitude = location.latitude;
      point.longitude = location.longitude;
      point.timestamp = location.timestamp;
      point.active = location.active;
      point.isNew = true;
      point.hasMoved = location.hasMoved;
      point.tooltipText = new Date(location.timestamp * 1000);
      if (this.lastPoint && this.lastPoint !== null) {
        this.addLine(this.lastPoint, point);
      }
      return point;
    },

    addLine(from, to) {
      const line = this.lineSeries.mapLines.create();
      line.timestamp1 = from.timestamp;
      line.timestamp2 = to.timestamp;
      line.imagesToConnect = [from, to];
      line.line.controlPointDistance = -0.3;
      const shadowLine = this.shadowLineSeries.mapLines.create();
      shadowLine.timestamp1 = from.timestamp;
      shadowLine.timestamp2 = to.timestamp;
      shadowLine.imagesToConnect = [from, to];
      return line;
    },

    removeLine(image) {
      this.lineSeries.mapLines.each(line => {
        if (line.timestamp1 === image.timestamp) {
          const parentElement = line.dom.parentElement;
          // console.log('LINE TO DELETE', line, parentElement);
          if (parentElement && parentElement !== null) {
            parentElement.removeChild(line.dom);
          }
          line.disabled = true;
          return;
        } else if (line.timestamp2 === image.timestamp) {
          const parentElement = line.dom.parentElement;
          if (parentElement && parentElement !== null) {
            parentElement.removeChild(line.dom);
          }
          line.disabled = true;
          return;
        }
      });
      this.shadowLineSeries.mapLines.each(line => {
        if (line.timestamp1 === image.timestamp) {
          const parentElement = line.dom.parentElement;
          if (parentElement && parentElement !== null) {
            parentElement.removeChild(line.dom);
          }
          line.disabled = true;
          return;
        } else if (line.timestamp2 === image.timestamp) {
          const parentElement = line.dom.parentElement;
          if (parentElement && parentElement !== null) {
            parentElement.removeChild(line.dom);
          }
          line.disabled = true;
          return;
        }
        return;
      });
    },

    buildLocation() {
      if (this.latitude !== null && this.longitude !== null) {
        // check if timestamp is less than 10 seconds ago
        // if yes set active to true
        // const diff = new Date().getTime() - this.timestamp;
        // // console.log('DIFF', diff);
        // let active = false;
        // if (diff < this.activeDelay * 1000) {
        //   active = true;
        // }
        return {
          // active,
          latitude: Number(this.latitude),
          longitude: Number(this.longitude),
          timestamp: this.timestamp,
        };
      }
    },

    updateLocationSeries(newValue, oldValue) {
      if (
        !newValue ||
        newValue === null ||
        typeof newValue !== 'object' ||
        !newValue.latitude ||
        !newValue.longitude
      ) {
        return null;
      }
      let zoomRate = 0;
      newValue.hasMoved = false;
      if (oldValue && oldValue.latitude && oldValue.longitude) {
        const travelledDistance = getDistanceFromCoordinates(
          oldValue.latitude,
          oldValue.longitude,
          newValue.latitude,
          newValue.longitude,
        );
        if (this.checkDistance(travelledDistance * 1000)) {
          newValue.hasMoved = true;
          newValue.active = true;
          // lower the distance higher the zoom
          zoomRate = this.setZoomRate(travelledDistance);
        }
      } else {
        newValue.hasMoved = true;
      }
      if (this.elementsMounted) {
        this.lastPoint = this.addLocation(newValue, this.updatedSensor.name);
        // set zoomLatitude and zoomLongitude based on difference between lastpoint and newpoint
        if (this.autoZoom) {
          this.chart.zoomToGeoPoint(
            {
              latitude: newValue.latitude + 1,
              longitude: newValue.longitude + 1,
            },
            this.zoomLevel(zoomRate),
            true,
          );
        }

        this.updateCustomMarkers();
      }
    },
  },
};
</script>
