const express = require('express');
const multer = require('multer');
const path = require('path');
const PDFParser = require('pdf-parse');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve HTML form to upload a PDF file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// Handle file upload
// Handle file upload
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const pdfBuffer = req.file.buffer;

    // Convert buffer to string using pdf-parse
    const { text: pdfContent } = await PDFParser(pdfBuffer);

    console.log(pdfContent);

    // Send PDF content to the Flask backend
    const flaskEndpoint = 'http://127.0.0.1:5000/receive-message'; // Replace with your actual Flask backend URL
    const response = await axios.post(flaskEndpoint, { message: pdfContent });

    console.log(response.data);

    // Make sure to include the generated_output property in the response
    return res.json({ status: 'PDF content sent to Flask backend successfully', generated_output: response.data.generated_message });

  } catch (error) {
    console.error(error);
    return res.status(500).send('Error parsing PDF or sending data to Flask backend.');
  }
});



// Start the server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:${PORT}");
});