import { injectAfter } from "~app/injector"

const TRANSLATED_KEY = "translated"

chrome.runtime.onMessage.addListener(({ language }) => {
  const textNodes = getTextNodes(document.body)

  const nodes = new Set<HTMLElement>()

  textNodes.forEach((it) => {
    const translateElement = getTranslatableElement(it.parentElement)
    if (!translateElement || translateElement.dataset[TRANSLATED_KEY]) {
      return
    }
    translateElement.dataset[TRANSLATED_KEY] = "true"
    getLeafNodes([translateElement]).forEach((it) => {
      nodes.add(it)
    })
  })

  nodes.forEach((it) => {
    chrome.runtime.sendMessage({ text: it.innerText, language }, (resp) => {
      const injectedNode = injectAfter(it, "p", resp.text)
      injectedNode.dataset[TRANSLATED_KEY] = "true"
    })
  })
})

function getTextNodes(el: Node) {
  var n: Node,
    a: Node[] = [],
    walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null)
  while ((n = walk.nextNode())) {
    if (n.textContent?.trim() !== "") {
      a.push(n)
    }
  }
  return a
}

function getTranslatableElement(el: HTMLElement): HTMLElement | null {
  const tags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "li"]
  const element = tags.reduce<HTMLElement | null>((acc, tag) => {
    if (acc) {
      return acc
    }
    return el.closest(tag)
  }, null)
  return element
}

function getLeafNodes(
  nodes: HTMLElement[] | NodeListOf<ChildNode>,
  result = []
): HTMLElement[] {
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
