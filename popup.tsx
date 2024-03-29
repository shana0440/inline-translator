import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { HOT_KEYS, LANGUAGE } from "~app/constant"

import "./style.css"

import { type HotKey, hotKeyToText, isValidHotKey } from "~app/hot_keys"

// refs: https://cloud.google.com/translate/docs/languages
const supportLanguage = {
  Afrikaans: "af",
  Albanian: "sq",
  Amharic: "am",
  Arabic: "ar",
  Armenian: "hy",
  Assamese: "as",
  Aymara: "ay",
  Azerbaijani: "az",
  Bambara: "bm",
  Basque: "eu",
  Belarusian: "be",
  Bengali: "bn",
  Bhojpuri: "bho",
  Bosnian: "bs",
  Bulgarian: "bg",
  Catalan: "ca",
  Cebuano: "ceb",
  "Chinese (Simplified)": "zh-CN",
  "Chinese (Traditional)": "zh-TW",
  Corsican: "co",
  Croatian: "hr",
  Czech: "cs",
  Danish: "da",
  Dhivehi: "dv",
  Dogri: "doi",
  Dutch: "nl",
  English: "en",
  Esperanto: "eo",
  Estonian: "et",
  Ewe: "ee",
  "Filipino (Tagalog)": "fil",
  Finnish: "fi",
  French: "fr",
  Frisian: "fy",
  Galician: "gl",
  Georgian: "ka",
  German: "de",
  Greek: "el",
  Guarani: "gn",
  Gujarati: "gu",
  "Haitian Creole": "ht",
  Hausa: "ha",
  Hawaiian: "haw",
  Hebrew: "he or iw",
  Hindi: "hi",
  Hmong: "hmn",
  Hungarian: "hu",
  Icelandic: "is",
  Igbo: "ig",
  Ilocano: "ilo",
  Indonesian: "id",
  Irish: "ga",
  Italian: "it",
  Japanese: "ja",
  Javanese: "jv or jw",
  Kannada: "kn",
  Kazakh: "kk",
  Khmer: "km",
  Kinyarwanda: "rw",
  Konkani: "gom",
  Korean: "ko",
  Krio: "kri",
  Kurdish: "ku",
  "Kurdish (Sorani)": "ckb",
  Kyrgyz: "ky",
  Lao: "lo",
  Latin: "la",
  Latvian: "lv",
  Lingala: "ln",
  Lithuanian: "lt",
  Luganda: "lg",
  Luxembourgish: "lb",
  Macedonian: "mk",
  Maithili: "mai",
  Malagasy: "mg",
  Malay: "ms",
  Malayalam: "ml",
  Maltese: "mt",
  Maori: "mi",
  Marathi: "mr",
  "Meiteilon (Manipuri)": "mni-Mtei",
  Mizo: "lus",
  Mongolian: "mn",
  "Myanmar (Burmese)": "my",
  Nepali: "ne",
  Norwegian: "no",
  "Nyanja (Chichewa)": "ny",
  "Odia (Oriya)": "or",
  Oromo: "om",
  Pashto: "ps",
  Persian: "fa",
  Polish: "pl",
  "Portuguese (Portugal, Brazil)": "pt",
  Punjabi: "pa",
  Quechua: "qu",
  Romanian: "ro",
  Russian: "ru",
  Samoan: "sm",
  Sanskrit: "sa",
  "Scots Gaelic": "gd",
  Sepedi: "nso",
  Serbian: "sr",
  Sesotho: "st",
  Shona: "sn",
  Sindhi: "sd",
  "Sinhala (Sinhalese)": "si",
  Slovak: "sk",
  Slovenian: "sl",
  Somali: "so",
  Spanish: "es",
  Sundanese: "su",
  Swahili: "sw",
  Swedish: "sv",
  "Tagalog (Filipino)": "tl",
  Tajik: "tg",
  Tamil: "ta",
  Tatar: "tt",
  Telugu: "te",
  Thai: "th",
  Tigrinya: "ti",
  Tsonga: "ts",
  Turkish: "tr",
  Turkmen: "tk",
  "Twi (Akan)": "ak",
  Ukrainian: "uk",
  Urdu: "ur",
  Uyghur: "ug",
  Uzbek: "uz",
  Vietnamese: "vi",
  Welsh: "cy",
  Xhosa: "xh",
  Yiddish: "yi",
  Yoruba: "yo",
  Zulu: "zu"
}

function IndexPopup() {
  const [language, setLanguage] = useStorage<string>(LANGUAGE)
  const [persistHotKeys, setPersistHotKeys] = useStorage<HotKey>(HOT_KEYS)
  const [hotKeys, setHotKeys] = useState<HotKey>(persistHotKeys)

  const storeLanguage = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }, [])

  const recordHotKeys = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    setHotKeys({
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
      code: e.code.startsWith("Key") ? e.code : undefined
    })
    e.stopPropagation()
    e.preventDefault()
  }, [])

  const saveHotKeys = useCallback(() => {
    if (isValidHotKey(hotKeys)) {
      setPersistHotKeys(hotKeys)
    } else {
      setHotKeys(persistHotKeys)
    }
  }, [hotKeys])

  const closePopup = useCallback(() => {
    window.close()
  }, [])

  return (
    <div className="flex flex-col p-[16px] gap-2 w-64">
      <h2>Inline Translator Settings</h2>
      <label className="w-full">
        <span>Target language</span>
        <select
          className="h-7 border rounded w-full"
          onChange={storeLanguage}
          value={language}>
          {Object.entries(supportLanguage).map(([name, value]) => {
            return (
              <option key={value} value={value}>
                {name}
              </option>
            )
          })}
        </select>
      </label>
      <label className="w-full">
        <span>Hot keys</span>
        <input
          className="h-7 border rounded w-full px-2"
          onKeyDown={recordHotKeys}
          onKeyUp={saveHotKeys}
          value={hotKeyToText(hotKeys || persistHotKeys)}
        />
      </label>
      <button
        className="rounded bg-sky-600 text-white h-7"
        onClick={closePopup}>
        Close
      </button>
    </div>
  )
}

export default IndexPopup
