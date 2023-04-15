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

// NOTE: support firefox, firefox using browser instead of chrome to register context menu
declare const browser: typeof chrome
const theBrowser = typeof browser !== "undefined" ? browser : chrome
theBrowser.contextMenus.create({
  id: InlineTranslateId,
  title: "Inline Translate",
  contexts: ["all"]
})

theBrowser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === InlineTranslateId) {
    const storage = new Storage()
    storage.get("language").then((language) => {
      chrome.tabs.sendMessage(tab.id, { language })
    })
  }
})
