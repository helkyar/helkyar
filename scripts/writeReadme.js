const fs = require('fs').promises
const TEMPLATE_PATH = './template/README.md.tpl'
const README_PATH = './README.md'
const ENCODING = 'utf8'

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

  await fs.writeFile(README_PATH, markdown)
}
