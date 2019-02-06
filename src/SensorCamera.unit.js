import SensorCamera from './SensorCamera'

test('exports a valid component', () => {
  expect(SensorCamera).toBeAComponent()
})

// test('renders the text "SensorCamera"', () => {
//   const { element } = shallowMount(SensorCamera)
//   expect(element.textContent.trim()).toBe('SensorCamera')
// })

// test('adds a "hello" class on the root element', () => {
//   const { element } = shallowMount(SensorCamera)
//   expect(element.classList.contains('hello')).toBe(true)
// })
