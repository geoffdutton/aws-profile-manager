const index = require('../src')
const middleware = require('../src/middleware')
const commands = require('../src/commands')
const commandNames = Object.keys(commands)

describe('main index', () => {
  beforeEach(() => {
    middleware.apply = jest.fn(fns => fns)
    commandNames.forEach(cmd => {
      commands[cmd] = jest.fn().mockReturnValue(`command: ${cmd}`)
    })
  })

  commandNames.forEach(cmd => {
    test(`calls ${cmd}`, async () => {
      const flags = {
        _: [cmd]
      }
      expect(await index(flags)).toBe(cmd === 'help' ? 'command: help' : 0)
      expect(commands[cmd]).toHaveBeenCalledTimes(1)
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
})
