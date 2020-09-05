## Modules

<dl>
<dt><a href="#module_components/SensorAudio">components/SensorAudio</a></dt>
<dd><p>Resources : Clip : 5522, Trigger : 5523, Duration : 5524, Level : 5548, appType : 5750</p>
</dd>
<dt><a href="#module_components/SensorCamera">components/SensorCamera</a></dt>
<dd><p>Resources : Bitmap input : 5910, Bitmap input reset : 5911, appType : 5750</p>
</dd>
<dt><a href="#module_components/SensorSwitch">components/SensorSwitch</a></dt>
<dd><p>Resources : color unit : 5701, color : 5706 appType 5750</p>
</dd>
<dt><a href="#module_components/SensorGauge">components/SensorGauge</a></dt>
<dd><p>Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346</p>
</dd>
<dt><a href="#module_components/SensorLevel">components/SensorLevel</a></dt>
<dd><p>Resources : output state : 5850,  dimmer  : 5851, on time: 5852, UNIT : 5701 appType 5750</p>
</dd>
<dt><a href="#module_components/SensorMap">components/SensorMap</a></dt>
<dd><p>Child component called when Object Id : 3336</p>
</dd>
<dt><a href="#module_components/SensorSnap">components/SensorSnap</a></dt>
<dd><p>Parent component handling data flow and sub components selection</p>
</dd>
<dt><a href="#module_components/SensorSwitch">components/SensorSwitch</a></dt>
<dd><p>output state : 5550, output polarity : 5551 appType 5750</p>
</dd>
<dt><a href="#module_components/SensorText">components/SensorText</a></dt>
<dd><p>max X : 5545, max Y: 5546, level control: 5548, switch : 5850, appType 5750</p>
</dd>
<dt><a href="#module_components/SensorTime">components/SensorTime</a></dt>
<dd><p>Resources : 3333 : TIME 5506*, FRACTIONAL TIME 5507, appType 5750</p>
</dd>
<dt><a href="#module_components/SensorTimer">components/SensorTimer</a></dt>
<dd><p>Child component called when catching these ID: 3340</p>
</dd>
</dl>

<a name="module_components/SensorAudio"></a>

## components/SensorAudio
Resources : Clip : 5522, Trigger : 5523, Duration : 5524, Level : 5548, appType : 5750

<a name="module_components/SensorCamera"></a>

## components/SensorCamera
Resources : Bitmap input : 5910, Bitmap input reset : 5911, appType : 5750

<a name="module_components/SensorSwitch"></a>

## components/SensorSwitch
Resources : color unit : 5701, color : 5706 appType 5750

**Properties**: <code>string</code> name  
**Properties**: <code>object</code> data  
**Properties**: <code>object</code> computed  
**Properties**: <code>object</code> methods  
<a name="module_components/SensorGauge"></a>

## components/SensorGauge
Child component called when catching these IDs : 3300 until 3305 - 3315 - 3316 until 3330 - 3346

**Properties**: <code>string</code> name  
**Properties**: <code>object</code> data  
**Properties**: <code>object</code> computed  
**Properties**: <code>object</code> computed.colors  
**Properties**: <code>object</code> methods  
<a name="module_components/SensorLevel"></a>

## components/SensorLevel
Resources : output state : 5850,  dimmer  : 5851, on time: 5852, UNIT : 5701 appType 5750

**Properties**: <code>string</code> name  
**Properties**: <code>object</code> data  
**Properties**: <code>object</code> computed  
**Properties**: <code>object</code> methods  
<a name="module_components/SensorMap"></a>

## components/SensorMap
Child component called when Object Id : 3336

**Properties**: <code>string</code> name  
**Properties**: <code>object</code> data  
**Properties**: <code>object</code> computed  
**Properties**: <code>object</code> computed.colors  
**Properties**: <code>number</code> computed.latitude - OMA resource 5514  
**Properties**: <code>number</code> computed.longitude - OMA resource 5515  
**Properties**: <code>number</code> computed.timestamp - OMA resource 5518  
**Properties**: <code>object</code> methods  
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
output state : 5550, output polarity : 5551 appType 5750

<a name="module_components/SensorText"></a>

## components/SensorText
max X : 5545, max Y: 5546, level control: 5548, switch : 5850, appType 5750

**Properties**: <code>string</code> name  
**Properties**: <code>object</code> data  
**Properties**: <code>object</code> computed  
**Properties**: <code>object</code> methods  
<a name="module_components/SensorTime"></a>

## components/SensorTime
Resources : 3333 : TIME 5506*, FRACTIONAL TIME 5507, appType 5750

**Properties**: <code>string</code> name  
**Properties**: <code>object</code> data  
**Properties**: <code>object</code> computed  
**Properties**: <code>object</code> methods  
<a name="module_components/SensorTimer"></a>

## components/SensorTimer
Child component called when catching these ID: 3340

**Properties**: <code>string</code> name  
**Properties**: <code>object</code> data  
**Properties**: <code>object</code> data.isStarted - Indicate if cron is started  
**Properties**: <code>object</code> data.isPaused - Indicate if cron is paused  
**Properties**: <code>object</code> computed  
**Properties**: <code>object</code> computed.colors  
**Properties**: <code>number</code> computed.wholeTime- OMA resource 5521  
**Properties**: <code>number</code> computed.timeLeft- OMA resource 5538  
**Properties**: <code>boolean</code> computed.timerState - OMA resource 5850  
**Properties**: <code>boolean</code> computed.timerOutput - OMA resource 5543  
**Properties**: <code>number</code> computed.timerMode - OMA resource 5526  
**Properties**: <code>string</code> computed.timerEvent - OMA resource 5523  
**Properties**: <code>object</code> methods  
