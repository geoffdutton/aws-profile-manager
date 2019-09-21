const { current } = require('../../src/commands')

test('current without profile', () => {
  expect(
    current({
      env: {}
    })
  ).toBe('Current Env\nAWS_PROFILE=<Not Set>')
})

test('current with profile', () => {
  expect(
    current({
      env: { AWS_PROFILE: 'prof1' }
    })
  ).toBe('Current Env\nAWS_PROFILE=prof1')
})
