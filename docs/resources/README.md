## Modules

<dl>
<dt><a href="#module_SensorStyles">SensorStyles</a></dt>
<dd><p>Build CSS file from configuration corresponding to detected sensor type</p>
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

<a name="module_SensorStyles"></a>

## SensorStyles
Build CSS file from configuration corresponding to detected sensor type

<a name="componentsList"></a>

## componentsList : <code>object</code>
References used to select which components to load

**Kind**: global namespace  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| audio | <code>object</code> | Load SensorAudio component |
| audio.name | <code>string</code> | Sensor name |
| audio.list | <code>array</code> | [OMA Object](/documentation/#omaobjects) Id references |
| audio.resources | <code>array</code> | [OMA Resources](/documentation/#omaresources) Id references |
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
**See**: [https://supervisor.aloes.io/api/omaObjects](https://supervisor.aloes.io/api/omaObjects)  
<a name="external_OmaResources"></a>

## OmaResources
Oma Resources References.

**Kind**: global external  
**See**: [https://supervisor.aloes.io/api/omaResources](https://supervisor.aloes.io/api/omaResources)  
