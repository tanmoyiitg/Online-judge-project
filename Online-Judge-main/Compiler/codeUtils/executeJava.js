const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const outputPath = path.join(__dirname, 'output');
const { exec } = require('child_process');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const compileJava = async (filePath) => {
    const fileID = path.basename(filePath).split('.')[0];
    const outputDir = path.join(outputPath, fileID);

    return new Promise((resolve, reject) => {
        exec(`javac ${filePath} -d ${outputDir}`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject({ type: 'compilation', message: error ? error.message : stderr });
            } else {
                resolve(outputDir);
            }
        });
    });
};

const runJava = async (outputDir, inputPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(outputDir, (err, files) => {
            if (err) {
                reject({ type: 'runtime', message: 'Error reading output directory' });
                return;
            }
            const classFile = files.find(file => file.endsWith('.class'));
            if (!classFile) {
                reject({ type: 'runtime', message: 'No class file found in output directory' });
                return;
            }
            const className = path.basename(classFile, '.class');
            const javaCommand = `java -cp ${outputDir} ${className}`;
            const childProcess = exec(`${javaCommand} < ${inputPath}`, { cwd: outputDir }, (error, stdout, stderr) => {
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
    });
};

const executeJava = async (filePath, inputPath) => {
    try {
        const outputDir = await compileJava(filePath);
        console.log('Compilation successful.');

        // Optionally, run the Java program if you need to execute it with an input file
        const output = await runJava(outputDir, inputPath);
        console.log('Execution output:', output);
        const response = {
            message: 'Successful Submission',
            output: output,
        };
        fs.unlinkSync(outputDir)
        return response;
    } catch (error) {
        if (error.type === 'compilation') {
            console.error('Compilation Error:', error.message);
            const response = {
                message: 'Compilation error',
                output: error.message,
            };
            return response;
        } else if (error.type === 'runtime') {
            console.error('Runtime Error:', error.message);
            const response = {
                message: 'Runtime error',
                output: error.message,
            };
            return response;
        } else {
            console.error('Unknown Error:', error.message);
            const response = {
                message: 'Unknown error',
                output: error.message,
            };
            return response;
        }
    } finally {
        // Cleanup files
        if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        
    }
};

module.exports = executeJava;
