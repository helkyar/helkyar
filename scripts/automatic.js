const fs = require('fs').promises

const CRON_AUTOMATIC_UPDATE = /%{{automatic}}%/
const CRON_MANUAL_UPDATE = /%{{manual}}%/

const date = new Date().toISOString().split('T')[0]
const automaticMessage = `<p align="center">last successful automatic update ${date}</p>`
const manualMessage = `<p align="center">last successful manual update ${date}</p>`

;(async () => {
  const markdownTemplate = await fs.readFile('./template/README.md.tpl', 'utf8')
  const markdownReadme = await fs.readFile('./README.md', 'utf8')
  let markdown = markdownTemplate.replace(
    CRON_AUTOMATIC_UPDATE,
    automaticMessage
  )

  if (!markdownReadme.includes(manualMessage.slice(0, 47))) {
    markdown = markdown.replace(CRON_MANUAL_UPDATE, '')
  } else {
    const indexOfManualMessage = markdownReadme.indexOf(
      manualMessage.slice(0, 47)
    )
    const previousManualMessage = markdownReadme.slice(
      indexOfManualMessage,
      indexOfManualMessage + 62
    )
    markdown = markdown.replace(CRON_MANUAL_UPDATE, previousManualMessage)
  }
  await fs.writeFile('./README.md', markdown)
})()
