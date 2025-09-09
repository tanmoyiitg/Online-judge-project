const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const CodePath = path.join(__dirname, "codes");

// Ensure CodePath directory exists
if (!fs.existsSync(CodePath)) {
    fs.mkdirSync(CodePath, { recursive: true });
}

const languagePaths = {
    'C++': path.join(CodePath, "CPP"),
    'Java': path.join(CodePath, "java"),
    'Python': path.join(CodePath, "python"),
    'Javascript': path.join(CodePath, "javascript")
};

// Function to create directory if it does not exist
const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const generateFile = async (code, language) => {
    if (!languagePaths[language]) {
        throw new Error(`Unsupported language: ${language}`);
    }

    ensureDirectoryExists(languagePaths[language]);

    const userCodeId = uuid();
    const extension = {
        'C++': '.cpp',
        'Java': '.java',
        'Python': '.py',
        'Javascript': '.js'
    }[language];

    const filename = `${userCodeId}${extension}`;
    const filePath = path.join(languagePaths[language], filename);

    try {
        fs.writeFileSync(filePath, code);
        return filePath;
    } catch (error) {
        throw new Error(`Failed to write file: ${error.message}`);
    }
};

module.exports = generateFile;
