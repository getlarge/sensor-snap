import SensorStyles from '../assets/sensor-styles';
import componentsList from '../assets/components-list';

/**
 * Triggered when a sensor has been updated
 * Format Sensor instance with SensorSnap props
 * @module methods/formatSensor
 * @param  {object} props - props
 * @return {object} sensor - Aloes Sensor instance
 */
export const formatSensor = props => {
  try {
    const sensor = {
      id: props.id,
      deviceId: props.deviceId,
      ownerId: props.ownerId,
      devEui: props.devEui,
      frameCounter: props.frameCounter,
      transportProtocol: props.transportProtocol,
      transportProtocolVersion: props.transportProtocolVersion,
      messageProtocol: props.messageProtocol,
      messageProtocolVersion: props.messageProtocolVersion,
      inputPath: props.inputPath,
      outputPath: props.outputPath,
      inPrefix: props.inPrefix || null,
      outPrefix: props.outPrefix || null,
      nativeSensorId: props.nativeSensorId,
      nativeNodeId: props.nativeNodeId || null,
      name: props.name,
      type: props.type,
      resources: JSON.parse(props.resources),
      resource: props.resource,
      icons: props.icons ? props.icons.split(',') : [],
      colors: JSON.parse(props.colors),
      value: JSON.parse(props.value),
    };
    return sensor;
  } catch (error) {
    return null;
  }
};

/**
 * Validate new value input ( number )
 * @module methods/normalizeNumber
 * @param  {any} value - New sensor value
 * @param  {int} min - Min Range value
 * @param  {init} limit - Max Range value
 * @return {float} val - Normalized value
 */
export const normalizeNumber = (value, min, limit) => {
  const val = Number(value);
  if (val > limit) {
    return limit;
  }
  if (val < min) {
    return min;
  }
  return val;
};

/**
 * Mapping a value within a know range to another value using output range
 * @module methods/mapValuetoRange
 * @param  {float} input - Input value
 * @param  {int} x1 - Min Input range value
 * @param  {int} y1 - Max Input range value
 * @param  {int} x2 - Min Output range value
 * @param  {int} y2 - Max Output range value
 * @return {float} output - mapped value
 */
export const mapValuetoRange = (input, x1, y1, x2, y2) =>
  ((input - x1) * (y2 - x2)) / (y1 - x1) + x2;

/**
 * Convert SVG X coordinate to a longitude
 * @module methods/xToLongitude
 * @param  {float} x
 * @param  {width} svg width
 * @return {float}
 */
const xToLongitude = (x, width) => {
  return (x * 180) / width;
};

/**
 * Convert SVG Y coordinate to a latitude
 * @module methods/yToLatitude
 * @param  {float} y
 * @param  {width} svg width
 * @return {float}
 */
const yToLatitude = (y, width) => {
  return (-y * 180) / width + 90;
};

/**
 * Convert SVG coordinates to location coordinates
 * @module methods/svgToGeoPoint
 * @param  {float} x
 * @param  {float} y
 * @param  {width} svg width
 * @return {object}
 */
export const svgToGeoPoint = (x, y, width) => {
  return { latitude: yToLatitude(y, width), longitude: xToLongitude(x, width) };
};

/**
 * Convert longitude to SVG Y coordinate
 * @module methods/longitudeToX
 * @param  {float} longitude
 * @param  {width} svg width
 * @return {float}
 */
const longitudeToX = (longitude, width) => {
  return (longitude / 180) * width;
};

/**
 * Convert latitude to SVG Y coordinate
 * @module methods/longitudeToX
 * @param  {float} longitude
 * @param  {width} svg width
 * @return {float}
 */
const latitudeToY = (latitude, width) => {
  return (-latitude / 180) * width + 90;
};

/**
 * Convert SVG coordinates to location coordinates
 * @module methods/geoPointToSvg
 * @param  {float} latitude
 * @param  {float} longitude
 * @param  {width} svg width
 * @return {object}
 */
export const geoPointToSvg = (latitude, longitude, width) => {
  return { x: longitudeToX(longitude, width), y: latitudeToY(latitude, width) };
};

/**
 * Transform an angle value from degree to radians ( number )
 * @module methods/degreesToRadians
 * @param  {float} deg - Angle in degree
 * @return {float} angle in radians
 */
export const degreesToRadians = deg => {
  return deg * (Math.PI / 180);
};

/**
 * Calculate the distance travelled between two ccordinates using Haversine formula
 * @module methods/getDistanceFromCoordinates
 * @param  {float} lat1 - Latitude from first location set
 * @param  {float} lng1 - Longitude from first location set
 * @param  {float} lat2 - Latitude from second location set
 * @param  {float} lng2 - Longitude from second location set
 * @return {float} distance in kilometers
 */
export const getDistanceFromCoordinates = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371; // Radius of the earth in km
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  return 12742 * Math.asin(Math.sqrt(a));
};
/**
 * Convert input value in percentage
 * @module methods/getValueInPercentage
 * @param  {float} value - New sensor value
 * @param  {int} min - Min Range value
 * @param  {init} max - Max Range value
 * @return {float} val - Normalized value
 */
export const getValueInPercentage = (value, min, max) => {
  const newMax = max - min;
  const newVal = value - min;
  return (100 * newVal) / newMax;
  // var absMin = Math.abs(min);
  // return 100 * (absMin + value) / (max + absMin);
};

/**
 * Triggered when a new sensor type has been initialized
 * @module methods/formatSensor
 * @param  {object} sensor - sensor instance
 * @param  {object} stylesConf - Overriding default style config
 * @param  {string} componentName - Vue component nanme associated with this sensor type
 * @return {string} styles - Configured CSS
 */
export const updateStyles = (sensor, stylesConf, componentName) => {
  try {
    if (!componentName || componentName === null) {
      //  throw new Error('No component name');
      return null;
    }
    const styleName = componentName.split('-')[1];
    const styles = `${SensorStyles.picker(
      'snap',
      sensor,
      stylesConf,
    )} ${SensorStyles.picker(styleName, sensor, stylesConf)}`;
    //  console.log('updateStyles', this.style)
    return styles;
  } catch (error) {
    return null;
  }
};

/**
 * Validate that the right Vue component is getting loaded
 * @module methods/checkComponentType
 * @param  {string} componentType - Vue component name associated with this sensor type
 * @param  {int} sensorType - Vue component nanme associated with this sensor type
 * @return {array} objectIds - OMA Object ID supported by this component
 */
export const checkComponentType = (componentType, sensorType) => {
  try {
    if (!Object.prototype.hasOwnProperty.call(componentsList, componentType)) {
      return null;
      //  throw new Error('Unknown component type');
    }
    return componentsList[componentType].list.find(
      objectId => objectId === sensorType,
    );
  } catch (error) {
    return null;
  }
};

/**
 * Load specific Vue component resource
 * @module methods/getComponentResource
 * @param  {string} componentType - Vue component name associated with this sensor type
 * @param  {string} componentResource - Vue component resource
 * @return {any} result - property contained in ComponentType config
 */
export const getComponentResource = (componentType, componentResource) => {
  try {
    if (!Object.prototype.hasOwnProperty.call(componentsList, componentType)) {
      return null;
      //  throw new Error('Unknown component type');
    }
    if (
      !Object.prototype.hasOwnProperty.call(
        componentsList[componentType],
        componentResource,
      )
    ) {
      throw new Error('Unknown component resource');
    }
    return componentsList[componentType][componentResource];
  } catch (error) {
    return null;
  }
};

export const setRangeColors = (value, minRangeValue, maxRangeValue) => {
  try {
    let c;
    if (value < minRangeValue) {
      c = componentsList.gauge.colors.secondaryColor;
    } else if (value < maxRangeValue + minRangeValue / 2) {
      c = componentsList.gauge.colors.successColor;
    } else if (value < maxRangeValue) {
      c = componentsList.gauge.colors.warningColor;
    } else {
      c = componentsList.gauge.colors.dangerColor;
    }
    return c;
  } catch (error) {
    return null;
  }
};

/**
 * Expose a timer module based on setTimeout
 * @module methods/getComponentResource
 * @param  {function} cb - Callback to trigger at timeout
 * @param  {object} data - Data to share between caller and callee
 * @param {number} interval - Timeout interval
 */
export function DeltaTimer(cb, data, interval) {
  let timeout, lastTime;
  let count = 0;

  const loop = () => {
    count += 1;
    const thisTime = +new Date();
    const deltaTime = thisTime - lastTime;
    const delay = Math.max(interval - deltaTime, 0);
    timeout = setTimeout(loop, delay);
    lastTime = thisTime + delay;
    data.delay = delay;
    data.count = count;
    data.time = thisTime;
    data.lastTime = lastTime;
    if (count > 1) cb(data);
  };

  const start = () => {
    timeout = setTimeout(loop, 0);
    lastTime = +new Date();
    return lastTime;
  };

  const stop = () => {
    clearTimeout(timeout);
    return lastTime;
  };

  this.start = start;
  this.stop = stop;
  return timeout;
}
