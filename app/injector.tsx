export function injectAfter(
  node: HTMLElement,
  tagName: keyof HTMLElementTagNameMap,
  text: string
) {
  const newNode = document.createElement(tagName)
  newNode.style.color = "rgb(21 128 61)"
  newNode.innerText = text
  node.parentNode.insertBefore(newNode, node.nextSibling)
  return newNode
}
