const { help } = require('../../src/commands')

test('--help or help', () => {
  expect(help()).toBe(1)
})
