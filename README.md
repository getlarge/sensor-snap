# Aloes - sensor-snap

Vue library to generate Sensors Widget with Open Mobile Alliance references as inputs.

Cient application based on :

-   [VueJS](https://vuejs.org/)
-   [Vue-cli](https://cli.vuejs.org/)
-   [Open Mobile Alliance](http://www.openmobilealliance.org/wp/OMNA/LwM2M/LwM2MRegistry.html)
-   [Aloes-handlers](https://www.npmjs.com/package/aloes-handlers)

## Folder structure

-   /. --> Main application configuration, dependencies list, and launch scripts

-   /deploy --> contains environment variables ( hidden files )

-   /public --> contains icons, fonts ...

-   /src --> contains source code - /. --> VueJS main configuration and boot scripts - /components --> sensor components, mounted based on OMA objectId - /lib --> built files from external dependencies - /styles --> css modules built at SensorSnap mounting

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
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
