const common = require('./common')

const middleware = fn => async () => {
  try {
    const aws = common.getAWSCreds()
    const conf = common.getDotConfig()

    if (!aws) {
      return new Error(
        'No available profiles. Is ~/.aws/credentials set right?'
      )
    }
    return fn({ aws, conf, cwd: process.cwd() })
  } catch (e) {
    return e
  }
}

/**
 * Adds common functionality
 * @param {Object.<string, function>} objectOfFns
 * @returns {Object.<string, function>}
 */
module.exports = objectOfFns => {
  const fns = Object.keys(objectOfFns)
  fns.forEach(fnKey => {
    objectOfFns[fnKey] = middleware(objectOfFns[fnKey])
  })

  return objectOfFns
}
