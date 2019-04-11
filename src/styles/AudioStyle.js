const audioStyle = conf => {
  return `svg.sensor-audio {
  --font-color: ${conf.fontColor};
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --danger: ${conf.dangerColor};
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
}`;
};

export default audioStyle;
