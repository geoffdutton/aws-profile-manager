module.exports = function current({ env }) {
  return [
    'Current Env',
    'AWS_PROFILE=' + (env.AWS_PROFILE || '<Not Set>')
  ].join('\n')
}
