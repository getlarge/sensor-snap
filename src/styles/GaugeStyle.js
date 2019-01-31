const gaugeStyle = conf => {
  return `svg.sensor-gauge {
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --alert-color: ${conf.alertColor};
  --danger-color: ${conf.dangerColor};
  --box-shadow: 0 1px 2px 0px #6e6e6e;
  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;
  text-align: center;
  font-family: ${conf.fontFamily};
}
svg.sensor-gauge > .dial {
  stroke: #eee;
  stroke-width: ${conf.width / 40}px;
  fill: rgba(0,0,0,0);
}
svg.sensor-gauge > .value {
  stroke: rgb(47, 227, 255);
  stroke-width: ${conf.width / 30}px;
  fill: rgba(0,0,0,0);
}
svg.sensor-gauge > .value-text {
  text-anchor: middle;
  alignment-baseline: middle;
  dominant-baseline: central;
  fill: var(--primary-color);
  font-family: ${conf.fontFamily2};
  font-size: ${conf.height / 20}px;
}
svg.sensor-gauge > g > text.sensor-resources {
  font-size: ${conf.height / 30}px;
  font-weight: 400;
  text-anchor: middle;
  alignment-baseline: middle:
  dominant-baseline: central;
}
image.meter_needle {
  transform-origin: bottom center;
  transform: rotate(270deg);
}`;
};

export default gaugeStyle;
