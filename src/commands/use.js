const { InvalidInputError } = require('../errors')

module.exports = async function use({ aws, common, conf, cwd, flags }) {
  const cwdProf = conf.profileByDirectory[cwd]
  if (cwdProf) {
    return `AWS_PROFILE=${cwdProf}`
  }

  if (flags.skipPrompt) {
    return 0
  }

  const profList = Object.keys(aws).sort()
  const profListOutput = profList
    .map((prof, i) => `${i + 1})  ${prof}`)
    .join('\n')

  const question = [
    `No profile set for ${cwd}`,
    'Chose a profile to use:',
    profListOutput
  ]

  const answer = await common.askCliQuestion(question)
  const idx = parseInt(answer, 10) - 1
  const prof = profList[idx]
  if (!prof) {
    throw new InvalidInputError(
      'Invalid profile selection, not exporting AWS_PROFILE'
    )
  }

  conf.profileByDirectory[cwd] = prof
  common.setDotConfig(conf)

  return `AWS_PROFILE=${prof}`
}
