
# Aloes -sensor-snap.sensor-camera

> Vue library to generate Sensors Widget with Open Mobile Alliance references as inputs.

[Demo](https://getlarge.eu/#aloes)

Application based on :

-   [VueJS](https://vuejs.org/)
-   [Vue-cli](https://cli.vuejs.org/)
-   [Open Mobile Alliance](http://www.openmobilealliance.org/wp/OMNA/LwM2M/LwM2MRegistry.html)

## Installation

### Directly in the browser

Drop the library in with a `<script>` tag alongside Vue:

```html
<div id="app">
<!-- ... use components here ... -->
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/sensor-snap.sensor-camera"></script>
<script>
new Vue({ el: '#app' })
</script>
```

Or, if you only want to use a small subset of components, drop them in individually:

```html
<div id="app">
<!-- ... use component here ... -->
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/sensor-snap.sensor-camera/SensorSnap"></script>
<script>
new Vue({ el: '#app' })
</script>
```

### In a module system

Install the library with NPM:

```bash
npm install sensor-snap.sensor-camera
```

Then either import the library and either globally register all components with:

```js
import SensorCamera from 'sensor-snap.sensor-camera'

Vue.use(SensorCamera)
```

or import and locally register a single component with:

```js
import { SensorSnap } from 'sensor-snap.sensor-camera'

export default {
components: { SensorCamera }
}
```

#### Individually packaged components

If you only want to use a small subset of components, import only individually packaged components to reduce the size of your application:

```js
import SensorSnap from 'sensor-snap/SensorSnap'
import SensorLevel from 'sensor-snap/SensorLevel'
```