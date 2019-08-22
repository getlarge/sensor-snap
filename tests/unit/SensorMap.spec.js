import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorMap from '@/components/SensorMap.vue';
import deviceTree from '@/assets/device-tree.json';

const componentName = 'SensorMap';
const sensor = deviceTree.children[11];

const factory = (values = {}) => {
  return shallowMount(SensorMap, {
    propsData: {...values},
  });
};

describe(`${componentName}.vue`, () => {
  it(`renders ${componentName}.vue when mounted`, () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.name()).equal(componentName);
  });

  it('renders updatedSensor when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm.$data.updatedSensor.name).equal(sensor.name);
  });

  it('emit {sensor} to update when update-sensor is emitted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.vm.$emit('update-sensor', sensor, 5911, 1);
    const args = wrapper.emitted()['update-sensor'][0];
    expect(args[0].name).equal(sensor.name);
    expect(args[1]).equal(5911);
    expect(args[2]).equal(1);
  });

  it('emit {sensor} to delete when delete-sensor is emitted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.vm.$emit('delete-sensor', sensor);
    const args = wrapper.emitted()['delete-sensor'][0];
    expect(args[0].name).equal(sensor.name);
  });

  it('computes sensor latitude when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.latitude.value).equal(
      sensor.resources['5514'],
    );
  });

  it('computes sensor longitude when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.longitude.value).equal(
      sensor.resources['5515'],
    );
  });

  it('computes sensor timestamp when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.timestamp.value).equal(
      sensor.resources['5518'],
    );
  });
});
