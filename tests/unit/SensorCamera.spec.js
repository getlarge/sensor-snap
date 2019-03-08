import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorCamera from '@/components/SensorCamera.vue';
import deviceTree from '@/assets/device-tree.json';

const factory = (values = {}) => {
  return shallowMount(SensorCamera, {
    propsData: {...values},
  });
};

describe('SensorCamera.vue', () => {
  const sensor = deviceTree.children[6];

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
});
