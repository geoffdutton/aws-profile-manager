const { current } = require('../../src/commands')

let conf
let cwd
let env
let flags
beforeEach(() => {
  flags = {}
  env = {}
  cwd = '/some/working/dir'
  conf = {
    profileByDirectory: {}
  }
})

test('current without profile', () => {
  conf.profileByDirectory[cwd] = 'something'
  expect(current({ conf, cwd, env, flags })).toBe(
    'Current Env\nAWS_PROFILE=<Not Set>'
  )
})

test('current with profile', () => {
  conf.profileByDirectory[cwd] = 'something'
  env.AWS_PROFILE = 'prof1'
  expect(current({ conf, cwd, env, flags })).toBe(
    'Current Env\nAWS_PROFILE=prof1'
  )
})

test('current with no cwd profile set', () => {
  env.AWS_PROFILE = 'prof1'
  expect(current({ conf, cwd, env, flags })).toBe(
    'No AWS_PROFILE set for /some/working/dir'
  )
})

test('current with no cwd profile set with checkCurrent flag', () => {
  flags.checkCurrent = true
  expect(current({ conf, cwd, env, flags })).toBe(-1)
})
