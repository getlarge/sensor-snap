const timerStyle = conf => {
  return `svg.sensor-timer {
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
svg.sensor-timer > circle.switch-button {
  stroke-width: ${conf.width / 50}px;
  cursor: pointer;
}
svg.sensor-timer > circle.switch-button:hover {
  stroke-width: ${conf.width / 35}px;
}
svg.sensor-timer > circle.switch-button:active {
  stroke-width: ${conf.width / 25}px;
}
svg.sensor-timer > circle.switched-on {
  fill: var(--primary-color);
  stroke: var(--secondary-color);
}
svg.sensor-timer > circle.switched-off {
  fill: var(--secondary-color);
  stroke: var(--primary-color);
}
svg.sensor-timer > g.setters > g > text[data-setter] {
  background: transparent;
  text-shadow: ${conf.width / 250}px ${conf.width / 250}px ${conf.width /
    300}px #6e6e6e;
  font-weight: 300;
  font-size: ${conf.width / 10}px;
  fill: var(--primary-color);
  cursor: pointer;
}
svg.sensor-timer > g.setters > g > text[data-setter]:hover {
   text-shadow: ${conf.width / 300}px ${conf.width / 300}px ${conf.width /
    400}px #6e6e6e;
    opacity: 0.5; 
}
svg.sensor-timer > g.controls > text.display-remain-time {
  font-weight: 100;
  font-size: ${conf.width / 5}px;
  fill: var(--primary-color);
}
svg.sensor-timer > g.controls > g > text#pause {
  cursor: pointer;
  text-shadow: ${conf.width / 150}px ${conf.width / 150}px ${conf.width /
    200}px #6e6e6e;
  fill: var(--primary-color);
  font-size: ${conf.width / 10}px;
}
svg.sensor-timer > g.controls > g > text#pause:hover { 
   text-shadow: ${conf.width / 250}px ${conf.width / 250}px ${conf.width /
    400}px #6e6e6e;
  opacity: 0.8; 
}
svg.sensor-timer > g.controls > g > text#break {
  text-shadow: ${conf.width / 150}px ${conf.width / 150}px ${conf.width /
    200}px #6e6e6e;
  cursor: pointer;
  fill: var(--primary-color);
  font-size: ${conf.width / 10}px;
}
svg.sensor-timer > g.controls > g > text#break:hover { 
  opacity: 0.8; 
  text-shadow: ${conf.width / 250}px ${conf.width / 250}px ${conf.width /
    400}px #6e6e6e;
}

svg.sensor-timer > g.cron-group > circle.cron-base {
  fill: none;
  stroke: #B6B6B6;
  stroke-width: ${conf.width / 70}px;
}
svg.sensor-timer > g.cron-group > g > circle.cron-progress {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: ${conf.width / 70}px;
  transition: stroke-dashoffset 0.7s;
}
svg.sensor-timer > g.cron-group > g > g#cron-pointer { transition: transform 0.7s; }
svg.sensor-timer > g.cron-group > g > g#cron-pointer > circle.cron-dot {
  fill: #FFF;
  stroke: var(--primary-color);
  stroke-width: ${conf.width / 150}px;
}`;
};

export default timerStyle;
