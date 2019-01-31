const cameraStyle = conf => {
  return `div.sensor-camera {
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --alert-color: ${conf.alertColor};
  --danger-color: ${conf.dangerColor};
  text-align: center;
}
div.sensor-camera > svg > image.stream-viewer {
  cursor: pointer;
}
circle.stream-button {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}
div.sensor-camera > svg > circle.stream-button:hover {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 35}px;
}
div.sensor-camera > svg > circle.stream-button:active {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
  stroke-width: ${conf.width / 25}px;
}
canvas.stream-container {
  display: none;
}`;
};

export default cameraStyle;
