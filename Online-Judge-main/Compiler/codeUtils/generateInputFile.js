const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const InputPath = path.join(__dirname, "input")

if (!fs.existsSync(InputPath)) {
    fs.mkdirSync(InputPath, { recursive: true })
}

const generateInputFile = async (Input) => {
    const userCodeId = uuid()
    const input_filename = `${userCodeId}.txt`
    const input_filePath = path.join(InputPath, input_filename)
    fs.writeFileSync(input_filePath, Input)
    return input_filePath


}

module.exports = generateInputFile