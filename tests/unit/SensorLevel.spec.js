import {expect} from 'chai';
import {shallowMount} from '@vue/test-utils';
import SensorLevel from '@/components/SensorLevel.vue';
import deviceTree from '@/assets/device-tree.json';

const componentName = 'SensorLevel';

const sensor = deviceTree.children[5];

const factory = (values = {}) => {
  return shallowMount(SensorLevel, {
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
    wrapper.vm.$emit('update-sensor', sensor, 5851, 25);
    const args = wrapper.emitted()['update-sensor'][0];
    expect(args[0].name).equal(sensor.name);
    expect(args[1]).equal(5851);
    expect(args[2]).equal(25);
  });

  it('emit {sensor} to delete when delete-sensor is emitted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    wrapper.vm.$emit('delete-sensor', sensor);
    const args = wrapper.emitted()['delete-sensor'][0];
    expect(args[0].name).equal(sensor.name);
  });

  it('computes switchValue when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.switchValue.value).equal(
      sensor.resources['5850'],
    );
  });

  it('computes sliderValue when mounted', () => {
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.sliderValue.value).equal(
      sensor.resources['5851'],
    );
  });

  it('computes switchButtonClass when sensor.resources["5850"] is true', () => {
    sensor.resources['5850'] = 1;
    const wrapper = factory({sensor: JSON.stringify(sensor)});
    expect(wrapper.vm._computedWatchers.switchButtonClass.value).equal(
      'switch-button switched-on',
    );
  });

  // it('has a button', () => {
  // const wrapper = factory({sensor: JSON.stringify(sensor)});
  //   expect(wrapper.contains('circle')).toBe(true);
  // const button = wrapper.find('button');
  // button.trigger('click');
  // expect(wrapper.vm.count).toBe(1);
  // });
});
