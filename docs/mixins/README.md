<a name="module_mixins/SensorEvents"></a>

## mixins/SensorEvents
Mixin used in every component

**Emits**: <code>event:update-sensor</code>, <code>event:update-setting</code>, <code>event:delete-sensor</code>, <code>event:flip-side</code>  
**Params**: <code>number</code> [width] - Component width  
**Params**: <code>number</code> [height] - Component height  
**Params**: <code>string</code> sensor - JSON stringified sensor instance  
**Properties**: <code>object</code> data  
**Properties**: <code>object</code> data.updatedSensor  
**Properties**: <code>number</code> data.updatedHeight  
**Properties**: <code>number</code> data.updatedWidth  
**Properties**: <code>boolean</code> data.aSide - Indicate widget side  
**Properties**: <code>boolean</code> data.elementsMounted - Indicate if DOM elements are mounted  
**Properties**: <code>object</code> computed  
**Properties**: <code>string</code> computed.viewBox - return SVG viewBox  
