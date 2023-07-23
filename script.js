document.addEventListener("DOMContentLoaded", function () {
    const keys = document.querySelectorAll(".key");
    const spaceKey = document.getElementById("space");
    const editKey = document.getElementById("edit");
    const clearKey = document.getElementById("clear");
    const textDisplay = document.getElementById("text-display");
  
    let isEditMode = false;
    let disabledKeys = new Set();
    let redKeys = new Set(); // New set to store the keys that were previously red
    let typedText = "";
  
    function updateTextDisplay() {
      textDisplay.textContent = typedText;
    }
  
    function handleKeyClick(event) {
      const key = event.target;
      const keyLetter = key.dataset.key;
    
      if (isEditMode) {
        if (key.classList.contains("disabled")) {
          // Re-enable the key in edit mode
          key.classList.remove("disabled");
          key.style.backgroundColor = `var(--edit-key-color)`;
          disabledKeys.delete(keyLetter);
          redKeys.delete(keyLetter); // Also remove from redKeys set if it was there
        } else {
          // Disable the key in edit mode
          key.classList.add("disabled");
          key.style.backgroundColor = `var(--disabled-key-color)`;
          disabledKeys.add(keyLetter);
          redKeys.delete(keyLetter); // Remove from redKeys set if it was there
        }
      } else {
        typedText += keyLetter;
        updateTextDisplay();
      }
    }
    
  
    function handleSpaceClick() {
      if (!isEditMode) {
        typedText += " ";
        updateTextDisplay();
      }
    }
    
    function handleEditClick() {
      if (isEditMode) {
        // Exiting edit mode
        keys.forEach((key) => {
          const keyLetter = key.dataset.key;
          key.style.backgroundColor = `var(--normal-key-color)`; // Turn all keys back to grey
          if (disabledKeys.has(keyLetter)) {
            key.classList.add("disabled");
            key.classList.remove("red");
          } else {
            key.classList.add("enabled");
            key.classList.remove("red");
          }
        });
        editKey.textContent = "Edit";
      } else {
        // Entering edit mode
        keys.forEach((key) => {
          const keyLetter = key.dataset.key;
          if (disabledKeys.has(keyLetter)) {
            key.style.backgroundColor = `var(--disabled-key-color)`; // Set disabled keys to red
            key.classList.add("disabled");
          } else {
            key.style.backgroundColor = `var(--edit-key-color)`; // Set enabled keys to green
            key.classList.add("enabled");
          }
        });
        editKey.textContent = "Exit Edit";
      }
    
      // Toggle the edit-mode variable
      isEditMode = !isEditMode;
      updateDisabledKeyVisibility();
    }
    
    
    
  
    function updateDisabledKeyVisibility() {
      // Add or remove the "edit-mode" class to the body based on the isEditMode variable
      if (isEditMode) {
        document.body.classList.add("edit-mode");
      } else {
        document.body.classList.remove("edit-mode");
      }
    }
  
    function handleClearClick() {
      typedText = "";
      updateTextDisplay();
    }
  
    keys.forEach((key) => key.addEventListener("click", handleKeyClick));
    spaceKey.addEventListener("click", handleSpaceClick);
    editKey.addEventListener("click", handleEditClick);
    clearKey.addEventListener("click", handleClearClick);
  });
  