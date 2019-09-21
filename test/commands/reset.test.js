const { reset } = require('../../src/commands')

test('resets directory entry', () => {
  const cwd = '/the/cur/working/dir'
  const conf = {
    profileByDirectory: {
      [cwd]: 'prof1'
    }
  }
  const com = {
    setDotConfig: jest.fn()
  }
  expect(
    reset({
      common: com,
      conf,
      cwd
    })
  ).toMatchInlineSnapshot(`"Removed stored profile for /the/cur/working/dir"`)
  expect(conf.profileByDirectory[cwd]).toBeUndefined()
  expect(com.setDotConfig).toHaveBeenCalledWith(conf)
})
