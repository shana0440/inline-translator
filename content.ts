import { injectAfter } from "~app/injector"

interface TagForTranslateElements {
  elements: NodeListOf<HTMLElement>
  tag: keyof HTMLElementTagNameMap
}

const TRANSLATED_KEY = "translated"

chrome.runtime.onMessage.addListener(({ language }) => {
  const heads = document.querySelectorAll<HTMLHeadElement>(
    Array.apply(null, Array(6))
      .map((_, index) => `h${index + 1}`)
      .join(",")
  )
  const paragraphs = document.querySelectorAll<HTMLParagraphElement>(`p`)
  const items = document.querySelectorAll<HTMLLIElement>(`li`)
  const translateElements: TagForTranslateElements[] = [
    {
      elements: heads,
      tag: "p"
    },
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
    getLeafNodes(elements).forEach((it) => {
      if (it.dataset[TRANSLATED_KEY]) {
        return
      }
      chrome.runtime.sendMessage({ text: it.innerText, language }, (resp) => {
        const injectedNode = injectAfter(it, tag, resp.text)
        injectedNode.dataset[TRANSLATED_KEY] = "true"
        it.dataset[TRANSLATED_KEY] = "true"
      })
    })
  })
})

function getLeafNodes(
  nodes: NodeListOf<HTMLElement> | NodeListOf<ChildNode>,
  result = []
) {
  for (var i = 0, length = nodes.length; i < length; i++) {
    const isLeaf = [...nodes[i].childNodes].some(
      (it) => it.nodeType === Node.TEXT_NODE && (it as Text).data.trim() !== ""
    )
    if (isLeaf) {
      result.push(nodes[i])
    } else {
      result = getLeafNodes(nodes[i].childNodes, result)
    }
  }
  return result
}
