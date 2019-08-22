import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorCamera from '@/components/SensorCamera.vue';
import deviceTree from '@/assets/device-tree.json';

const componentName = 'SensorCamera';
const sensor = deviceTree.children[6];

const factory = (values = {}) => {
  return shallowMount(SensorCamera, {
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

  it('computes viewBox when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    const updatedWidth = wrapper.vm.$data.updatedWidth;
    const updatedHeight = wrapper.vm.$data.updatedHeight;
    expect(wrapper.vm._computedWatchers.viewBox.value).equal(
      `0 0 ${updatedWidth} ${updatedHeight}`,
    );
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

  it('computes bitmapInput when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(typeof wrapper.vm._computedWatchers.bitmapInput.value).equal(
      typeof sensor.resources['5910'],
    );
  });
});
