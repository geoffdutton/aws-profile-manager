const middleware = require('./middleware')
const chalk = require('chalk')

async function main(flags) {
  const commands = middleware.apply(require('./commands'), flags)

  const [cmd] = flags._ || []

  if (flags.version || flags.help || cmd === 'help') {
    return commands.help()
  }

  let output = ''

  switch (cmd) {
    case 'list':
      output = await commands.list()
      console.log(chalk.yellow(output))
      break
    case 'reset':
      output = await commands.reset()
      console.log(chalk.red(output))
      break
    case 'use':
      output = await commands.use()
      output !== 0 && console.log(chalk.blue(output))
      break
    default:
      output = await commands.current()
      console.log(chalk.green(output))
  }

  return 0
}

/**
 *
 * @type {Object}
 */

module.exports = main
