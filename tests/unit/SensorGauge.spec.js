import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorGauge from '@/components/SensorGauge.vue';
import deviceTree from '@/assets/device-tree.json';
import {normalizeNumber} from '@/methods';

const componentName = 'SensorGauge';
const sensor = deviceTree.children[4];

const factory = (values = {}) => {
  return shallowMount(SensorGauge, {
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
    wrapper.vm.$emit('update-sensor', sensor, 5700, 313);
    const args = wrapper.emitted()['update-sensor'][0];
    expect(args[0].name).equal(sensor.name);
    expect(args[1]).equal(5700);
    expect(args[2]).equal(313);
  });

  it('emit {sensor} to delete when delete-sensor is emitted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.vm.$emit('delete-sensor', sensor);
    const args = wrapper.emitted()['delete-sensor'][0];
    expect(args[0].name).equal(sensor.name);
  });

  it('computes sensorValue when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    const mainResourceId = wrapper.vm._computedWatchers.mainResourceId.value;
    const minRangeValue = wrapper.vm._computedWatchers.minRangeValue.value;
    const maxRangeValue = wrapper.vm._computedWatchers.maxRangeValue.value;
    const sensorValue = normalizeNumber(
      sensor.resources[mainResourceId],
      minRangeValue,
      maxRangeValue,
    );
    expect(wrapper.vm._computedWatchers.sensorValue.value).equal(sensorValue);
  });
});
