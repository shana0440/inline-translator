import "./style.css"

function IndexPopup() {
  return (
    <div className="flex flex-col p-[16px]">
      <h2>Inline Translator</h2>
      <button
        className="rounded-md bg-sky-600 text-white"
        onClick={() => {
          chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {})
            }
          )
        }}>
        translate
      </button>
    </div>
  )
}

export default IndexPopup
