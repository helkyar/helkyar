const fs = require('fs').promises

const CRON_DATE_UPDATE = /%{{date}}%/g

;(async () => {
  const markdownTemplate = await fs.readFile('./template/README.md.tpl', 'utf8')
  const date = new Date().toISOString().split('T')[0]
  const markdown = markdownTemplate.replace(CRON_DATE_UPDATE, date)
  await fs.writeFile('./README.md', markdown)
})()
