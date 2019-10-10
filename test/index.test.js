const index = require('../src')
const middleware = require('../src/middleware')
const commands = require('../src/commands')
const commandNames = Object.keys(commands)

const origConsoleLog = console.log
describe('main index', () => {
  beforeEach(() => {
    console.log = jest.fn()
    middleware.apply = jest.fn(fns => fns)
    commandNames.forEach(cmd => {
      commands[cmd] = jest.fn().mockReturnValue(`command: ${cmd}`)
    })
  })

  afterEach(() => {
    console.log = origConsoleLog
  })

  commandNames.forEach(cmd => {
    test(`calls ${cmd}`, async () => {
      console.log = jest.fn()
      const flags = {
        _: [cmd]
      }
      expect(await index(flags)).toBe(cmd === 'help' ? 'command: help' : 0)
      expect(commands[cmd]).toHaveBeenCalledTimes(1)
      expect(console.log).toHaveBeenCalledTimes(cmd === 'help' ? 0 : 1)
    })
  })

  test('defaults to current', async () => {
    expect(await index({})).toBe(0)
    expect(commands.current).toHaveBeenCalledTimes(1)
  })

  test('help', async () => {
    commands.help.mockReturnValue(1)
    expect(await index({ help: true })).toBe(1)
    expect(middleware.apply).toHaveBeenCalledWith(commands, { help: true })
  })

  test('no output when return value is 0', async () => {
    commands.use.mockReturnValue(0)
    const flags = {
      _: ['use']
    }
    expect(await index(flags)).toBe(0)
    expect(middleware.apply).toHaveBeenCalledWith(commands, flags)
    expect(console.log).not.toHaveBeenCalled()
  })
})
