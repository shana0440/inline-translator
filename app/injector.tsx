import { INJECTED_KEY } from "./constant"

export function injectInside(node: HTMLElement, text: string) {
  const newNode = document.createElement("span")
  newNode.style.display = "block"
  newNode.style.color = "rgb(21 128 61)"
  newNode.innerText = text
  newNode.dataset[INJECTED_KEY] = "true"
  node.appendChild(newNode)
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
