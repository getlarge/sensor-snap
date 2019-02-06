import SensorGauge from './SensorGauge'

test('exports a valid component', () => {
  expect(SensorGauge).toBeAComponent()
})

// test('renders the text "SensorGauge"', () => {
//   const { element } = shallowMount(SensorGauge)
//   expect(element.textContent.trim()).toBe('SensorGauge')
// })

// test('adds a "hello" class on the root element', () => {
//   const { element } = shallowMount(SensorGauge)
//   expect(element.classList.contains('hello')).toBe(true)
// })
