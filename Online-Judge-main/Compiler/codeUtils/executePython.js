const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const { exec } = require('child_process');

const outputPath = path.join(__dirname, "output");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const runPython = async (filePath, inputPath) => {
    return new Promise((resolve, reject) => {
        const pythonCommand = `python ${filePath} < ${inputPath}`;
        const childProcess = exec(pythonCommand, { cwd: outputPath }, (error, stdout, stderr) => {
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

        childProcess.on('exit', () => {
            clearTimeout(timeoutId);
        });
    });
};

const executePython = async (filePath, inputPath) => {
    try {
        // Run the Python code with an input file if needed
        const output = await runPython(filePath, inputPath);
        console.log('Execution output:', output);
        const response = {
            message: "Successful Submission",
            output: output
        };
        return response;
    } catch (error) {
        console.error('Runtime Error:', error.message);
        const response = {
            message: 'Runtime error',
            output: error.message
        };
        return response;
    } finally {
        // Cleanup files
        if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        
    }
};

module.exports = executePython;
