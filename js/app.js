chrome.storage.local.get(['updated', 'UILanguage'], ({ updated, UILanguage }) => {
    addScript('var __ = ' + JSON.stringify(UILanguage))
    
    let localUpdated = localStorage['local-updated'] || 0
    if (+updated > +localUpdated) {
        chrome.storage.local.get(['translation'], ({ translation }) => {
            localStorage['lscache-tradeitems'] = JSON.stringify(translation.items.result)
            localStorage['lscache-tradestats'] = JSON.stringify(translation.stats.result)
            localStorage['lscache-tradedata'] = JSON.stringify(translation.static.result)
        })
        localStorage.removeItem('lscache-tradeitems-cacheexpiration')
        localStorage.removeItem('lscache-tradestats-cacheexpiration')
        localStorage.removeItem('lscache-tradedata-cacheexpiration')
        localStorage['local-updated'] = +new Date()
        translation = null
    }
})

let addScript = (scriptString) => {
    let script = document.createElement('script')
    script.innerText = scriptString
    document.head.appendChild(script);
}