
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.enableColorDetection) {
    
    document.addEventListener('mouseup', translate);

  } else if (message.disableColorDetection) {
   
    document.removeEventListener('mouseup', translate);

  }
});

function translate(event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    const sourceLanguage = 'en'; 
    const targetLanguage = 'si'; 

    const translationAPI = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      selectedText
    )}&langpair=${sourceLanguage}|${targetLanguage}`;

    fetch(translationAPI)
      .then(response => response.json())
      .then(data => {
        const translatedText = data.responseData.translatedText;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'translation-tooltip';
        
        if(translatedText=='QUERY LENGTH LIMIT EXCEEDED. MAX ALLOWED QUERY : 500 CHARS'){
          
          tooltip.textContent = 'MAX ALLOWED: 500 CHARS'
          tooltip.style.color = 'red';
        } else {
          tooltip.textContent = translatedText;
          tooltip.style.color = 'black';
        }

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        tooltip.style.position = 'absolute';
        tooltip.style.top = `${rect.bottom + window.scrollY}px`;
        tooltip.style.left = `${(rect.left + rect.right) / 2 + window.scrollX}px`;
        tooltip.style.backgroundColor = 'yellow';
        tooltip.style.padding = '5px';
        tooltip.style.borderRadius = '3px';
        tooltip.style.border = '1px solid #ccc';
       

        document.body.appendChild(tooltip);

        setTimeout(() => {
          document.body.removeChild(tooltip);
        }, 7000);

      })
      // .catch(error => {
      //   alert('Something went wrong,Please try again later:', error);
      // });
  }
};

//developed by Nadeesha weerasekara 



