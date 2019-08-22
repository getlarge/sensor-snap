import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorTimer from '@/components/SensorTimer.vue';
import deviceTree from '@/assets/device-tree.json';

const componentName = 'SensorTimer';
const sensor = deviceTree.children[10];

const factory = (values = {}) => {
  return shallowMount(SensorTimer, {
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

  it('computes switchButtonClass when sensor.resources["5850"] is true', () => {
    sensor.resources['5850'] = 1;
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.switchButtonClass.value).equal(
      'switch-button switched-on',
    );
  });

  it('computes wholeTime when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.wholeTime.value).equal(
      sensor.resources['5521'],
    );
  });

  it('computes timerState when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.timerState.value).equal(
      sensor.resources['5850'],
    );
  });

  it('computes timerOutput when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.timerOutput.value).equal(
      sensor.resources['5543'],
    );
  });
});
