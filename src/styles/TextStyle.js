const textStyle = conf => {
  return `svg.sensor-text {
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
svg.sensor-text > g > rect  {
  max-width: ${conf.width / 3}px;
  fill: transparent; 
}
svg.sensor-text > g > text.sensor-value {
  fill: var(--font-color); 
  padding: 5px 5px;
  font-size: ${conf.height / 15}px;
  font-weight: 700;
  cursor: pointer;
}
svg.sensor-text > g > rect.sensor-value {
  cursor: pointer;
}
svg.sensor-text > g > text > tspan.editable-resource {
  cursor: pointer;
}`;
};

export default textStyle;
