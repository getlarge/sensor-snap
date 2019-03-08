const levelStyle = conf => {
  return `svg.sensor-level {
  --font-color: ${conf.fontColor};
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --danger: ${conf.dangerColor};
  --border-radius: 5px;
  --border: 1px solid transparent;
  --box-shadow: 0 ${conf.width / 50}px ${conf.width / 35}px 0px #6e6e6e;
  --box-shadow-selected: 0 ${conf.width / 75}px ${conf.width /
    100}px 0px #6e6e6e;
  cursor: pointer;
  overflow: hidden;
}
svg.sensor-level > g > path.range-slider-path {
  fill: var(--primary-color);
}
svg.sensor-level > g > path.range-marks-path {
  fill: none;
  stroke: inherit;
  stroke-width: 1px;
}
.range-marks-colored {
  stroke: var(--primary-color);
}
.range-marks-white {
  stroke: white;
}
svg.sensor-level > g.range-values > text.range-value {
  box-sizing: border-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: ${conf.height / 12}px ${conf.width / 11}px;
}
svg.sensor-level > g.range-values > text.range-value--top {
  position: absolute;
  bottom: 100%;
  fill: var(--primary-color);
}
svg.sensor-level > g.range-values > text.range-value--bottom {
  fill: var(--font-color); 
}
.range__value__number {
  font-size: ${conf.height / 15}px;
  margin: 0 ${conf.height / 48}px;
}
.range-value-number--top {
  -webkit-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}
.range-value-number--bottom {
  -webkit-transform-origin: 100% 0;
  -ms-transform-origin: 100% 0;
  transform-origin: 100% 0;
}
.range-value-text {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: ${conf.height / 12}px;
  text-transform: uppercase;
}
.range-value-text span:first-child {
  margin-bottom: 3px;
}
.range-value-text--top {
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
  margin-bottom: ${conf.height / 36}px;
}
.range-value-text--bottom {
  margin-bottom: ${conf.height / 48}px;
}`;
};

export default levelStyle;
