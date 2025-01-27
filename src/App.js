import React, { useState } from "react";

function App() {
  const [pluginName, setPluginName] = useState("");
  const [version, setVersion] = useState("1.20");
  const [code, setCode] = useState("// Write your Minecraft plugin code here...");

  const handleBuild = () => {
    fetch("http://localhost:3000/build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pluginName, version, code }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${pluginName}.jar`;
        link.click();
      })
      .catch(() => alert("Build failed."));
  };

  return (
    <div>
      <h1>Minecraft Plugin Builder</h1>
      <input
        type="text"
        placeholder="Plugin Name"
        value={pluginName}
        onChange={(e) => setPluginName(e.target.value)}
      />
      <select value={version} onChange={(e) => setVersion(e.target.value)}>
        <option value="1.20">1.20</option>
        <option value="1.19">1.19</option>
      </select>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <button onClick={handleBuild}>Build Plugin</button>
    </div>
  );
}

export default App;
