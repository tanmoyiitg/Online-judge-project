const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, "output");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const runJavaScript = async (filePath, inputPath) => {
    return new Promise((resolve, reject) => {
        const inputContent = fs.readFileSync(inputPath, 'utf8');
        const command = `node ${filePath}`;

        const childProcess = exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ type: 'runtime', message: error.message });
            } else if (stderr) {
                reject({ type: 'runtime', message: stderr });
            } else {
                resolve(stdout);
            }
        });

        const timeoutId = setTimeout(() => {
            childProcess.kill(); // Kill the child process
            reject({ type: 'runtime', message: 'Time Limit Exceeded' });
        }, 2000);

        childProcess.stdin.write(inputContent);
        childProcess.stdin.end();

        childProcess.on('exit', () => {
            clearTimeout(timeoutId);
        });
    });
};

const executeJS = async (filePath, inputPath) => {
    try {
        const output = await runJavaScript(filePath, inputPath);
        console.log('Execution output:', output);
        const response = {
            message: "Successful Submission",
            output: output
        };
        return response;
    } catch (error) {
        if (error.type === 'runtime') {
            console.error('Runtime Error:', error.message);
            const response = {
                message: 'Runtime error',
                output: error.message
            };
            return response;
        } else {
            console.error('Unknown Error:', error.message);
            const response = {
                message: 'Unknown error',
                output: error.message
            };
            return response;
        }
    } finally {
        // Cleanup files
        if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        
    }
};

module.exports = executeJS;
