import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorTime from '@/components/SensorTime.vue';
import deviceTree from '@/assets/device-tree.json';

const componentName = 'SensorTime';
const sensor = deviceTree.children[7];

const factory = (values = {}) => {
  return shallowMount(SensorTime, {
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
    wrapper.vm.$emit('update-sensor', sensor, 5750, 'fr_clock');
    const args = wrapper.emitted()['update-sensor'][0];
    expect(args[0].name).equal(sensor.name);
    expect(args[1]).equal(5750);
    expect(args[2]).equal('fr_clock');
  });

  it('emit {sensor} to delete when delete-sensor is emitted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.vm.$emit('delete-sensor', sensor);
    const args = wrapper.emitted()['delete-sensor'][0];
    expect(args[0].name).equal(sensor.name);
  });
});
