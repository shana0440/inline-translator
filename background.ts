import { Storage } from "@plasmohq/storage"

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

const InlineTranslateId = "inline-translate"

chrome.contextMenus.create({
  id: InlineTranslateId,
  title: "Inline Translate",
  contexts: ["all"]
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === InlineTranslateId) {
    const storage = new Storage()
    storage.get("language").then((language) => {
      chrome.tabs.sendMessage(tab.id, { language })
    })
  }
})
