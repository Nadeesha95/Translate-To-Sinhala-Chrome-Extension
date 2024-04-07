document.addEventListener('DOMContentLoaded', function() {

  const checkbox = document.getElementById('btn');


  const storedCheckboxState = localStorage.getItem('checkboxState');


  if (storedCheckboxState && storedCheckboxState === 'checked') {
    checkbox.checked = true;

    localStorage.setItem('checkboxState', 'checked');

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {enableColorDetection: true});
    });
    
  }


  checkbox.addEventListener('change', function() {
    if (this.checked) {
      localStorage.setItem('checkboxState', 'checked');

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {enableColorDetection: true});
      });
    } else {
      localStorage.removeItem('checkboxState');

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {disableColorDetection: true});
      });
    }
  });


});