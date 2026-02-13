const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const PDF_PATH = path.join(__dirname, 'program.pdf');
const PDF_FALLBACK = path.join(__dirname, '..', 'program.pdf');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

function getPdfPath() {
  if (fs.existsSync(PDF_PATH)) return PDF_PATH;
  if (fs.existsSync(PDF_FALLBACK)) return PDF_FALLBACK;
  return null;
}

app.get('/pdf', (req, res) => {
  const pdfPath = getPdfPath();
  if (!pdfPath) {
    return res.status(404).send('PDF not found. Place program.pdf in this folder or in Documents.');
  }
  res.sendFile(pdfPath);
});

function startServer(port) {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`PDF viewer running at http://localhost:${port}`);
    if (!getPdfPath()) {
      console.log('Warning: program.pdf not found. Copy it into this folder or into Documents.');
    }
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      throw err;
    }
  });
}

startServer(process.env.PORT ? parseInt(process.env.PORT, 10) : 3000);
