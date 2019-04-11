import {expect} from 'chai';
import {mount, shallowMount} from '@vue/test-utils';
import SensorAudio from '@/components/SensorAudio.vue';
import deviceTree from '@/assets/device-tree.json';

const factory = (values = {}) => {
  return shallowMount(SensorAudio, {
    propsData: {...values},
  });
};

describe('SensorAudio.vue', () => {
  const sensor = deviceTree.children[9];

  it('renders updatedSensor when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm.$data.updatedSensor.name).equal(sensor.name);
  });

  // it('has a button', () => {
  //   expect(wrapper.contains('button')).toBe(true);
  // });
});
