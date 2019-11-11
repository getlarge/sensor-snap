## Modules

<dl>
<dt><a href="#module_components/SensorAudio">components/SensorAudio</a></dt>
<dd><p>Child component called when Object Id : 3339</p>
<p>Resources : Clip : 5522, Trigger : 5523, Duration : 5524
Level : 5548, appType : 5750</p>
</dd>
<dt><a href="#module_components/SensorCamera">components/SensorCamera</a></dt>
<dd><p>Child component called when Object Id : 3349</p>
<p>Resources : Bitmap input : 5910, Bitmap input reset : 5911, appType : 5750</p>
</dd>
<dt><a href="#module_components/SensorSwitch">components/SensorSwitch</a></dt>
<dd><p>Child component called when catching this ID : 3335</p>
<p>Resources : color unit : 5701, color : 5706 appType 5750</p>
</dd>
<dt><a href="#module_components/SensorGauge">components/SensorGauge</a></dt>
<dd><p>Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346</p>
<p>Resources : input state : 5600, minMeasuredValue 5601, maxMeasuredValue 5602</p>
<p>output state : 5650, maxRange : 5604, minRange : 5603, appType 5750, sensorType 5751</p>
</dd>
<dt><a href="#module_components/SensorLevel">components/SensorLevel</a></dt>
<dd><p>Child component called when catching these IDs : 3306, 3311, 3312</p>
<p>Resources : output state : 5850,  dimmer  : 5851, on time: 5852, UNIT : 5701 appType 5750</p>
</dd>
<dt><a href="#module_components/SensorMap">components/SensorMap</a></dt>
<dd><p>Child component called when Object Id : 3336</p>
<p>Resources : Latitude : 5514, Longitude : 5515, Uncertainity : 5516</p>
<p>Velocity 5517, Timestamp : 5518, Compass direction : 5705, appType : 5750</p>
</dd>
<dt><a href="#module_components/SensorSnap">components/SensorSnap</a></dt>
<dd><p>Parent component handling data flow and sub components selection</p>
</dd>
<dt><a href="#module_components/SensorSwitch">components/SensorSwitch</a></dt>
<dd><p>Child component called when catching these IDs : 3200, 3201, 3342</p>
<p>Resources : input state : 5500, counter : 5501, onTime: 5852, offtime : 5854</p>
<p>output state : 5550, output polarity : 5551 appType 5750</p>
</dd>
<dt><a href="#module_components/SensorText">components/SensorText</a></dt>
<dd><p>Child component called when Object Id : 3341</p>
<p>Resources : text : 5527, X coord : 5528, Y coord : 5529, clear Display : 5530, contrast : 5531</p>
<p>max X : 5545, max Y: 5546, level control: 5548, switch : 5850, appType 5750</p>
</dd>
<dt><a href="#module_components/SensorTime">components/SensorTime</a></dt>
<dd><p>Child component called when catching these ID :3333</p>
<p>Resources : 3333 : TIME 5506*, FRACTIONAL TIME 5507, appType 5750</p>
</dd>
<dt><a href="#module_components/SensorTimer">components/SensorTimer</a></dt>
<dd><p>Child component called when catching these ID: 3340</p>
<p>Resources : whole_time : 5521, remain_time: 5538, appType: 5750</p>
</dd>
</dl>

<a name="module_components/SensorAudio"></a>

## components/SensorAudio
Child component called when Object Id : 3339

Resources : Clip : 5522, Trigger : 5523, Duration : 5524
Level : 5548, appType : 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorCamera"></a>

## components/SensorCamera
Child component called when Object Id : 3349

Resources : Bitmap input : 5910, Bitmap input reset : 5911, appType : 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorSwitch"></a>

## components/SensorSwitch
Child component called when catching this ID : 3335

Resources : color unit : 5701, color : 5706 appType 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorGauge"></a>

## components/SensorGauge
Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346

Resources : input state : 5600, minMeasuredValue 5601, maxMeasuredValue 5602

output state : 5650, maxRange : 5604, minRange : 5603, appType 5750, sensorType 5751


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorLevel"></a>

## components/SensorLevel
Child component called when catching these IDs : 3306, 3311, 3312

Resources : output state : 5850,  dimmer  : 5851, on time: 5852, UNIT : 5701 appType 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorMap"></a>

## components/SensorMap
Child component called when Object Id : 3336

Resources : Latitude : 5514, Longitude : 5515, Uncertainity : 5516

Velocity 5517, Timestamp : 5518, Compass direction : 5705, appType : 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorSnap"></a>

## components/SensorSnap
Parent component handling data flow and sub components selection


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| id | <code>string</code> | Required, sensorId |
| deviceId | <code>string</code> | Parent device id |
| ownerId | <code>string</code> | Account owner |
| name | <code>string</code> |  |
| type | <code>string</code> | OMA ObjectId |
| resources | <code>string</code> | OMA Resources corresponding to sensor.type (JSON Object) |
| resource | <code>string</code> | OMA ResourceId |
| value | <code>string</code> | last saved sensor value |
| icons | <code>Array.&lt;string&gt;</code> | OMA viewResources icons |
| colors | <code>string</code> | OMA viewResources colors - (JSON Object) |
| [frameCounter] | <code>string</code> | sensor message counter |
| devEui | <code>string</code> | device unique hardware id |
| nativeSensorId | <code>string</code> | sensor id from device tree |
| [nativeNodeId] | <code>string</code> | node id from device tree |
| transportProtocol | <code>string</code> |  |
| transportProtocolVersion | <code>string</code> |  |
| messageProtocol | <code>string</code> |  |
| messageProtocolVersion | <code>string</code> |  |
| [inputPath] | <code>string</code> | MQTT route pattern |
| [outputPath] | <code>string</code> | MQTT route pattern |
| [inPrefix] | <code>string</code> |  |
| [outPrefix] | <code>string</code> |  |

<a name="module_components/SensorSwitch"></a>

## components/SensorSwitch
Child component called when catching these IDs : 3200, 3201, 3342

Resources : input state : 5500, counter : 5501, onTime: 5852, offtime : 5854

output state : 5550, output polarity : 5551 appType 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorText"></a>

## components/SensorText
Child component called when Object Id : 3341

Resources : text : 5527, X coord : 5528, Y coord : 5529, clear Display : 5530, contrast : 5531

max X : 5545, max Y: 5546, level control: 5548, switch : 5850, appType 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorTime"></a>

## components/SensorTime
Child component called when catching these ID :3333

Resources : 3333 : TIME 5506*, FRACTIONAL TIME 5507, appType 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

<a name="module_components/SensorTimer"></a>

## components/SensorTimer
Child component called when catching these ID: 3340

Resources : whole_time : 5521, remain_time: 5538, appType: 5750


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| sensor | <code>Array.&lt;string&gt;</code> | Json stringified sensor instance |

