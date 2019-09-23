#!/usr/bin/env node

const mri = require('mri')
const flags = mri(process.argv.slice(2), {
  // string: ['use'],
  default: {
    something: false
  }
})

console.log({ flags })

require('./')(flags)
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
