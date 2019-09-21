const common = require('./common')

const main = {
  async current() {
    return (
      `Current Env\nAWS_PROFILE=` + (process.env.AWS_PROFILE || '<Not Set>')
    )
  },
  async list({ aws }) {
    return require('./list').cmd(aws)
  },
  use: require('./use'),
  async reset({ conf, cwd }) {
    conf.profileByDirectory[cwd] = undefined
    common.setDotConfig(conf)
    return `Removed stored profile for ${cwd}`
  }
}

/**
 *
 * @type {Object}
 */

module.exports = require('./middleware')(main)
