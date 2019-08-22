import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorSnap from '@/components/SensorSnap.vue';
import deviceTree from '@/assets/device-tree.json';
import componentsList from '@/assets/components-list';

let sensor = deviceTree.children[6];

const propsData = sensor => {
  return {
    id: sensor.id.toString(),
    deviceId: sensor.deviceId.toString(),
    devEui: sensor.devEui,
    devAddr: sensor.devAddr,
    name: sensor.name,
    type: sensor.type,
    value: JSON.stringify(sensor.value),
    frameCounter: sensor.frameCounter,
    resources: JSON.stringify(sensor.resources),
    resource: sensor.resource,
    icons: sensor.icons.toString(),
    colors: JSON.stringify(sensor.colors),
    transportProtocol: sensor.transportProtocol,
    transportProtocolVersion: sensor.transportProtocolVersion,
    messageProtocol: sensor.messageProtocol,
    messageProtocolVersion: sensor.messageProtocolVersion,
    inPrefix: sensor.inPrefix,
    outPrefix: sensor.outPrefix,
    nativeType: sensor.nativeType,
    nativeResource: sensor.nativeResource,
    nativeSensorId: sensor.nativeSensorId,
    nativeNodeId: sensor.nativeNodeId,
    ownerId: sensor.ownerId.toString(),
  };
};

const factory = (values = {}) => {
  return shallowMount(SensorSnap, {
    propsData: {...values},
  });
};

describe('SensorSnap.vue', () => {
  it('should be mounted', () => {
    const wrapper = factory(propsData(sensor));
    const sensorSnap = wrapper.find(SensorSnap);
    expect(wrapper.isVueInstance()).equal(true);
    expect(sensorSnap.is(SensorSnap)).equal(true);
  });

  it('computes sensor when mounted', () => {
    const wrapper = factory(propsData(sensor));
    expect(wrapper.vm._computedWatchers.sensor.value.name).equal(sensor.name);
  });

  // try camera children component
  it('select camera component type when mounted', () => {
    const wrapper = factory(propsData(sensor));
    expect(wrapper.vm._computedWatchers.componentType.value).equal(`camera`);
  });

  it('build component name to import (SensorCamera) when mounted', () => {
    const wrapper = factory(propsData(sensor));
    const componentType = wrapper.vm._computedWatchers.componentType.value;
    const refName = componentsList[componentType].name;
    const componentName = refName
      ? refName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      : null;
    expect(wrapper.vm._computedWatchers.componentName.value).equal(
      componentName,
    );
  });

  it('renders SensorCamera.vue when mounted', () => {
    const wrapper = factory(propsData(sensor));
    expect(wrapper.vm.$children[0].$options._componentTag).equal(
      'sensor-camera',
    );
  });

  // try map children component

  it('select map component type when mounted', () => {
    sensor = deviceTree.children[11];
    const wrapper = factory(propsData(sensor));
    expect(wrapper.vm._computedWatchers.componentType.value).equal(`map`);
  });

  it('build component name to import (SensorMap) when mounted', () => {
    sensor = deviceTree.children[11];
    const wrapper = factory(propsData(sensor));
    const componentType = wrapper.vm._computedWatchers.componentType.value;
    const refName = componentsList[componentType].name;
    const componentName = refName
      ? refName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      : null;
    expect(wrapper.vm._computedWatchers.componentName.value).equal(
      componentName,
    );
  });

  it('renders SensorMap.vue when mounted', () => {
    sensor = deviceTree.children[11];
    const wrapper = factory(propsData(sensor));
    expect(wrapper.vm.$children[0].$options._componentTag).equal('sensor-map');
  });
});
