import { injectAfter } from "./injector"
import { queryItems, queryParagraphs } from "./parser"
import { translate } from "./translator"

export function inlineTranslate(document: Document) {
  const paragraphs = queryParagraphs(document)
  const items = queryItems(document)
  const elements: {
    elements: NodeListOf<HTMLElement>
    tag: keyof HTMLElementTagNameMap
  }[] = [
    {
      elements: paragraphs,
      tag: "p"
    },
    {
      elements: items,
      tag: "li"
    }
  ]

  for (const element of elements) {
    for (const it of element.elements) {
      translate(it.innerText).then((text) => {
        injectAfter(it, element.tag, text)
      })
    }
  }
}
