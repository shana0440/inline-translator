interface GoogleTranslateResponse {
  sentences: { trans: string; orig: string; backend: number }[]
  src: string
  confidence: number
  spell: {}
  ld_result: {
    srclangs: string[]
    srclangs_confidences: number[]
    extended_srclangs: string[]
  }
}

export async function translate(
  text: string,
  options: {
    from: string
    to: string
  } = {
    from: "auto",
    to: "zh-TW"
  }
): Promise<string> {
  const { from, to } = options
  const plainText = encodeURI(text)
  const url = `https://translate.google.com/translate_a/single?client=gtx&dt=t&dt=bd&dj=1&source=input&q=${plainText}&sl=${from}&tl=${to}`
  return fetch(url)
    .then((resp) => resp.json())
    .then((resp: GoogleTranslateResponse) => {
      return resp.sentences.map((it) => it.trans).join("")
    })
}
