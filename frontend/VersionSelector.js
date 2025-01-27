import React from 'react';

function VersionSelector({ version, setVersion }) {
    return (
        <div>
            <label>Select Spigot Version:</label>
            <select value={version} onChange={(e) => setVersion(e.target.value)}>
                <option value="1.20">1.20</option>
                <option value="1.19">1.19</option>
                <option value="1.18">1.18</option>
            </select>
        </div>
    );
}

export default VersionSelector;
