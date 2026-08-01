// @vitest-environment jsdom
import { beforeEach, expect, test, vi } from "vitest"

import { EVENT_TRANSLATE } from "./app/constant"

vi.mock("@plasmohq/storage", () => ({
  Storage: class {}
}))

let onMessage: Parameters<typeof chrome.runtime.onMessage.addListener>[0]

beforeEach(async () => {
  vi.resetModules()
  document.body.innerHTML = "<p>Hello</p>"

  globalThis.chrome = {
    runtime: {
      onMessage: {
        addListener: vi.fn((listener: typeof onMessage) => {
          onMessage = listener
        })
      },
      sendMessage: vi.fn(
        (_message: unknown, respond: (response: { text: string }) => void) => {
          respond({ text: "Hola" })
        }
      )
    }
  } as unknown as typeof chrome

  await import("./content")
})

test("inserts translation without adding a layout sibling", () => {
  onMessage(
    { event: EVENT_TRANSLATE, language: "es" },
    {} as chrome.runtime.MessageSender,
    vi.fn()
  )

  const translation = document.querySelector(
    'p > [data-injected="true"]'
  ) as HTMLElement
  expect(translation).not.toBeNull()
  expect(translation.tagName).toBe("SPAN")
  expect(translation.style.display).toBe("block")
  expect(document.querySelector('body > [data-injected="true"]')).toBeNull()
})

test("triggering translation again removes the translation", () => {
  onMessage(
    { event: EVENT_TRANSLATE, language: "es" },
    {} as chrome.runtime.MessageSender,
    vi.fn()
  )
  expect(document.querySelector('[data-injected="true"]')).not.toBeNull()

  onMessage(
    { event: EVENT_TRANSLATE, language: "es" },
    {} as chrome.runtime.MessageSender,
    vi.fn()
  )
  expect(document.querySelector('[data-injected="true"]')).toBeNull()
})
