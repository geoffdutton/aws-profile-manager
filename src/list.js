module.exports.cmd = function list(awsProfiles) {
  return (
    '\nAvailable AWS Profiles:\n' +
    Object.keys(awsProfiles)
      .sort()
      .map((prof, i) => `${i + 1})    ${prof}`)
      .join('\n')
  )
}
