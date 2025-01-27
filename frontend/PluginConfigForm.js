import React from 'react';

function PluginConfigForm({ config, setConfig }) {
    const handleChange = (e) => setConfig({ ...config, [e.target.name]: e.target.value });

    return (
        <div>
            <h2>Plugin Configuration</h2>
            <input name="name" placeholder="Plugin Name" value={config.name} onChange={handleChange} />
            <input name="mainClass" placeholder="Main Class" value={config.mainClass} onChange={handleChange} />
            <input name="version" placeholder="Version" value={config.version} onChange={handleChange} />
            <input name="apiVersion" placeholder="API Version" value={config.apiVersion} onChange={handleChange} />
        </div>
    );
}

export default PluginConfigForm;
