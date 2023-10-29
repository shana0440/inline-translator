export interface HotKey {
  altKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
  metaKey: boolean
  code?: string
}

export function hotKeyToText(hotKey: HotKey): string {
  try {
    const keyParts = []
    if (hotKey.ctrlKey) {
      keyParts.push("Ctrl")
    }
    if (hotKey.altKey) {
      keyParts.push("Alt")
    }
    if (hotKey.shiftKey) {
      keyParts.push("Shift")
    }
    if (hotKey.metaKey) {
      keyParts.push("⌘")
    }
    if (hotKey.code) {
      keyParts.push(hotKey.code.replace("Key", ""))
    }
    return keyParts.join("+")
  } catch (e) {
    return ""
  }
}

export function isValidHotKey(hotKey: any): hotKey is HotKey {
  try {
    if (!hotKey.code) {
      return false
    }
    return hotKey.altKey || hotKey.ctrlKey || hotKey.shiftKey || hotKey.metaKey
  } catch (e) {
    return false
  }
}

export function isMatchHotKey(hotKey: HotKey, e: KeyboardEvent): boolean {
  return (
    hotKey.altKey === e.altKey &&
    hotKey.ctrlKey === e.ctrlKey &&
    hotKey.shiftKey === e.shiftKey &&
    hotKey.metaKey === e.metaKey &&
    hotKey.code === e.code
  )
}
