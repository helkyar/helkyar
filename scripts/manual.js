const updateReadme = require('./writeReadme')
const {
  CRON_AUTOMATIC_UPDATE,
  CRON_MANUAL_UPDATE,
  automaticMessage,
  manualMessage,
} = require('../msg/constants')

;(async () => {
  const snippedLength = 47
  const messageLength = automaticMessage.length
  const snippedToSearch = automaticMessage.slice(0, snippedLength)
  const placeholderToMaintain = CRON_AUTOMATIC_UPDATE
  const placeholderToUpdate = CRON_MANUAL_UPDATE
  const message = manualMessage

  updateReadme({
    placeholderToMaintain,
    placeholderToUpdate,
    message,
    snippedToSearch,
    messageLength,
  })
})()
