import { INJECTED_KEY } from "./constant"

export function injectAfter(
  node: HTMLElement,
  tagName: keyof HTMLElementTagNameMap,
  text: string
) {
  const newNode = document.createElement(tagName)
  newNode.style.color = "rgb(21 128 61)"
  newNode.innerText = text
  newNode.dataset[INJECTED_KEY] = "true"
  node.parentNode.insertBefore(newNode, node.nextSibling)
  return newNode
}

export function removeInjectedElements(node: HTMLElement) {
  const elements = node.parentNode?.querySelectorAll(
    `[data-${INJECTED_KEY}="true"]`
  )
  elements?.forEach((element) => {
    element.remove()
  })
}
