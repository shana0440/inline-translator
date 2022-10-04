import { injectAfter } from "~app/injector"
import { queryItems, queryParagraphs } from "~app/parser"

interface TagForTranslateElements {
  elements: NodeListOf<HTMLElement>
  tag: keyof HTMLElementTagNameMap
}

chrome.runtime.onMessage.addListener(() => {
  const paragraphs = queryParagraphs(document)
  const items = queryItems(document)
  const translateElements: TagForTranslateElements[] = [
    {
      elements: paragraphs,
      tag: "p"
    },
    {
      elements: items,
      tag: "li"
    }
  ]

  translateElements.forEach(({ elements, tag }) => {
    elements.forEach((it) => {
      chrome.runtime.sendMessage({ text: it.innerText }, (resp) => {
        injectAfter(it, tag, resp.text)
      })
    })
  })
})
