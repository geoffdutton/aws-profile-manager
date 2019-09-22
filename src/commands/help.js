const cliHelp = `
@TODO: Clean this up
Manage your AWS environment variables like aa pro!

Usage
  $ aws-profile-manager

Options
  --something do something

Examples
  $ aws-profile-manager .
`

module.exports = function help() {
  console.log(cliHelp)
  return 1
}
