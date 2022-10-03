import { inlineTranslate } from "~app/main"

chrome.runtime.onMessage.addListener(() => {
  try {
    inlineTranslate(document)
  } catch (e: any) {
    console.log("[inline translator]", e)
  }
})
