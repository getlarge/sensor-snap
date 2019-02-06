const cameraStyle = conf => {
  return `svg.sensor-camera {
  --font-color: ${conf.fontColor};
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --danger: ${conf.dangerColor};
  text-align: center;
}
svg.sensor-camera > image.stream-viewer {
  cursor: pointer;
}
circle.stream-button {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}
svg.sensor-camera > circle.stream-button:hover {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 35}px;
}
svg.sensor-camera > circle.stream-button:active {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 25}px;
}
canvas.stream-container {
  display: none;
}`
}

export default cameraStyle
