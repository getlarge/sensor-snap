import {expect} from 'chai';
import {mount, shallowMount} from '@vue/test-utils';
import SensorText from '@/components/SensorText.vue';
import deviceTree from '@/assets/device-tree.json';

const factory = (values = {}) => {
  return mount(SensorText, {
    propsData: {...values},
  });
};

describe('SensorText.vue', () => {
  const sensor = deviceTree.children[8];

  it('renders updatedSensor when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm.$data.updatedSensor.name).equal(sensor.name);
  });

  // it('has a button', () => {
  //   expect(wrapper.contains('button')).toBe(true);
  // });
});
