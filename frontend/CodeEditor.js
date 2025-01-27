import React from 'react';

function CodeEditor({ sourceCode, setSourceCode }) {
    return (
        <div>
            <h2>Code Editor</h2>
            <textarea
                rows="15"
                cols="50"
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Write your plugin code here..."
            />
        </div>
    );
}

export default CodeEditor;
