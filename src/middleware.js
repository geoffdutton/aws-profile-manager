const common = require('./common')

const middleware = fn => async () => {
  try {
    const aws = common.getAWSCreds()
    if (!aws) {
      return new Error(
        'No available profiles. Is ~/.aws/credentials set right?'
      )
    }

    const conf = common.getDotConfig()
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
module.exports = function applyMiddleware(objectOfFns) {
  const fns = Object.keys(objectOfFns)
  fns.forEach(fnKey => {
    objectOfFns[fnKey] = middleware(objectOfFns[fnKey])
  })

  return objectOfFns
}
