document.getElementById('build-plugin').addEventListener('click', async () => {
    const config = {
        name: document.getElementById('plugin-name').value,
        mainClass: document.getElementById('main-class').value,
        version: document.getElementById('plugin-version').value,
        apiVersion: document.getElementById('api-version').value,
    };
    const sourceCode = document.getElementById('source-code').value;

    const response = await fetch('/api/plugin/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, sourceCode }),
    });

    if (response.ok) {
        const { jarPath } = await response.json();
        alert(`Plugin built successfully! Download: ${jarPath}`);
    } else {
        alert('Failed to build the plugin. Check your configuration.');
    }
});

document.getElementById('add-dependency').addEventListener('click', () => {
    const dependency = document.getElementById('dependency').value;
    if (dependency) {
        const list = document.getElementById('dependency-list');
        const listItem = document.createElement('li');
        listItem.textContent = dependency;
        list.appendChild(listItem);
        document.getElementById('dependency').value = '';
    }
});
