const CRON_AUTOMATIC_UPDATE = /%{{automatic}}%/g
const CRON_MANUAL_UPDATE = /%{{manual}}%/g

const date = new Date().toISOString().split('T')[0]
const automaticMessage = `<p align="center">last successful automatic update ${date}</p>`
const manualMessage = `<p align="center">last successful forced update ${date}</p>`

module.exports = {
  CRON_AUTOMATIC_UPDATE,
  CRON_MANUAL_UPDATE,
  automaticMessage,
  manualMessage,
}
