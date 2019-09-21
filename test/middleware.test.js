const common = require('../src/common')
const applyMiddleware = require('../src/middleware').apply

describe('middleware', () => {
  let fn
  let appliedFn
  let flags
  let awsConfig
  let dotConf

  beforeEach(() => {
    flags = {}
    dotConf = { dirs: [] }
    awsConfig = { profile: 1 }
    fn = jest.fn().mockReturnValue('abc')

    common.getAWSCreds = jest.fn().mockReturnValue(awsConfig)
    common.getDotConfig = jest.fn().mockReturnValue(dotConf)

    appliedFn = applyMiddleware({ fn }, flags).fn
  })

  test('injects dependencies', async () => {
    expect(await appliedFn()).toBe('abc')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith({
      aws: awsConfig,
      common,
      conf: dotConf,
      cwd: process.cwd(),
      flags
    })

    expect(common.getDotConfig).toHaveBeenCalledTimes(1)
    expect(common.getAWSCreds).toHaveBeenCalledTimes(1)
  })

  test('returns and error with no .aws', async () => {
    common.getAWSCreds.mockReturnValue(null)
    const err = await appliedFn()
    expect(err.message).toBe(
      'No available profiles. Is ~/.aws/credentials set right?'
    )
  })

  test('catches rejections and returns error', async () => {
    fn.mockRejectedValue(new Error('function error!!'))
    const err = await appliedFn()
    expect(err.message).toBe('function error!!')
  })
})
