module.exports = function list({ aws }) {
  return (
    '\nAvailable AWS Profiles:\n' +
    Object.keys(aws)
      .sort()
      .map((prof, i) => `${i + 1})    ${prof}`)
      .join('\n')
  )
}
