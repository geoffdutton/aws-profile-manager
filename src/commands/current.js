module.exports = function current({ env, conf, cwd, flags }) {
  const cwdProf = conf.profileByDirectory[cwd]
  if (!cwdProf) {
    return flags.checkCurrent ? -1 : `No AWS_PROFILE set for ${cwd}`
  }

  return [
    'Current Env',
    'AWS_PROFILE=' + (env.AWS_PROFILE || '<Not Set>')
  ].join('\n')
}
