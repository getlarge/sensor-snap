const audioStyle = conf => {
  return `svg.sensor-audio {
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
svg.sensor-audio > image.stream-viewer {
  cursor: pointer;
}
circle.stream-button {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}
svg.sensor-audio > circle.stream-button:hover {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 35}px;
}
svg.sensor-audio > circle.stream-button:active {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 25}px;
}
svg.sensor-audio > image.sensor-icon {
  cursor: pointer;
}`;
};

export default audioStyle;
