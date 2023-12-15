document.addEventListener('DOMContentLoaded', function() {
    // Get file input element, file name span, upload button, and upload progress bar
const fileInput = document.getElementById('fileInput');
const fileNameSpan = document.getElementById('fileName');
const uploadButton = document.querySelector('.uploadButton.uploadButton-right');
const uploadProgress = document.getElementById('uploadProgress');

// Function to enable/disable the upload button
function toggleUploadButton(disabled) {
  uploadButton.disabled = disabled;
}

// Function to set upload button style
function setUploadButtonStyle(color) {
  uploadButton.style.backgroundColor = color;
}

// Add event listener to file input change
fileInput.addEventListener('change', function() {
  if (fileInput.files.length > 0) {
    fileNameSpan.textContent = fileInput.files[0].name; // Display file name
    toggleUploadButton(false); // Enable upload button
  } else {
    fileNameSpan.textContent = '';
   // Clear file name if no file selected
    toggleUploadButton(true); // Disable upload button
  }
});
document.querySelector('.submit-container input[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Perform any necessary tasks before redirection (if needed)
  
    // Redirect to the result page (replace 'result.html' with your actual result page)
    window.location.href = 'result.html';
  });

// Simulated file upload progress (for demonstration purposes)
document.getElementById('textForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const file = fileInput.files[0];
  if (file) {
    let progress = 0;
    const interval = setInterval(function() {
      if (progress < 100) {
        progress += 10; // Simulating file upload progress
        uploadProgress.value = progress;
      } else {
        clearInterval(interval);
        uploadProgress.classList.add('complete');
        setUploadButtonStyle('#3b6c5d'); // Change button color to darker green when upload is complete
        toggleUploadButton(true); // Enable upload button after upload completion
      }
    }, 1000); // Simulating progress update interval
  }
  document.querySelector('.submit-container input[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'result.html';
});
});
});