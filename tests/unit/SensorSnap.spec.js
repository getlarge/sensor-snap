import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorSnap from '@/components/SensorSnap.vue';
import deviceTree from '@/assets/device-tree.json';

const factory = (values = {}) => {
  return shallowMount(SensorSnap, {
    propsData: {...values},
  });
};

describe('SensorSnap.vue', () => {
  const sensor = deviceTree.children[6];
  const propsData = {
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
  };

  it('should be mounted', () => {
    const wrapper = factory(propsData);
    const sensorSnap = wrapper.find(SensorSnap);
    expect(wrapper.isVueInstance()).equal(true);
    expect(sensorSnap.is(SensorSnap)).equal(true);
  });

  it('computes sensor when mounted', () => {
    const wrapper = factory(propsData);
    expect(wrapper.vm._computedWatchers.sensor.value.name).equal(sensor.name);
  });

  it('renders SensorCamera.vue when mounted', () => {
    const wrapper = factory(propsData);
    expect(wrapper.vm.$children[0].$options._componentTag).equal(
      'sensor-camera',
    );
  });
});
