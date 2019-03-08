import {expect} from 'chai';
import {mount, shallowMount} from '@vue/test-utils';
import SensorTime from '@/components/SensorTime.vue';
import deviceTree from '@/assets/device-tree.json';

const factory = (values = {}) => {
  return mount(SensorTime, {
    propsData: {...values},
  });
};

describe('SensorTime.vue', () => {
  const sensor = deviceTree.children[7];

  it('renders updatedSensor when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm.$data.updatedSensor.name).equal(sensor.name);
  });

  // it('has a button', () => {
  //   expect(wrapper.contains('button')).toBe(true);
  // });
});
