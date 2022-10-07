import { injectAfter } from "~app/injector"

interface TagForTranslateElements {
  elements: NodeListOf<HTMLElement>
  tag: keyof HTMLElementTagNameMap
}

const TRANSLATED_KEY = "translated"

chrome.runtime.onMessage.addListener(() => {
  const paragraphs = document.querySelectorAll<HTMLParagraphElement>(
    `p:not([data-${TRANSLATED_KEY}])`
  )
  const items = document.querySelectorAll<HTMLLIElement>(
    `li:not([data-${TRANSLATED_KEY}])`
  )
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
        const injectedNode = injectAfter(it, tag, resp.text)
        injectedNode.dataset[TRANSLATED_KEY] = "true"
        it.dataset[TRANSLATED_KEY] = "true"
      })
    })
  })
})
