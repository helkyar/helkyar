const fs = require('fs').promises
const TEMPLATE_PATH = './template/README.md.tpl'
const README_PATH = './README.md'
const STREAK_PLACEHOLDER = '%{current}%'
const ENCODING = 'utf8'

function updateChallengeDate(){
  const currentStreak = Math.floor((Number(new Date()) - Number(new Date('10-18-2024'))) / 86400000)
  return `(${currentStreak}/100)` 
}

module.exports = async function updateReadme(params) {
  const {
    placeholderToUpdate,
    placeholderToMaintain,
    message,
    snippedToSearch,
    messageLength,
  } = params

  const [markdownTemplate, markdownReadme] = await Promise.all([
    fs.readFile(TEMPLATE_PATH, ENCODING),
    fs.readFile(README_PATH, ENCODING),
  ])

  let markdown = markdownTemplate.replace(placeholderToUpdate, message)

  if (!markdownReadme.includes(snippedToSearch)) {
    markdown = markdown.replace(placeholderToMaintain, '')
  } else {
    const indexOfSnipped = markdownReadme.indexOf(snippedToSearch)
    const previousMsg = markdownReadme.slice(
      indexOfSnipped,
      indexOfSnipped + messageLength
    )
    markdown = markdown.replace(placeholderToMaintain, previousMsg)
  }
    markdown = markdown.replace(STREAK_PLACEHOLDER, updateChallengeDate())
  await fs.writeFile(README_PATH, markdown)
}
