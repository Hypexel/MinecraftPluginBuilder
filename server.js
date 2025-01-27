const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// Temporary folder for projects
const TEMP_DIR = "./projects";
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

app.post("/build", (req, res) => {
  const { projectName } = req.body;
  const projectPath = path.join(TEMP_DIR, projectName);
  const jarFilePath = path.join(TEMP_DIR, `${projectName}.jar`);

  if (!fs.existsSync(projectPath)) {
    return res.status(400).send("Project not found.");
  }

  exec(`javac -d ${projectPath} $(find ${projectPath} -name "*.java") && jar cf ${jarFilePath} -C ${projectPath} .`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to build the plugin.");
    }
    res.download(jarFilePath, `${projectName}.jar`, () => {
      fs.unlinkSync(jarFilePath);
    });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
