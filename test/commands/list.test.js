const { list } = require('../../src/commands')

test('list available profiles', () => {
  expect(
    list({
      aws: {
        prof1: {}
      }
    })
  ).toMatchInlineSnapshot(`
    "
    Available AWS Profiles:
    1)    prof1"
  `)
})
