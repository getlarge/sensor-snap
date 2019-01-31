const timeStyle = conf => {
  return `svg.sensor-time {
  --primary-color: ${conf.primaryColor};
  --secondary-color: ${conf.secondaryColor};
  --success: ${conf.successColor};
  --warning: ${conf.warningColor};
  --alert-color: ${conf.alertColor};
  --danger-color: ${conf.dangerColor};
  --border: 1px solid transparent;
  --box-shadow: 0 1px 2px 0px #6e6e6e;
  --box-shadow-selected: 0 0px 1px 0px #6e6e6e;
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
  fill: #f2f2f2; 
  font-size: ${conf.height / 15}px;
}
text.calendar-year {
  fill: #f2f2f2; 
  font-family: "arial";
  font-size: ${conf.height / 15}px;
}`;
};

export default timeStyle;
