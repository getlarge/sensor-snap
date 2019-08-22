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
svg.sensor-map > image.map-viewer {
  cursor: pointer;
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
}
.map-marker {
    /* adjusting for the marker dimensions
    so that it is centered on coordinates */
    margin-left: -${conf.width / 80}px;
    margin-top: -${conf.width / 80}px;
    box-sizing: border-box;
}
.map-marker.map-clickable {
    cursor: pointer;
}
.pulse {
    width: ${conf.width / 40}px;
    height: ${conf.width / 40}px;
    border: ${conf.width / 80}px solid var(--primary-color);
    -webkit-border-radius: ${conf.width / 13}px;
    -moz-border-radius: ${conf.width / 13}px;
    border-radius: ${conf.width / 13}px;
    background-color: #716f42;
    z-index: 10;
    position: absolute;
    box-sizing: border-box;
}
.map-marker .dot {
    border: ${conf.width / 40}px solid var(--secondary-color);
    background: transparent;
    -webkit-border-radius: ${conf.width / 7}px;
    -moz-border-radius: ${conf.width / 7}px;
    border-radius: ${conf.width / 7}px;
    height: ${conf.width / 8}px;
    width: ${conf.width / 8}px;
    -webkit-animation: pulse 2s ease-out;
    -moz-animation: pulse 2s ease-out;
    animation: pulse 2s ease-out;
    -webkit-animation-iteration-count: 5;
    -moz-animation-iteration-count: 5;
    animation-iteration-count: 5;
    position: absolute;
    top: -${conf.width / 20}px;
    left: -${conf.width / 20}px;
    z-index: 1;
    opacity: 0;
    box-sizing: border-box;
}
@-moz-keyframes pulse {
   0% {
      -moz-transform: scale(0);
      opacity: 0.0;
   }
   25% {
      -moz-transform: scale(0);
      opacity: 0.1;
   }
   50% {
      -moz-transform: scale(0.1);
      opacity: 0.3;
   }
   75% {
      -moz-transform: scale(0.5);
      opacity: 0.5;
   }
   100% {
      -moz-transform: scale(1);
      opacity: 0.0;
   }
  }
  @-webkit-keyframes "pulse" {
   0% {
      -webkit-transform: scale(0);
      opacity: 0.0;
   }
   25% {
      -webkit-transform: scale(0);
      opacity: 0.1;
   }
   50% {
      -webkit-transform: scale(0.1);
      opacity: 0.3;
   }
   75% {
      -webkit-transform: scale(0.5);
      opacity: 0.5;
   }
   100% {
      -webkit-transform: scale(1);
      opacity: 0.0;
   }
}`;
};

export default mapStyle;
