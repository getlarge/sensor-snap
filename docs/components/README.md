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
<dt><a href="#module_components/SensorGauge">components/SensorGauge</a></dt>
<dd><p>Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346</p>
<p>Resources : input state : 5600, minMeasuredValue 5601, maxMeasuredValue 5602,</p>
<p>output state : 5650, maxRange : 5604, minRange : 5603, appType 5750, sensorType 5751</p>
</dd>
<dt><a href="#module_components/SensorLevel">components/SensorLevel</a></dt>
<dd><p>Child component called when catching these IDs : 3306, 3311, 3312</p>
<p>Resources : output state : 5850,  dimmer  : 5851, on time: 5852, UNIT : 5701 appType 5750</p>
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
<dt><a href="#module_components/SensorAudio">components/SensorAudio</a></dt>
<dd><p>Child component called when Object Id : 3339</p>
<p>Resources : Clip : 5522, Trigger : 5523, Duration : 5524
Level : 5548, appType : 5750</p>
</dd>
<dt><a href="#module_components/SensorCamera">components/SensorCamera</a></dt>
<dd><p>Child component called when Object Id : 3349</p>
<p>Resources : Bitmap input : 5910, Bitmap input reset : 5911, appType : 5750</p>
</dd>
<dt><a href="#module_components/SensorGauge">components/SensorGauge</a></dt>
<dd><p>Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346</p>
<p>Resources : input state : 5600, minMeasuredValue 5601, maxMeasuredValue 5602,</p>
<p>output state : 5650, maxRange : 5604, minRange : 5603, appType 5750, sensorType 5751</p>
</dd>
<dt><a href="#module_components/SensorLevel">components/SensorLevel</a></dt>
<dd><p>Child component called when catching these IDs : 3306, 3311, 3312</p>
<p>Resources : output state : 5850,  dimmer  : 5851, on time: 5852, UNIT : 5701 appType 5750</p>
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
<dt><a href="#module_methods/formatSensor">methods/formatSensor</a> ⇒ <code>object</code></dt>
<dd><p>Triggered when a sensor has been updated
Format Sensor instance with SensorSnap props</p>
</dd>
<dt><a href="#module_methods/normalizeNumber">methods/normalizeNumber</a> ⇒ <code>float</code></dt>
<dd><p>Validate new value input ( number )</p>
</dd>
<dt><a href="#module_methods/getValueInPercentage">methods/getValueInPercentage</a> ⇒ <code>float</code></dt>
<dd><p>Convert input value in percentage</p>
</dd>
<dt><a href="#module_methods/formatSensor">methods/formatSensor</a> ⇒ <code>string</code></dt>
<dd><p>Triggered when a new sensor type has been initialized</p>
</dd>
<dt><a href="#module_methods/checkComponentType">methods/checkComponentType</a> ⇒ <code>array</code></dt>
<dd><p>Validate that the right Vue component is getting loaded</p>
</dd>
<dt><a href="#module_methods/getComponentResource">methods/getComponentResource</a> ⇒ <code>any</code></dt>
<dd><p>Load specific Vue component resource</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#componentsList">componentsList</a> : <code>object</code></dt>
<dd><p>References used to select which components to load</p>
</dd>
</dl>

## External

<dl>
<dt><a href="#external_OmaObjects">OmaObjects</a></dt>
<dd><p>Oma Object References.</p>
</dd>
<dt><a href="#external_OmaResources">OmaResources</a></dt>
<dd><p>Oma Resources References.</p>
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

<a name="module_components/SensorGauge"></a>

## components/SensorGauge
Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346

Resources : input state : 5600, minMeasuredValue 5601, maxMeasuredValue 5602,

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

<a name="module_components/SensorSnap"></a>

## components/SensorSnap
Parent component handling data flow and sub components selection


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| id | <code>string</code> | Required, sensorId |
| deviceId | <code>string</code> | Parent device id |
| name | <code>string</code> |  |
| type | <code>string</code> | OMA ObjectId |
| resources | <code>string</code> | OMA Resources corresponding to sensor.type (JSON Object) |
| resource | <code>string</code> | OMA ResourceId |
| value | <code>string</code> | last savec sensor value |
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

<a name="module_components/SensorGauge"></a>

## components/SensorGauge
Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346

Resources : input state : 5600, minMeasuredValue 5601, maxMeasuredValue 5602,

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

<a name="module_components/SensorSnap"></a>

## components/SensorSnap
Parent component handling data flow and sub components selection


| Param | Type | Description |
| --- | --- | --- |
| [width] | <code>number</code> | Component width |
| [height] | <code>number</code> | Component height |
| id | <code>string</code> | Required, sensorId |
| deviceId | <code>string</code> | Parent device id |
| name | <code>string</code> |  |
| type | <code>string</code> | OMA ObjectId |
| resources | <code>string</code> | OMA Resources corresponding to sensor.type (JSON Object) |
| resource | <code>string</code> | OMA ResourceId |
| value | <code>string</code> | last savec sensor value |
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

<a name="module_methods/formatSensor"></a>

## methods/formatSensor ⇒ <code>object</code>
Triggered when a sensor has been updated
Format Sensor instance with SensorSnap props

**Returns**: <code>object</code> - sensor - Aloes Sensor instance  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | props |

<a name="module_methods/normalizeNumber"></a>

## methods/normalizeNumber ⇒ <code>float</code>
Validate new value input ( number )

**Returns**: <code>float</code> - val - Normalized value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | New sensor value |
| min | <code>int</code> | Min Range value |
| limit | <code>init</code> | Max Range value |

<a name="module_methods/getValueInPercentage"></a>

## methods/getValueInPercentage ⇒ <code>float</code>
Convert input value in percentage

**Returns**: <code>float</code> - val - Normalized value  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>float</code> | New sensor value |
| min | <code>int</code> | Min Range value |
| max | <code>init</code> | Max Range value |

<a name="module_methods/formatSensor"></a>

## methods/formatSensor ⇒ <code>string</code>
Triggered when a new sensor type has been initialized

**Returns**: <code>string</code> - styles - Configured CSS  

| Param | Type | Description |
| --- | --- | --- |
| sensor | <code>object</code> | sensor instance |
| stylesConf | <code>object</code> | Overriding default style config |
| componentName | <code>string</code> | Vue component nanme associated with this sensor type |

<a name="module_methods/checkComponentType"></a>

## methods/checkComponentType ⇒ <code>array</code>
Validate that the right Vue component is getting loaded

**Returns**: <code>array</code> - objectIds - OMA Object ID supported by this component  

| Param | Type | Description |
| --- | --- | --- |
| componentType | <code>string</code> | Vue component name associated with this sensor type |
| sensorType | <code>int</code> | Vue component nanme associated with this sensor type |

<a name="module_methods/getComponentResource"></a>

## methods/getComponentResource ⇒ <code>any</code>
Load specific Vue component resource

**Returns**: <code>any</code> - result - property contained in ComponentType config  

| Param | Type | Description |
| --- | --- | --- |
| componentType | <code>string</code> | Vue component name associated with this sensor type |
| componentResource | <code>string</code> | Vue component resource |

<a name="componentsList"></a>

## componentsList : <code>object</code>
References used to select which components to load

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| audio | <code>object</code> | Load SensorAudio component |
| audio.name | <code>string</code> | Sensor name |
| audio.list | <code>array</code> | [OMA Object](/components/#omaobjects) Id references |
| audio.resources | <code>array</code> | [OMA Resources](/components/#omaresources) Id references |
| audio.colors | <code>object</code> | OMA Views colors references |
| camera | <code>object</code> | Load SensorCamera component |
| camera.name | <code>string</code> | Sensor name |
| camera.list | <code>array</code> | OMA Object Id references |
| camera.resources | <code>array</code> | OMA Resources Id references |
| camera.colors | <code>object</code> | OMA Views colors references |
| color | <code>object</code> | Load SensorColor component |
| color.name | <code>string</code> | Sensor name |
| color.list | <code>array</code> | OMA Object Id references |
| color.resources | <code>array</code> | OMA Resources Id references |
| color.colors | <code>object</code> | OMA Views colors references |
| gauge | <code>object</code> | Load SensorGauge component |
| gauge.name | <code>string</code> | Sensor name |
| gauge.list | <code>array</code> | OMA Object Id references |
| gauge.resources | <code>array</code> | OMA Resources Id references |
| gauge.colors | <code>object</code> | OMA Views colors references |
| level | <code>object</code> | Load SensorLevel component |
| level.name | <code>string</code> | Sensor name |
| level.list | <code>array</code> | OMA Object Id references |
| level.resources | <code>array</code> | OMA Resources Id references |
| level.colors | <code>object</code> | OMA Views colors references |
| switch | <code>object</code> | Load SensorSwitch component |
| switch.name | <code>string</code> | Sensor name |
| switch.list | <code>array</code> | OMA Object Id references |
| switch.resources | <code>array</code> | OMA Resources Id references |
| switch.colors | <code>object</code> | OMA Views colors references |
| text | <code>object</code> | Load SensorText component |
| text.name | <code>string</code> | Sensor name |
| text.list | <code>array</code> | OMA Object Id references |
| text.resources | <code>array</code> | OMA Resources Id references |
| text.colors | <code>object</code> | OMA Views colors references |
| time | <code>object</code> | Load SensorTime component |
| time.name | <code>string</code> | Sensor name |
| time.list | <code>array</code> | OMA Object Id references |
| time.resources | <code>array</code> | OMA Resources Id references |
| time.colors | <code>object</code> | OMA Views colors references |

<a name="external_OmaObjects"></a>

## OmaObjects
Oma Object References.

**Kind**: global external  
**See**: [https://api.aloes.io/api/omaObjects](https://api.aloes.io/api/omaObjects)  
<a name="external_OmaResources"></a>

## OmaResources
Oma Resources References.

**Kind**: global external  
**See**: [https://api.aloes.io/api/omaResources](https://api.aloes.io/api/omaResources)  
