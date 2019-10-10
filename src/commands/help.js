const pkg = require('../../package')
const cliHelp = `
AWS Profile Manager v${pkg.version}

Manage your AWS environment variables like aa pro!

Usage
  $ awsprof use         Prompt or set AWS_PROFILE based on ~/.awsprof/config.json
  $ awsprof reset       Remove CWD from ~/.awsprof/config.json and unset AWS_PROFILE
  $ awsprof current     Display current configuration for CWD

Options
  --version, --help Display this message

Examples
  $ awsprof use
`

module.exports = function help() {
  console.log(cliHelp)
  return 1
}
