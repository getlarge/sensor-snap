<template>
  <svg
    v-if="updatedSensor && updatedSensor.type && updatedSensor.type === 3336"
    :id="`map-${updatedSensor.id}`"
    :ref="`map-${updatedSensor.id}`"
    :width="updatedWidth"
    :height="updatedHeight"
    :viewBox="viewBox"
    class="sensor-map"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g
      v-show="countries"
      x="0"
      y="0"
      :id="`map-paths-${updatedSensor.id}`"
      :ref="`mapPaths-${updatedSensor.id}`"
    ></g>
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
  </svg>
</template>

<script>
import { geoMercator, geoPath } from 'd3-geo';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import { scaleQuantize } from 'd3-scale';
import { active } from 'd3-transition';
import { schemeBlues } from 'd3-scale-chromatic';
import { zoom } from 'd3-zoom';
import { feature } from 'topojson-client';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import {
  calculateDistance,
  getComponentResource,
  getDistanceFromCoordinates,
  mapValuetoRange,
} from '@/methods';
import SensorEvents from '@/mixins/sensor-events';

/**
 * @module components/SensorMap
 * @description  Child component called when Object Id : 3336
 * @vue-data {boolean} isPaused - Indicate if cron is paused
 * @vue-data {boolean} isStarted - Indicate if cron is started
 * @vue-computed {function} colors
 * @vue-computed {number} latitude - OMA resource 5514
 * @vue-computed {number} longitude - OMA resource 5515
 * @vue-computed {number} timestamp - OMA resource 5518
 * @vue-event {void} mountElements - Get/set all DOM references
 */
export default {
  name: 'SensorMap',

  mixins: [SensorEvents],

  data() {
    return {
      updatedMapType: null,
      currentLocation: null,
      lineSeries: null,
      shadowLineSeries: null,
      lastPoint: null,
      mapUrl: 'https://unpkg.com/world-atlas@1/world/110m.json',
      mapData: null,
      mapPaths: null,
      mapScale: 1,
      minZoom: 0.8,
      maxZoom: 40,
      xMove: 0,
      yMove: 0,
      originName: 'POZ',
      locationSeries: [],
      speed: 2800, // km/sec
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
    colorPalette() {
      return scaleQuantize([1, 1000], schemeBlues[9]);
      // return scaleQuantize()
      //   .domain([0, 1000])
      //   .range(schemeBlues);
      //   // .range([this.colors.primaryColor, this.colors.secondaryColor]);
    },
    mapHeight() {
      if (!this.mapPaths) return null;
      return this.mapPaths.getBoundingClientRect().height;
    },
    mapWidth() {
      if (!this.mapPaths) return null;
      return this.mapPaths.getBoundingClientRect().width;
    },
    tooltip() {
      if (!this.elementsMounted) return null;
      return this.svg
        .append('foreignObject')
        .append('div')
        .attr('class', 'tooltipDestination');
    },
    center() {
      return [0, 0];
    },
    projection() {
      return geoMercator();
    },
    originGeo() {
      if (this.lastPoint && this.lastPoint.coord) return this.lastPoint.coord;
      if (this.location && this.location.coord) return this.location.coord;
      return [16.8286, 52.42];
    },
    originPos() {
      if (!this.projection) return null;
      return this.projection(this.originGeo);
    },
    path() {
      if (!this.projection) return null;
      return geoPath().projection(this.projection);
    },
    countries() {
      if (!this.mapData || !this.countriesGroup || !this.path) return null;
      return this.countriesGroup
        .selectAll('.country')
        .data(feature(this.mapData, this.mapData.objects.countries).features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', this.path)
        .style('fill', d => this.getColor(d.id));
    },
    markerSize() {
      return mapValuetoRange(this.mapScale, this.minZoom, this.maxZoom, 10, 2);
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
    timestamp: {
      handler(newValue, oldValue) {
        if (!newValue || oldValue === newValue) {
          return;
        }
        if (oldValue !== null && typeof oldValue !== 'number') {
          oldValue = Number(oldValue);
        }
        if (typeof newValue !== 'number') {
          newValue = Number(newValue);
          if (isNaN(newValue)) {
            return;
          }
        }
        this.location = this.buildLocation();
      },
      immediate: true,
    },
    location: {
      handler(newValue, oldValue) {
        if (this.elementsMounted && this.throttledUpdateLocationSeries) {
          this.throttledUpdateLocationSeries(newValue, oldValue);
        }
      },
      immediate: true,
    },
  },

  created() {
    this.debouncedUpdateMarkers = debounce(this.updateMarkers, 50);
    this.throttledUpdateLocationSeries = throttle(
      this.updateLocationSeries,
      100,
    );
  },

  async mounted() {
    await this.mountElements();
    if (
      this.elementsMounted &&
      this.location &&
      this.location !== null &&
      this.location.timestamp
    ) {
      this.updateLocationSeries(this.location);
    }
  },

  beforeDestroy() {
    this.elementsMounted = false;
  },

  methods: {
    getColor(id) {
      return this.colorPalette(id);
    },

    getArc(d, s) {
      const dx = d.destination.x - d.origin.x;
      const dy = d.destination.y - d.origin.y;
      const dr = Math.sqrt(dx * dx + dy * dy);
      const spath = s === false ? ' 0 0,0 ' : ' 0 0,1 ';
      return `M
        ${d.origin.x}
        ,
        ${d.origin.y}
        A
        ${dr}
        ,
        ${dr}
        ${spath}
        ${d.destination.x}
        ,
        ${d.destination.y}`;
    },

    calculateDuration(distance) {
      return (distance / this.speed) * 1000;
    },

    createConnection(point, index) {
      if (!point) {
        return null;
      }
      const destinationGeo = point.coord;
      const connection = [this.originPos, this.projection(destinationGeo)];
      const distance = calculateDistance(
        this.originGeo[1],
        this.originGeo[0],
        destinationGeo[1],
        destinationGeo[0],
      );
      const duration = this.calculateDuration(distance);

      this.svg
        .append('path')
        .datum(connection)
        .attr('class', `arc-${this.updatedSensor.id}-${index}`)
        .attr('id', `link-${this.updatedSensor.id}-${index}`)
        .attr('d', coordinates => {
          const d = {
            origin: { x: coordinates[0][0], y: coordinates[0][1] },
            destination: { x: coordinates[1][0], y: coordinates[1][1] },
          };
          const s = d.destination.x > d.origin.x ? true : false;
          return this.getArc(d, s);
        })
        .style('stroke', this.colors.primaryColor)
        .style('stroke-width', `${this.markerSize / 14}px`)
        .style('fill', 'none')
        .transition()
        .duration(duration)
        .attrTween('stroke-dasharray', function() {
          const len = this.getTotalLength();
          return t => interpolate(`0, ${len}`, `${len} ,0`)(t);
        });
      // .on('end', () => this.createMarker(point, index));
      return {
        arc: document.querySelector(`#link-${this.updatedSensor.id}-${index}`),
      };
    },

    removeConnection(index) {
      this.svg.select(`#link-${this.updatedSensor.id}-${index}`).remove();
    },

    createMarker(point, index) {
      const self = this;
      const projection = this.projection;
      const [x, y] = projection(point.coord);
      let counter = 0;

      this.svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', '0px')
        .attr('id', `point-inner-circle-${this.updatedSensor.id}-${index}`)
        .attr('class', 'destCircleInner')
        .style('fill', this.colors.primaryColor)
        .style('fill-opacity', '1')
        .transition()
        .duration(300)
        .attr('r', `${this.markerSize / 6}px`);

      this.svg
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', '0px')
        .attr('id', `point-outter-circle-${this.updatedSensor.id}-${index}`)
        .attr('class', 'destCircleOutter')
        .attr('r', `${this.markerSize / 3}px`)
        .style('fill', 'black')
        .style('fill-opacity', '0.05')
        .transition()
        .on('start', function repeat() {
          if (counter >= self.activeDelay) {
            select(this).interrupt();
          } else {
            const delay = 1000;
            counter += 1;
            active(this)
              .attr('r', `${self.markerSize / 2}px`)
              .transition()
              .duration(delay / 2)
              .attr('r', `${self.markerSize / 6}px`)
              .transition()
              .delay(delay / 2)
              .on('start', repeat);
          }
        });

      this.svg
        .append('circle')
        .datum([x, y])
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', '0px')
        .attr('id', `point-mouse-circle-${this.updatedSensor.id}-${index}`)
        .style('class', 'destCircleMouse')
        .style('fill', this.colors.primaryColor)
        .style('fill-opacity', '1')
        .on('mouseover', (event, d) => {
          this.tooltip
            .html(`<span style="color:white">${this.updatedSensor.name}</span>`)
            .attr('class', 'tooltipDestination')
            .style('left', `${d[0] + 12}px`)
            .style('top', `${d[1] - 20}px`)
            .transition()
            .duration(700)
            .style('opacity', 1);
        })
        .on('mouseout', () => {
          this.tooltip
            .transition()
            .duration(700)
            .style('opacity', 0);
        })
        .transition()
        .duration(300)
        .attr('r', `${this.markerSize / 6}px`)
        .on('end', function() {
          select(this)
            .transition()
            .duration(1000)
            .attr('r', `${self.markerSize}px`)
            .style('fill-opacity', '0');
        });

      return {
        innerCircle: document.querySelector(
          `#point-inner-circle-${this.updatedSensor.id}-${index}`,
        ),
        outterCircle: document.querySelector(
          `#point-outter-circle-${this.updatedSensor.id}-${index}`,
        ),
        mouseCircle: document.querySelector(
          `#point-mouse-circle-${this.updatedSensor.id}-${index}`,
        ),
      };
    },

    removeMarker(index) {
      this.svg
        .select(`#point-inner-circle-${this.updatedSensor.id}-${index}`)
        .remove();
      this.svg
        .select(`#point-outter-circle-${this.updatedSensor.id}-${index}`)
        .remove();
      this.svg
        .select(`#point-mouse-circle-${this.updatedSensor.id}-${index}`)
        .remove();
    },

    removeMarkers() {
      this.svg.selectAll('.destCircleInner').remove();
      this.svg.selectAll('.destCircleOutter').remove();
      this.svg.selectAll('.destCircleMouse').remove();
      for (var i = 0; i < this.locationSeries.length; i += 1) {
        this.svg.selectAll(`.arc-${this.updatedSensor.id}-${i}`).remove();
      }
    },

    updateMarker(point, index) {
      if (!point || !point.timestamp || !point.latitude) {
        return;
      }
      const diff = new Date().getTime() - point.timestamp;
      let updateMarker = false;
      if (point.isNew) {
        point.isNew = false;
        updateMarker = true;
      } else if (diff > this.activeDelay * 3 * 1000) {
        this.removeConnection(index);
        this.removeMarker(index);
        point.disabled = true;
        return;
      }

      if (this.lastPoint && point.timestamp === this.lastPoint.timestamp) {
        if (diff > 0 && diff < this.activeDelay * 1000 && point.hasMoved) {
          if (!point.active) updateMarker = true;
          point.active = true;
        } else {
          if (point.active) updateMarker = true;
          point.active = false;
        }
      } else {
        if (point.active) updateMarker = true;
        point.active = false;
      }

      if (updateMarker) {
        if (!point.elements) {
          point.elements = {
            ...this.createConnection(point, index),
            ...this.createMarker(point, index),
          };
          return;
        }
      }
      const pointElements = Object.keys(point.elements);
      const newX = this.xMove;
      const newY = this.yMove;
      const scale = this.mapScale;

      if (pointElements.length > 0) {
        pointElements.forEach(key => {
          point.elements[key].setAttribute(
            'transform',
            `translate(${newX}, ${newY}) scale(${scale})`,
          );
          if (key === 'arc') {
            point.elements[key].setAttribute(
              'stroke-width',
              `${this.markerSize / 14}px`,
            );
          } else {
            point.elements[key].setAttribute('r', `${this.markerSize / 6}px`);
          }
        });
      }
    },

    updateMarkers() {
      if (!this.elementsMounted) return;
      // if (this.locationSeries.length >= this.markerMaxCount)
      this.locationSeries.forEach((point, index) => {
        this.updateMarker(point, index);
      });
    },

    addLocation(location) {
      location.isNew = true;
      location.tooltipText = new Date(location.timestamp * 1000);
      this.locationSeries.push(location);
      return location;
    },

    buildLocation() {
      if (this.latitude !== null && this.longitude !== null) {
        return {
          coord: [Number(this.longitude), Number(this.latitude)],
          latitude: Number(this.latitude),
          longitude: Number(this.longitude),
          name: this.updatedSensor.name,
          timestamp: this.timestamp,
        };
      }
      return null;
    },

    zoomLevel(rate) {
      if (rate && rate !== null && typeof rate === 'number') {
        return (this.updatedHeight / 15) * rate;
      }
      return this.updatedHeight / 15;
    },

    setZoomRateByDistance(distance) {
      if (distance === 0) return 3;
      else if (distance > 0 && distance <= 50) return 2;
      else if (distance > 50 && distance <= 100) return 1.1;
      else if (distance > 100 && distance <= 250) return 0.8;
      else if (distance > 250 && distance <= 500) return 0.5;
      else if (distance > 500 && distance <= 1000) return 0.3;
      return 0.1;
    },

    zoomed(event) {
      // console.log('ZOOMED', event.transform, this.mapPaths.attributes);
      this.mapScale = event.transform.k;
      this.xMove = event.transform.x;
      this.yMove = event.transform.y;
      this.countriesGroup.attr('transform', event.transform);
      this.debouncedUpdateMarkers();
    },

    zoomListener() {
      const minX = 0;
      const maxX = this.mapWidth;
      const minY = -this.mapHeight / 4;
      const maxY = this.mapHeight / 1.5;
      return (
        zoom()
          .scaleExtent([this.minZoom, this.maxZoom])
          .translateExtent([
            [minX, minY],
            [maxX, maxY],
          ])
          // .extent([[0, 0], [width, height]])
          .on('zoom', event => this.zoomed(event))
      );
    },

    doubleClicked(e) {
      const left = this.map.getBoundingClientRect().left;
      const top = this.map.getBoundingClientRect().top;
      // const leftMap = this.mapPaths.getBoundingClientRect().left;
      // const topMap = this.mapPaths.getBoundingClientRect().top;
      // console.log('doubleClicked left top', left, leftMap, top, topMap);
      // const leftDiff = leftMap - left;
      // const topDiff = topMap - top;
      // console.log('doubleClicked diff', leftDiff, topDiff);
      this.layerX = e.targetTouches ? e.targetTouches[0].layerX : e.layerX;
      this.layerY = e.targetTouches ? e.targetTouches[0].layerY : e.layerY;
      this.mouseX = this.layerX - left;
      this.mouseY = this.layerY - top;
      // map those values to mapPaths x, y and scale
      // this.mouseDy = (this.layerY - this.mouseInitialY) * this.mouseDyFactor;
      // this.newY = this.currentY + this.mouseY - this.layerY;

      // if (this.newY >= 0 && this.newY <= this.updatedHeight) {
      //   this.currentY = this.newY;
      //   // this.mouseY = this.layerY;
      // } else {
      //   this.currentY = this.newY < 0 ? 0 : this.updatedHeight;
      // }

      // console.log('doubleClicked newX newY', this.layerX, this.layerY);
      // console.log(
      //   'doubleClicked',
      //   svgToGeoPoint(this.mouseX, this.mouseY, this.updatedWidth),
      // );
    },

    checkDistance(distance) {
      return distance > this.activeDistance ? true : false;
    },

    async mountElements() {
      try {
        if (!window.SVGPathElement || window.SVGPathElement === null) {
          return;
        }
        this.mapData = await fetch(this.mapUrl).then(body => body.json());
        this.countriesGroup = select(`#map-paths-${this.updatedSensor.id}`);
        this.mapPaths = this.$refs[`mapPaths-${this.updatedSensor.id}`];
        this.map = this.$refs[`map-${this.updatedSensor.id}`];
        this.svg = select(`#map-${this.updatedSensor.id}`);
        setTimeout(() => {
          this.svg
            .call(this.zoomListener())
            .on('dblclick.zoom', event => this.doubleClicked(event));
          this.elementsMounted = true;
        }, 350);
      } catch (error) {
        this.elementsMounted = false;
        throw error;
      }
    },

    updateLocationSeries(newValue, oldValue) {
      if (
        !newValue ||
        newValue === null ||
        !newValue.latitude ||
        !newValue.longitude ||
        !this.elementsMounted
      ) {
        return;
      }
      this.zoomRate = 0;
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
          // the lower the distance higher the zoom
          this.zoomRate = this.setZoomRateByDistance(travelledDistance);
        }
      } else {
        newValue.hasMoved = true;
      }
      // set zoomLatitude and zoomLongitude based on difference between lastpoint and newpoint
      // if (this.autoZoom) {
      // const width = this.mapPaths.width * transform.scale
      // const [x, y] = this.projection(newValue.coord);
      // console.log('UPDATE LOCATION ', newValue.coord, x, y);
      // const transform = zoomIdentity.translate(x, y).scale(0.2);
      // console.log('AUTOZOOM', transform);
      // this.countriesGroup.attr('transform', transform);
      // }
      this.addLocation(newValue, this.updatedSensor.name);
      // console.log('location series', this.locationSeries);
      this.updateMarkers();
      this.lastPoint = this.location;
    },
  },
};
</script>
