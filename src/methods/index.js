import SensorStyles from '../styles/SensorStyles';
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
      devEui: props.devEui || null,
      devAddr: props.devAddr || null,
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
      icons: props.icons.split(','),
      colors: JSON.parse(props.colors),
      value: JSON.parse(props.value),
    };
    return sensor;
  } catch (error) {
    return error;
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
  if (val > limit) return limit;
  if (val < min) return min;
  return val;
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
    return error;
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
    return error;
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
    return error;
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
    return error;
  }
};
