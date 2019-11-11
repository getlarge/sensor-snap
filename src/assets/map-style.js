const mapStyle = conf => {
  return `svg.sensor-map {
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
text.sensor-title {
  fill: var(--primary-color);
  fill-opacity: 1;
  cursor: pointer;
  font-size: ${conf.height / 16}px;
  font-weight: 700;
}
circle.delete-button {
  fill: var(--danger);
  fill-opacity: 1;
  stroke: var(--warning);
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}`;
};

export default mapStyle;
