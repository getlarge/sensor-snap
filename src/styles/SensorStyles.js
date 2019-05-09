import audioStyle from './AudioStyle';
import cameraStyle from './CameraStyle';
import gaugeStyle from './GaugeStyle';
import levelStyle from './LevelStyle';
import switchStyle from './SwitchStyle';
import textStyle from './TextStyle';
import timeStyle from './TimeStyle';

const SensorStyles = {};

const conf = (sensor, styles) => {
  return {
    width: styles.width || 450,
    height: styles.height || 480,
    fontFamily: styles.fontFamily || 'JosefinSlab-SemiBold',
    //  fontFamily2: styles.fontFamily2 || 'Aloes-Bd',
    fontColor: styles.fontColor || '#1C1C1C',
    grey: styles.grey || '#565656',
    primaryColor: styles.primaryColor || '#1dc0ff',
    secondaryColor: styles.secondaryColor || '#55ffb6',
    successColor: styles.successColor || '#69ff4f',
    warningColor: styles.warningColor || '#fff62d',
    dangerColor: styles.dangerColor || '#ff954d',
  };
};

SensorStyles.picker = (styleName, sensor, styles) => {
  return SensorStyles[styleName](conf(sensor, styles));
};

SensorStyles.snap = conf => {
  return `@font-face {
  font-family: 'JosefinSlab-SemiBold';
  src: url('/fonts/Josefin-Slab/JosefinSlab-SemiBold.eot');
  src: url('/fonts/Josefin-Slab/JosefinSlab-SemiBold.eot?#iefix') format('embedded-opentype'),
    url('/fonts/Josefin-Slab/JosefinSlab-SemiBold.svg#JosefinSlab-SemiBold') format('svg'),
    url('/fonts/Josefin-Slab/JosefinSlab-SemiBold.woff') format('woff'),
    url('/fonts/Josefin-Slab/JosefinSlab-SemiBold.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

div.sensor-snap {
  --font-color: ${conf.fontColor};
  --grey: ${conf.grey};
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --danger: ${conf.dangerColor};
  --border-radius: 0px;
  --border: 1px solid transparent;
  --box-shadow: 0 ${conf.width / 70}px ${conf.width / 35}px 0px #6e6e6e;
  --box-shadow-selected: 0 ${conf.width / 75}px ${conf.width /
    100}px 0px #6e6e6e;
  text-align: center;
  font-family: ${conf.fontFamily};
}
div.sensor-snap > svg.sensor {
  border-radius: var(--border-radius);
  border: var(--border);
  box-shadow: var(--box-shadow);
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  point-event: none;
}
div.sensor-snap > svg.sensor:hover {
  box-shadow: var(--box-shadow-selected);
}
div.sensor-snap > .sensor-component {
  border-radius: 1px;
  border: var(--border);
  box-shadow: var(--box-shadow);
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
  point-event: none;
}
div.sensor-snap > .sensor-component:hover {
  box-shadow: var(--box-shadow-selected);
}
div.sensor-snap > svg > text.sensor-title {
  fill: var(--primary-color);
  cursor: pointer;
  font-size: ${conf.height / 16}px;
  font-weight: 700;
}
div.sensor-snap > svg > circle.delete-button {
  fill: var(--danger);
  stroke: var(--warning);
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}
div.sensor-snap > svg > circle.delete-button:hover {
  stroke-width: ${conf.width / 35}px;
}
div.sensor-snap > svg > g > text.sensor-details {
  font-size: ${conf.height / 20}px;
  font-weight: 400;
}
div.sensor-snap > svg > g > text > tspan.editable-field {
  cursor: pointer;
}`;
};

SensorStyles.audio = conf => {
  return audioStyle(conf);
};

SensorStyles.camera = conf => {
  return cameraStyle(conf);
};

SensorStyles.color = conf => {
  return `svg.sensor-color {
  --font-color: ${conf.fontColor};
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --danger: ${conf.dangerColor};
  --border: 1px solid transparent;
  --box-shadow: 0 1px 2px 0px #6e6e6e;
  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;
  text-align: center;
}`;
};
//  SensorStyles.energy = sensor => {};

SensorStyles.gauge = conf => {
  return gaugeStyle(conf);
};

//  SensorStyles.joystick = sensor => {};

SensorStyles.level = conf => {
  return levelStyle(conf);
};

//  SensorStyles.magnetometer = sensor => {};

SensorStyles.map = conf => {
  return `svg.sensor-map {
  --font-color: ${conf.fontColor};
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --danger: ${conf.dangerColor};
  --border: 1px solid transparent;
  --box-shadow: 0 1px 2px 0px #6e6e6e;
  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;
  text-align: center;
}`;
};

//  SensorStyles.power = sensor => {};

SensorStyles.switch = conf => {
  return switchStyle(conf);
};

SensorStyles.text = conf => {
  return textStyle(conf);
};

SensorStyles.timer = conf => {
  return `svg.sensor-timer {
  --font-color: ${conf.fontColor};
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --danger: ${conf.dangerColor};
  --border: 1px solid transparent;
  --box-shadow: 0 1px 2px 0px #6e6e6e;
  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;
  text-align: center;
}`;
};

SensorStyles.time = conf => {
  return timeStyle(conf);
};
export default SensorStyles;
