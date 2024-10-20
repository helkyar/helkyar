const fs = require('fs').promises

const CRON_AUTOMATIC_UPDATE = /%{{automatic}}%/g
const CRON_MANUAL_UPDATE = /%{{manual}}%/g

const date = new Date().toISOString().split('T')[0]
const automaticMessage = `<p align="center">last successful automatic update ${date}</p>`
const manualMessage = `<p align="center">last successful manual update ${date}</p>`

;(async () => {
  const markdownTemplate = await fs.readFile('./template/README.md.tpl', 'utf8')
  const markdownReadme = await fs.readFile('./README.md', 'utf8')
  let markdown = markdownTemplate.replace(CRON_MANUAL_UPDATE, manualMessage)

  if (!markdownReadme.includes(automaticMessage.slice(0, 50))) {
    markdown = markdown.replace(CRON_AUTOMATIC_UPDATE, '')
  } else {
    const indexOfAutomaticMessage = markdownReadme.indexOf(
      automaticMessage.slice(0, 50)
    )
    const previousAutomaticMessage = markdownReadme.slice(
      indexOfAutomaticMessage,
      indexOfAutomaticMessage + 65
    )
    markdown = markdown.replace(CRON_AUTOMATIC_UPDATE, previousAutomaticMessage)
  }
  await fs.writeFile('./README.md', markdown)
})()
