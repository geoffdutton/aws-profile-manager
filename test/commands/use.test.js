const { use } = require('../../src/commands')
const { InvalidInputError } = require('../../src/errors')

let aws
let cwd
let conf
let common
let flags

beforeEach(() => {
  flags = {}
  aws = {
    prof1: {},
    another: {}
  }
  cwd = '/the/cur/working/dir'
  conf = {
    profileByDirectory: {}
  }
  common = {
    askCliQuestion: jest.fn().mockResolvedValue(1),
    setDotConfig: jest.fn()
  }
})

test('uses existing entry', async () => {
  conf.profileByDirectory[cwd] = 'prof1'
  expect(
    await use({
      aws,
      common,
      conf,
      cwd,
      flags
    })
  ).toMatchInlineSnapshot(`"AWS_PROFILE=prof1"`)
})

test('prompts user from existing profiles', async () => {
  expect(
    await use({
      aws,
      common,
      conf,
      cwd,
      flags
    })
  ).toMatchInlineSnapshot(`"AWS_PROFILE=another"`)
  expect(common.askCliQuestion).toHaveBeenCalledWith([
    `No profile set for ${cwd}`,
    'Chose a profile to use:',
    `1)  another\n2)  prof1`
  ])

  expect(conf.profileByDirectory[cwd]).toBe('another')
  expect(common.setDotConfig).toHaveBeenCalledWith(conf)
})

test('throws InvalidInputError', async () => {
  common.askCliQuestion.mockResolvedValue(7)
  await expect(
    use({
      aws,
      common,
      conf,
      cwd,
      flags
    })
  ).rejects.toThrow(InvalidInputError)

  expect(conf.profileByDirectory[cwd]).toBeUndefined()
  expect(common.setDotConfig).not.toHaveBeenCalled()
})

test('skips prompt to user with flag', async () => {
  flags.skipPrompt = true
  expect(
    await use({
      aws,
      common,
      conf,
      cwd,
      flags
    })
  ).toBe(0)
  expect(common.askCliQuestion).not.toHaveBeenCalled()
  expect(common.setDotConfig).not.toHaveBeenCalled()
})
