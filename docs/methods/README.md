## Modules

<dl>
<dt><a href="#module_methods/formatSensor">methods/formatSensor</a> ⇒ <code>object</code></dt>
<dd><p>Triggered when a sensor has been updated
Format Sensor instance with SensorSnap props</p>
</dd>
<dt><a href="#module_methods/normalizeNumber">methods/normalizeNumber</a> ⇒ <code>float</code></dt>
<dd><p>Validate new value input ( number )</p>
</dd>
<dt><a href="#module_methods/degreesToRadians">methods/degreesToRadians</a> ⇒ <code>float</code></dt>
<dd><p>Transform an angle value from degree to radians ( number )</p>
</dd>
<dt><a href="#module_methods/getDistanceFromCoordinates">methods/getDistanceFromCoordinates</a> ⇒ <code>float</code></dt>
<dd><p>Calculate the distance travelled between two ccordinates using Haversine formula</p>
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
<dt><a href="#module_methods/getComponentResource">methods/getComponentResource</a></dt>
<dd><p>Expose a timer module based on setTimeout</p>
</dd>
</dl>

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

<a name="module_methods/degreesToRadians"></a>

## methods/degreesToRadians ⇒ <code>float</code>
Transform an angle value from degree to radians ( number )

**Returns**: <code>float</code> - angle in radians  

| Param | Type | Description |
| --- | --- | --- |
| deg | <code>float</code> | Angle in degree |

<a name="module_methods/getDistanceFromCoordinates"></a>

## methods/getDistanceFromCoordinates ⇒ <code>float</code>
Calculate the distance travelled between two ccordinates using Haversine formula

**Returns**: <code>float</code> - distance in kilometers  

| Param | Type | Description |
| --- | --- | --- |
| lat1 | <code>float</code> | Latitude from first location set |
| lng1 | <code>float</code> | Longitude from first location set |
| lat2 | <code>float</code> | Latitude from second location set |
| lng2 | <code>float</code> | Longitude from second location set |

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

<a name="module_methods/getComponentResource"></a>

## methods/getComponentResource
Expose a timer module based on setTimeout


| Param | Type | Description |
| --- | --- | --- |
| cb | <code>function</code> | Callback to trigger at timeout |
| data | <code>object</code> | Data to share between caller and callee |
| interval | <code>number</code> | Timeout interval |

