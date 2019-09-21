const path = require('path')
const ini = require('ini')
const fs = require('fs')
const stringify = require('json-stable-stringify-without-jsonify')
const DOT_DIR = '.aws-profile-manager'
const CONFIG = 'config.json'

const CommonFunctions = {
  homeDir: require('os').homedir(),

  writeFile(fileName, data) {
    fs.writeFileSync(fileName, stringify(data, { space: '  ' }))
  },
  readFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8')
    try {
      return JSON.parse(data)
    } catch (_) {}

    return data
  },
  ensureFile(fileName) {
    if (!fs.existsSync(fileName)) {
      fs.mkdirSync(path.dirname(fileName), {
        recursive: true
      })

      this.writeFile(fileName, {})
    }
  },

  setDotConfig(data) {
    const configFile = path.resolve(this.homeDir, DOT_DIR, CONFIG)
    return this.writeFile(configFile, data)
  },
  getDotConfig() {
    const configFile = path.resolve(this.homeDir, DOT_DIR, CONFIG)
    this.ensureFile(configFile)
    const conf = this.readFile(configFile)
    return Object.assign(
      {
        profileByDirectory: {}
      },
      conf
    )
  },

  getAWSCreds() {
    const configFile = path.resolve(this.homeDir, '.aws', 'credentials')
    if (!fs.existsSync(configFile)) {
      throw new Error(configFile + ' does not exist')
    }
    return ini.parse(this.readFile(configFile))
  },
  askCliQuestion(msg) {
    if (Array.isArray(msg)) {
      msg = msg.join('\n')
    }
    return new Promise(resolve => {
      const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      })
      rl.question(`${msg}\n\n`, answer => {
        rl.close()
        resolve(answer)
      })
    })
  }
}

module.exports = CommonFunctions
