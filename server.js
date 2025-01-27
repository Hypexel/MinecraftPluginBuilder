const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Directory for temporary files
const TEMP_DIR = './projects';
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

// Create new project
app.post('/new-project', (req, res) => {
  const { projectName } = req.body;
  const projectPath = path.join(TEMP_DIR, projectName);
  if (fs.existsSync(projectPath)) {
    return res.status(400).send('Project already exists.');
  }
  fs.mkdirSync(projectPath, { recursive: true });
  res.status(200).send('Project created successfully.');
});

// Add class file
app.post('/add-class', (req, res) => {
  const { projectName, packageName, className, code } = req.body;
  const packagePath = path.join(TEMP_DIR, projectName, ...packageName.split('.'));
  if (!fs.existsSync(packagePath)) fs.mkdirSync(packagePath, { recursive: true });

  const classFilePath = path.join(packagePath, `${className}.java`);
  fs.writeFileSync(classFilePath, code);
  res.status(200).send('Class created successfully.');
});

// Build plugin as a .jar file
app.post('/build', (req, res) => {
  const { projectName } = req.body;
  const projectPath = path.join(TEMP_DIR, projectName);
  const jarFilePath = path.join(TEMP_DIR, `${projectName}.jar`);

  // Ensure project exists
  if (!fs.existsSync(projectPath)) {
    return res.status(400).send('Project not found.');
  }

  // Compile Java files and build the .jar file
  exec(`javac -d ${projectPath} $(find ${projectPath} -name "*.java") && jar cf ${jarFilePath} -C ${projectPath} .`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to build the plugin.');
    }
    res.download(jarFilePath, `${projectName}.jar`, () => {
      fs.unlinkSync(jarFilePath); // Clean up after download
    });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
