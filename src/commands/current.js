module.exports = function current({ env }) {
  return `Current Env\nAWS_PROFILE=` + (env.AWS_PROFILE || '<Not Set>')
}
