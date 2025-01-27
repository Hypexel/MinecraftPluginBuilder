import React, { useState } from 'react';
import VersionSelector from './components/VersionSelector';
import CodeEditor from './components/CodeEditor';
import DependencyManager from './components/DependencyManager';
import PluginConfigForm from './components/PluginConfigForm';
import './styles.css';

function App() {
    const [version, setVersion] = useState('');
    const [sourceCode, setSourceCode] = useState('');
    const [dependencies, setDependencies] = useState([]);
    const [config, setConfig] = useState({ name: '', mainClass: '', version: '', apiVersion: '' });

    const buildPlugin = async () => {
        const response = await fetch('http://localhost:5000/api/plugin/build', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ config, sourceCode, dependencies }),
        });
        const data = await response.json();
        alert(`Plugin built! Download your JAR file: ${data.jarPath}`);
    };

    return (
        <div className="app">
            <h1>Spigot Plugin Builder</h1>
            <VersionSelector version={version} setVersion={setVersion} />
            <PluginConfigForm config={config} setConfig={setConfig} />
            <DependencyManager dependencies={dependencies} setDependencies={setDependencies} />
            <CodeEditor sourceCode={sourceCode} setSourceCode={setSourceCode} />
            <button onClick={buildPlugin}>Build Plugin</button>
        </div>
    );
}

export default App;
