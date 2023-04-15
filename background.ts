import { translate } from "~app/translator"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  translate(message.text, { from: "auto", to: message.language }).then(
    (text) => {
      sendResponse({ text })
    }
  )
  // keeps the channel open for sendResponse
  return true
})
