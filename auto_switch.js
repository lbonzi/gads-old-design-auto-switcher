var translations = {
  "it": ["Aspetto", "Utilizza il design precedente per questa sessione", "Invia e vai al design precedente", "Cambia visualizzazione"],
  "pt-pt": ["Aspeto", "Usar design anterior para esta sessão", "Enviar e ir para o design anterior", "Alterar vista"],
  "pt-br": ["Aparência", "Use o design anterior nesta sessão", "Enviar e voltar para o design anterior", "Mudar visualização"],
  "es": ["Diseño", "Usar diseño anterior para esta sesión", "Enviar e ir al diseño anterior", "Cambiar vista"],
  "de": ["Darstellung", "Bisheriges Design für diese Sitzung verwenden", "Senden und zum vorherigen Design wechseln", "Ansicht ändern"],
  "fr": ["Apparence", "Utiliser l'ancienne interface pour cette session", "Envoyer et rétablir l'ancienne interface", "Changer d'affichage"],
  "nl": ["Weergave", "Vorig ontwerp voor deze sessie gebruiken", "Sturen en naar vorig ontwerp gaan", "Weergave wijzigen"],
  "en": ["Appearance", "Use previous design for this session", "Send and go to previous design", "Change view"]
};

function attemptDesignSwitch(language) {
  if (!language) {
    console.log("Language not detected or not selected. Stopping execution.");
    return; // Stop if language is not determined or not selected
  }

  const labels = translations[language];
  let index = 0;
  let retries = 0;
  const maxRetries = 10;

  function executeNextClick() {
    if (index >= labels.length || retries >= maxRetries) {
      console.log("Process completed or max retries hit.");
      return;
    }

    const label = labels[index];
    const button = Array.from(document.querySelectorAll("material-button, span.menu-item-label")).find(el => el.textContent.includes(label));

    if (button) {
      button.click();
      console.log(`Clicked on '${label}'.`);
      index++; // Move to the next button
      retries = 0; // Reset retries on successful click
    } else {
      console.log(`Button with label '${label}' not found, retrying...`);
      retries++;
    }
    setTimeout(executeNextClick, 1000);
  }

  executeNextClick();
}

chrome.storage.local.get(['autoSwitchEnabled', 'selectedLanguage'], function(result) {
  if (result.autoSwitchEnabled) {
    const adminPanel = document.querySelector("#navigation\\.admin");
    if (adminPanel) {
      const language = result.selectedLanguage || 'en';  // Use the selected language or default to English
      attemptDesignSwitch(language);
    }
  }
});