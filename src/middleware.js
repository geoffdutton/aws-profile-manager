const common = require('./common')

const middleware = (fn, flags) => async () => {
  try {
    const aws = common.getAWSCreds()
    if (!aws) {
      return new Error(
        'No available profiles. Is ~/.aws/credentials set right?'
      )
    }

    const conf = common.getDotConfig()
    const result = await fn({
      aws,
      common,
      conf,
      cwd: process.cwd(),
      flags
    })
    return result
  } catch (e) {
    return e
  }
}

/**
 * Adds common functionality
 * @param {Object.<string, function>} objectOfFns
 * @param {Object} flags -- command line flags
 * @returns {Object.<string, function>}
 */
module.exports.apply = function applyMiddleware(objectOfFns, flags) {
  const fns = Object.keys(objectOfFns)
  fns.forEach(fnKey => {
    objectOfFns[fnKey] = middleware(objectOfFns[fnKey], flags)
  })

  return objectOfFns
}
