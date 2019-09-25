const colorStyle = conf => {
  return `svg.sensor-color {
  font-family: ${conf.fontFamily};
  --font-color: ${conf.fontColor};
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --danger: ${conf.dangerColor};
  --border: 1px solid transparent;
  --box-shadow: 0 ${conf.width / 50}px ${conf.width / 35}px 0px #6e6e6e;
  --box-shadow-selected: 0 ${conf.width / 75}px ${conf.width /
    100}px 0px #6e6e6e;
  text-align: center;
}
svg.sensor-color >  circle.sensor-button {
  fill: transparent;
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}
svg.sensor-color > g > circle.sensor-button:hover {
  stroke-width: ${conf.width / 35}px;
}
svg.sensor-color > g > circle.sensor-button:active {
  stroke-width: ${conf.width / 25}px;
}
svg.sensor-color > text.sensor-value {
  fill: var(--font-color); 
  font-size: ${conf.height / 10}px;
  font-weight: 700;
}
svg.sensor-color > circle.color-button {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}
svg.sensor-color > circle.color-button:hover {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 35}px;
}
svg.sensor-color > circle.color-button:active {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 25}px;
}`;
};

export default colorStyle;
