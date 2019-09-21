const fs = require('fs')
const execSync = require('child_process').execSync
const path = require('path')
const common = require('../src/common')

describe('common functions', () => {
  const mockFilesDir = path.resolve(__dirname, 'mockfiles')
  const fakeHomeDir = path.resolve(mockFilesDir, 'home')
  const testDir = path.resolve(mockFilesDir, 'dir', 'dir.txt')
  const testTxt = path.resolve(mockFilesDir, 'test.txt')
  const testJson = path.resolve(mockFilesDir, 'json.txt')

  beforeEach(() => {
    execSync(`rm -rf ${mockFilesDir}`)
    fs.mkdirSync(mockFilesDir)
    common.homeDir = fakeHomeDir
  })

  test('writeFile and readFile', () => {
    common.writeFile(testJson, { data: 33 })
    expect(common.readFile(testJson)).toEqual({ data: 33 })
  })

  test('readFile with non-parsable json', () => {
    fs.writeFileSync(testTxt, 'some=thing')
    expect(common.readFile(testTxt)).toEqual('some=thing')
  })

  test('ensureFile', () => {
    common.ensureFile(testDir)
    expect(fs.readFileSync(testDir, 'utf8')).toBe('{\n}')
    // should do nothing if it does already exist
    common.ensureFile(testDir)
    expect(fs.readFileSync(testDir, 'utf8')).toBe('{\n}')
  })

  test('get and set dot config', () => {
    let conf = common.getDotConfig()
    expect(conf).toEqual({
      profileByDirectory: {}
    })

    conf.profileByDirectory['/some/dir'] = 'prof3'
    common.setDotConfig(conf)
    conf = common.getDotConfig()
    expect(conf).toEqual({
      profileByDirectory: {
        '/some/dir': 'prof3'
      }
    })
  })

  test('get aws creds when not existing', () => {
    expect(() => common.getAWSCreds()).toThrowError('does not exist')
  })
})
