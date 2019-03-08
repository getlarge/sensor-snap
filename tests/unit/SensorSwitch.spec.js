import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorSwitch from '@/components/SensorSwitch.vue';
import deviceTree from '@/assets/device-tree.json';

const factory = (values = {}) => {
  return shallowMount(SensorSwitch, {
    propsData: {...values},
  });
};

describe('SensorSwitch.vue', () => {
  const sensor = deviceTree.children[3];

  it('renders updatedSensor when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.setData({updatedSensor: sensor});
    expect(wrapper.vm.$data.updatedSensor.name).equal(sensor.name);
  });

  it('emit {sensor} to update when update-sensor is emitted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.vm.$emit('update-sensor', sensor, 3342, 0);
    const args = wrapper.emitted()['update-sensor'][0];
    expect(args[0].name).equal(sensor.name);
    expect(args[1]).equal(3342);
    expect(args[2]).equal(0);
  });
});
