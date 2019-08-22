import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorText from '@/components/SensorText.vue';
import deviceTree from '@/assets/device-tree.json';

const componentName = 'SensorText';
const sensor = deviceTree.children[8];

const factory = (values = {}) => {
  return shallowMount(SensorText, {
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
    wrapper.vm.$emit('update-sensor', sensor, 5527, 'YO!');
    const args = wrapper.emitted()['update-sensor'][0];
    expect(args[0].name).equal(sensor.name);
    expect(args[1]).equal(5527);
    expect(args[2]).equal('YO!');
  });

  it('emit {sensor} to delete when delete-sensor is emitted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.vm.$emit('delete-sensor', sensor);
    const args = wrapper.emitted()['delete-sensor'][0];
    expect(args[0].name).equal(sensor.name);
  });

  it('computes textResource when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.textResource.value).equal(
      sensor.resources['5527'],
    );
  });
});
