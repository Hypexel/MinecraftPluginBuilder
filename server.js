const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
app.use(bodyParser.json());

app.post("/build", (req, res) => {
  const { code, pluginName, version } = req.body;

  const projectPath = path.join(__dirname, "projects", pluginName);
  if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath, { recursive: true });

  const mainFile = path.join(projectPath, "Main.java");
  fs.writeFileSync(mainFile, code);

  const jarFile = path.join(__dirname, `${pluginName}.jar`);
  exec(`javac ${mainFile} && jar cf ${jarFile} -C ${projectPath} .`, (err) => {
    if (err) return res.status(500).send("Build failed.");
    res.download(jarFile);
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
