import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorLevel from '@/components/SensorLevel.vue';
import deviceTree from '@/assets/device-tree.json';

const factory = (values = {}) => {
  return shallowMount(SensorLevel, {
    propsData: {...values},
  });
};

describe('SensorLevel.vue', () => {
  const sensor = deviceTree.children[5];

  it('renders updatedSensor when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm.$data.updatedSensor.name).equal(sensor.name);
  });

  it('emit {sensor} to update when update-sensor is emitted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.vm.$emit('update-sensor', sensor, 5850, 25);
    const args = wrapper.emitted()['update-sensor'][0];
    expect(args[0].name).equal(sensor.name);
    expect(args[1]).equal(5850);
    expect(args[2]).equal(25);
  });

  // it('has a button', () => {
  //   expect(wrapper.contains('circle')).toBe(true);
  // });
  // const button = wrapper.find('button');
  // button.trigger('click');
  // expect(wrapper.vm.count).toBe(1);
});
