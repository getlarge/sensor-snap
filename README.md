# Aloes - sensor-snap

Vue library to generate Sensors Widget with Open Mobile Alliance references as inputs.

- [Demo](https://getlarge.eu/#aloes)
- [Docs](https://aloes.frama.io/sensor-snap/)

Application based on :

- [VueJS](https://vuejs.org/)
- [Vue-cli](https://cli.vuejs.org/)
- [Open Mobile Alliance](http://www.openmobilealliance.org/wp/OMNA/LwM2M/LwM2MRegistry.html)
- [Aloes-handlers](https://www.npmjs.com/package/aloes-handlers)

## Folder structure

- /. --> Main application configuration, dependencies list, and launch scripts

- /public --> contains icons, fonts ...

- /src --> contains source code
- /. --> VueJS main configuration and boot scripts
- /components --> sensor components, mounted based on OMA objectId
- /lib --> built files from external dependencies
- /styles --> css modules built at SensorSnap mounting

## Usage

### Directly in the browser

Drop the library in with a `<script>` tag alongside Vue:

```html
<div id="app">
	<!-- ... use components here ... -->
</div>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/sensor-snap"></script>
<script>
	new Vue({el: '#app'});
</script>
```

### In a module system

Install the library with NPM:

```bash
npm install sensor-snap
```

Then import and locally register a single component with:

```js
import SensorSnap from 'sensor-snap';

export default {
	components: {
		'sensor-snap': () => import('sensor-snap'),
	},
};
```

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```
npm run start:dev
```

### Compiles and minifies for production

```
npm run build
```

### Generate documentation

```
npm run docs:dev
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
