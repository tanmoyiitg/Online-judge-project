const generateFile = require('../codeUtils/generateFile.js')
const generateInputFile = require('../codeUtils/generateInputFile.js')
const executeCpp = require('../codeUtils/executeCpp.js')
const executeJS = require('../codeUtils/executeJs.js')
const executeJava = require('../codeUtils/executeJava.js')
const executePython = require('../codeUtils/executePython.js')
const fs=require('fs')

const runCode = async (language, filePath, inputPath) => {
    let output;
    switch (language) {
        case 'C++':
            output = await executeCpp(filePath, inputPath);
            break;
        case 'Javascript':
            output = await executeJS(filePath, inputPath);
            break;
        case 'Java':
            output = await executeJava(filePath, inputPath);
            break;
        case 'Python':
            output = await executePython(filePath, inputPath);
            break;
        default:
            throw new Error(`Unsupported language: ${language}`);
    }
    return output;
};

const RunCodeFile = async (req, res) => {
    const { language = 'C++', code, Input } = req.body;
    // Input validation
    if (code === undefined) {
        return res.status(400).json({
            message: 'Empty code',
            success: false
        });
    }

    try {
        const filePath = await generateFile(code, language);
        const inputPath = await generateInputFile(Input);
        const output = await runCode(language, filePath, inputPath);
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
        return res.status(200).json({ output });
    } catch (error) {
        console.error('Error in RunCodeFile:', error);
        return res.status(500).json({
            message: `Error: ${error.message}`,
            success: false
        });
    }
};

const normalizeNewlines = (str) => str.replace(/\r\n/g, '\n').trim();

const executeCode = async (language, filePath, inputPath) => {
    switch (language) {
        case 'C++':
            return await executeCpp(filePath, inputPath);
        case 'Javascript':
            return await executeJS(filePath, inputPath);
        case 'Java':
            return await executeJava(filePath, inputPath);
        case 'Python':
            return await executePython(filePath, inputPath);
        default:
            throw new Error(`Unsupported language: ${language}`);
    }
};

const SubmitCodeFile = async (req, res) => {
    const { language = 'C++', code, testcase } = req.body;

    // Input validation
    if (code === undefined) {
        return res.status(400).json({
            message: 'Empty code',
            success: false
        });
    }

    try {
        const filePath = await generateFile(code, language);
        const result = [];

        for (let i = 0; i < testcase.length; i++) {
            const inputPath = await generateInputFile(testcase[i].Input);
            const output = await executeCode(language, filePath, inputPath);

            if (output.output === 'Time Limit Exceeded') {
                const response = `Time Limit Exceeded at testcase ${i + 1}`;
                timeLimitExceeded = true;
                result.push(response);
                break;
            }

            else if (output.message !== 'Successful Submission') {
                const response = `${output.message} at testcase ${i + 1}`;
                result.push(response);
                break;
            }

            else {
                const expectedOutput = normalizeNewlines(testcase[i].Expected_Output);
                const actualOutput = normalizeNewlines(output.output);

                if (actualOutput === expectedOutput) {
                    const response = `Accepted Testcase ${i + 1}`;
                    result.push(response);
                }

                else {
                    const response = `Wrong Answer at Testcase ${i + 1}`;
                    result.push(response);
                    break;
                }
            }
        }
        
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);

        return res.status(200).json({ result });

    } catch (error) {
        console.error('Error in SubmitCodeFile:', error);
        return res.status(500).json({
            message: `Error: ${error.message}`,
            success: false
        });
    }
};

module.exports = { RunCodeFile, SubmitCodeFile }