module.exports = function reset({ common, conf, cwd }) {
  conf.profileByDirectory[cwd] = undefined
  common.setDotConfig(conf)
  return `Removed stored profile for ${cwd}`
}
