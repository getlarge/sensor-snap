const switchStyle = (conf) => {
  return `svg.sensor-switch {
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
}
svg.sensor-switch > g > circle.sensor-button {
  fill: transparent;
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}
svg.sensor-switch > g > circle.sensor-button:hover {
  stroke-width: ${conf.width / 35}px;
}
svg.sensor-switch > g > circle.sensor-button:active {
  stroke-width: ${conf.width / 25}px;
}
svg.sensor-switch > g > text.sensor-value {
  fill: var(--font-color); 
  font-size: ${conf.height / 7}px;
  font-weight: 700;
}`;
};

export default switchStyle;
