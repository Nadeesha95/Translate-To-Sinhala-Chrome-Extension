
document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('btn'); // Assuming your toggle button's ID is 'btn'
    const hoverBox = document.getElementById('hoverBox');
  
  
    function toggleBox() {
      if (toggleSwitch.checked) {
    
        hoverBox.style.display = 'block';
        localStorage.setItem('popupOpen', 'true');
  
        
      } else {

        localStorage.removeItem('popupOpen');

  
      }
    }
  
    toggleSwitch.addEventListener('change', toggleBox);
  
    const icon = document.createElement('span');
    icon.style.cursor = 'pointer';
    icon.addEventListener('click', function() {
      toggleSwitch.checked = !toggleSwitch.checked;
      toggleBox();
    });
  
    document.body.appendChild(icon);
  
    // Check if the popup was open previously
    const popupOpen = localStorage.getItem('popupOpen');
    if (popupOpen === 'true') {
      toggleSwitch.checked = true;
      toggleBox();
    }
  });



  