const pkg = require('../../package')
const cliHelp = `AWS Profile Manager v${pkg.version}

@TODO: Clean this up
Manage your AWS environment variables like aa pro!

Usage
  $ awsprof

Options
  --something do something

Examples
  $ awsprof use
`

module.exports = function help() {
  console.log(cliHelp)
  return 1
}
