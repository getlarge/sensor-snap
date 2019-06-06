/**
 * Oma Object References.
 * @external OmaObjects
 * @see {@link https://api.aloes.io/api/omaObjects}
 */

/**
 * Oma Resources References.
 * @external OmaResources
 * @see {@link https://api.aloes.io/api/omaResources}
 */

/**
 * References used to select which components to load
 * @namespace
 * @property {object}  audio - Load SensorAudio component
 * @property {string}  audio.name - Sensor name
 * @property {array}  audio.list - [OMA Object]{@link /components/#omaobjects} Id references
 * @property {array}  audio.resources - [OMA Resources]{@link /components/#omaresources} Id references
 * @property {object}  audio.colors - OMA Views colors references
 * @property {object}  camera - Load SensorCamera component
 * @property {string}  camera.name - Sensor name
 * @property {array}  camera.list - OMA Object Id references
 * @property {array}  camera.resources - OMA Resources Id references
 * @property {object}  camera.colors - OMA Views colors references
 * @property {object}  color - Load SensorColor component
 * @property {string}  color.name - Sensor name
 * @property {array}  color.list - OMA Object Id references
 * @property {array}  color.resources - OMA Resources Id references
 * @property {object}  color.colors - OMA Views colors references
 * @property {object}  gauge - Load SensorGauge component
 * @property {string}  gauge.name - Sensor name
 * @property {array}  gauge.list - OMA Object Id references
 * @property {array}  gauge.resources - OMA Resources Id references
 * @property {object}  gauge.colors - OMA Views colors references
 * @property {object}  level - Load SensorLevel component
 * @property {string}  level.name - Sensor name
 * @property {array}  level.list - OMA Object Id references
 * @property {array}  level.resources - OMA Resources Id references
 * @property {object}  level.colors - OMA Views colors references
 * @property {object}  switch - Load SensorSwitch component
 * @property {string}  switch.name - Sensor name
 * @property {array}  switch.list - OMA Object Id references
 * @property {array}  switch.resources - OMA Resources Id references
 * @property {object}  switch.colors - OMA Views colors references
 * @property {object}  text - Load SensorText component
 * @property {string}  text.name - Sensor name
 * @property {array}  text.list - OMA Object Id references
 * @property {array}  text.resources - OMA Resources Id references
 * @property {object}  text.colors - OMA Views colors references
 * @property {object}  time - Load SensorTime component
 * @property {string}  time.name - Sensor name
 * @property {array}  time.list - OMA Object Id references
 * @property {array}  time.resources - OMA Resources Id references
 * @property {object}  time.colors - OMA Views colors references
 */
const componentsList = {
  audio: {
    name: 'SensorAudio',
    list: [3339],
    resources: [5522, 5523, 5524, 548, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  camera: {
    name: 'SensorCamera',
    list: [3349],
    resources: [5910, 5911, 5912, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  color: {
    name: 'SensorColor',
    list: [3335],
    resources: [5706, 5701, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  energy: {
    name: 'SensorEnergy',
    list: [3331],
    resources: [5500, 5702, 5703, 5704],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  gauge: {
    name: 'SensorGauge',
    list: [
      3202,
      3203,
      3300,
      3301,
      3302,
      3303,
      3304,
      3305,
      3315,
      3316,
      3317,
      3318,
      3319,
      3320,
      3321,
      3322,
      3323,
      3324,
      3325,
      3326,
      3327,
      3328,
      3329,
      3330,
      3346,
    ],
    resources: [5601, 5602, 5603, 5604, 5700, 5701, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  joystick: {
    name: 'SensorJoystick',
    list: [3345],
    resources: [5500, 5501, 5750, 5702, 5703, 5704],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  level: {
    name: 'SensorLevel',
    list: [3306, 3311, 3312],
    resources: [5701, 5750, 5850, 5851, 5852],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  magnometer: {
    name: 'SensorMagnometer',
    list: [3313, 3314],
    resources: [5500, 5501, 5750, 5850],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  map: {
    name: 'SensorMap',
    list: [3336],
    resources: [5514, 5515, 5517, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  switch: {
    name: 'SensorSwitch',
    list: [3200, 3201, 3342],
    resources: [5514, 5515, 5517, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  text: {
    name: 'SensorText',
    list: [3341],
    resources: [5527, 5528, 5529, 5530, 5531, 5545, 5546, 5548, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  time: {
    name: 'SensorTime',
    list: [3333],
    resources: [5506, 5507, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#77d1bf',
      successColor: '#528fa2',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
  timer: {
    name: 'SensorTimer',
    list: [3340],
    resources: [5501, 5521, 5523, 5525, 5526, 5534, 5538, 5543, 5544, 5750],
    colors: {
      primaryColor: '#528fa2',
      secondaryColor: '#ededed',
      successColor: '#77d1bf',
      warningColor: '#ffc85f',
      dangerColor: '#f94b39',
    },
  },
};

module.exports = componentsList;
