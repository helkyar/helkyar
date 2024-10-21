const updateReadme = require('./writeReadme')
const {
  CRON_AUTOMATIC_UPDATE,
  CRON_MANUAL_UPDATE,
  automaticMessage,
  manualMessage,
} = require('../msg/constants')

;(async () => {
  const snippedLength = 50
  const snippedToSearch = manualMessage.slice(0, snippedLength)
  const messageLength = manualMessage.length
  const placeholderToMaintain = CRON_MANUAL_UPDATE
  const placeholderToUpdate = CRON_AUTOMATIC_UPDATE
  const message = automaticMessage

  updateReadme({
    placeholderToMaintain,
    placeholderToUpdate,
    message,
    snippedToSearch,
    messageLength,
  })
})()
