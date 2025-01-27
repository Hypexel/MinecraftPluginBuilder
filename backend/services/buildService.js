const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const buildPlugin = async (config, sourceCode) => {
    const buildPath = path.join(__dirname, '../../build');
    const srcPath = path.join(buildPath, 'src');
    const pluginYml = `
name: ${config.name}
version: ${config.version}
main: ${config.mainClass}
api-version: ${config.apiVersion}
    `;

    fs.mkdirSync(srcPath, { recursive: true });
    fs.writeFileSync(path.join(buildPath, 'plugin.yml'), pluginYml);
    fs.writeFileSync(path.join(srcPath, 'Main.java'), sourceCode);

    const command = `javac -d ${buildPath} ${srcPath}/Main.java && jar -cvf ${buildPath}/${config.name}.jar -C ${buildPath} .`;
    exec(command, (err) => {
        if (err) {
            throw new Error(`Build failed: ${err.message}`);
        }
    });

    return path.join(buildPath, `${config.name}.jar`);
};

module.exports = { buildPlugin };
