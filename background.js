chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // Verifica che la pagina sia completamente caricata e che l'URL sia definito
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("https://ads.google.com/aw/")) {
    chrome.storage.local.get(['autoSwitchEnabled'], function(result) {
      if (result.autoSwitchEnabled) {
        // Esegui lo script di controllo automatico inserendo il codice direttamente
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: ['auto_switch.js']
        });
      }
    });
  }
});
