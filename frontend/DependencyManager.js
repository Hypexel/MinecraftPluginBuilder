import React, { useState } from 'react';

function DependencyManager({ dependencies, setDependencies }) {
    const [dependency, setDependency] = useState('');

    const addDependency = () => {
        setDependencies([...dependencies, dependency]);
        setDependency('');
    };

    return (
        <div>
            <h2>Dependencies</h2>
            <input
                value={dependency}
                onChange={(e) => setDependency(e.target.value)}
                placeholder="e.g., org.spigotmc:spigot-api:1.20.1-R0.1-SNAPSHOT"
            />
            <button onClick={addDependency}>Add Dependency</button>
            <ul>
                {dependencies.map((dep, index) => (
                    <li key={index}>{dep}</li>
                ))}
            </ul>
        </div>
    );
}

export default DependencyManager;
