document.addEventListener('DOMContentLoaded', function() {
    const switchButton = document.getElementById('switchButton');
    const autoSwitch = document.getElementById('autoSwitch');
    const languageSelect = document.getElementById('languageSelect');

    // Carica lo stato dell'automazione e la lingua salvata
    chrome.storage.local.get(['autoSwitchEnabled', 'selectedLanguage'], function(result) {
        autoSwitch.checked = result.autoSwitchEnabled || false;
        if (result.selectedLanguage) {
            languageSelect.value = result.selectedLanguage;
        }
    });

    switchButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['content_script.js']
            });
        });
    });

    autoSwitch.addEventListener('change', function() {
        chrome.storage.local.set({autoSwitchEnabled: autoSwitch.checked});
    });

    languageSelect.addEventListener('change', function() {
        chrome.storage.local.set({selectedLanguage: languageSelect.value});
    });
});
