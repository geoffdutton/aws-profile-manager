const fs = require('fs')
const execSync = require('child_process').execSync
const path = require('path')
const readline = require('readline')
const common = require('../src/common')

const exampleIni = `
[default]
aws_access_key_id=default-key
aws_secret_access_key=default-secret

[personal]
aws_access_key_id=personal-key
aws_secret_access_key=personal-secret
`.trim()

describe('common functions', () => {
  const mockFilesDir = path.resolve(__dirname, 'mockfiles')
  const fakeHomeDir = path.resolve(mockFilesDir, 'home')
  const testDir = path.resolve(mockFilesDir, 'dir', 'dir.txt')
  const testTxt = path.resolve(mockFilesDir, 'test.txt')
  const testJson = path.resolve(mockFilesDir, 'json.txt')
  const testAwsCreds = path.resolve(fakeHomeDir, '.aws', 'credentials')

  let mockRlInterface

  beforeEach(() => {
    mockRlInterface = {
      question: jest.fn((msg, cb) => {
        // eslint-disable-next-line standard/no-callback-literal
        cb('1')
      }),
      close: jest.fn()
    }

    readline.createInterface = jest.fn().mockReturnValue(mockRlInterface)

    execSync(`rm -rf ${mockFilesDir}`)
    fs.mkdirSync(mockFilesDir)
    fs.mkdirSync(fakeHomeDir)
    fs.mkdirSync(path.dirname(testAwsCreds))
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

  test('parses .aws credentials ini file', () => {
    fs.writeFileSync(testAwsCreds, exampleIni)
    expect(common.getAWSCreds()).toEqual({
      default: {
        aws_access_key_id: 'default-key',
        aws_secret_access_key: 'default-secret'
      },
      personal: {
        aws_access_key_id: 'personal-key',
        aws_secret_access_key: 'personal-secret'
      }
    })
  })

  test('askCliQuestion', async () => {
    const msg = 'The ?'
    const answer = await common.askCliQuestion(msg)
    expect(answer).toBe('1')
    expect(readline.createInterface).toHaveBeenCalledWith({
      input: process.stdin,
      output: process.stdout
    })

    expect(mockRlInterface.question).toHaveBeenCalledWith(
      `${msg}\n\n`,
      expect.any(Function)
    )
    expect(mockRlInterface.close).toHaveBeenCalledTimes(1)
  })

  test('askCliQuestion with array', async () => {
    const msg = ['The ?']
    const answer = await common.askCliQuestion(msg)
    expect(answer).toBe('1')
    expect(mockRlInterface.question).toHaveBeenCalledWith(
      `${msg}\n\n`,
      expect.any(Function)
    )
  })
})
