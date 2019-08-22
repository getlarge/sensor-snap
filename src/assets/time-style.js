const timeStyle = conf => {
  return `svg.sensor-time {
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
image.show-clock {
  cursor: pointer;
}
g.clock > circle {
  cursor: pointer;
}
g.calendar-days > text {
  font-size: ${conf.height / 20}px;
  font-family: "arial";
  fill: #5f5f5f;
  cursor: pointer;
}
g.calendar-weeks > text {
  fill: var(--primary-color); 
  font-size: ${conf.height / 18}px;
  font-weight: bold
}
text.calendar-month {
  fill: var(--font-color); 
  font-size: ${conf.height / 15}px;
}
text.calendar-year {
  fill: var(--font-color); 
  font-family: "arial";
  font-size: ${conf.height / 15}px;
}`;
};

export default timeStyle;
