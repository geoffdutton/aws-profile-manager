#!/usr/bin/env node

const mri = require('mri')
const index = require('./index')
const chalk = require('chalk')

const cliHelp = `
Manage your AWS environment variables like aa pro!

Usage
  $ aws-profile-manager

Options
  --something do something

Examples
  $ aws-profile-manager .
`

function help() {
  console.log(cliHelp)
  process.exit(1)
}

async function main() {
  const flags = mri(process.argv.slice(2), {
    // string: ['use'],
    default: {
      something: false
    }
  })

  // console.log('\n', { flags }, '\n')

  if (flags.help) {
    help()
  }

  const [cmd] = flags._ || []

  let output = ''

  switch (cmd) {
    case 'list':
      output = await index.list()
      console.log(chalk.yellow(output))
      break
    case 'reset':
      output = await index.reset()
      console.log(chalk.red(output))
      break
    case 'use':
      output = await index.use()
      console.log(chalk.blue(output))
      break
    default:
      output = await index.current()
      console.log(chalk.green(output))
  }

  return 0
}

main()
  .then(function index(result) {
    if (typeof result === 'number') {
      process.exit(result)
    }

    if (result instanceof Error) {
      console.error(result)
      process.exit(2)
    }
  })
  .catch(function indexError(error) {
    console.error(error)
    process.exit(2)
  })
