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
  const labels = translations[language || 'en'];  // Default to English if language is not set
  let index = 0;

  function executeNextClick() {
    if (index >= labels.length) {
      console.log("All steps completed.");
      return;
    }

    const label = labels[index];
    const button = Array.from(document.querySelectorAll("material-button, span.menu-item-label")).find(el => el.textContent.includes(label));

    if (button) {
      button.click();
      console.log(`Clicked on '${label}'.`);
      index++; // Move to the next button
      setTimeout(executeNextClick, 500); // Adjust timing based on site logic
    } else {
      console.log(`Button with label '${label}' not found, stopping...`);
    }
  }

  executeNextClick();
}

chrome.storage.local.get(['selectedLanguage'], function(result) {
  attemptDesignSwitch(result.selectedLanguage);
});
