import {expect} from 'chai';
import {mount, shallowMount} from '@vue/test-utils';
import SensorGauge from '@/components/SensorGauge.vue';
import deviceTree from '@/assets/device-tree.json';

describe('SensorGauge.vue', () => {
  it('renders updatedSensor when mounted', () => {
    const sensor = deviceTree.children[4];
    const wrapper = mount(SensorGauge, {
      propsData: {sensor: JSON.stringify(sensor)},
    });
    expect(wrapper.vm.$data.updatedSensor.name).equal(sensor.name);
  });
});
