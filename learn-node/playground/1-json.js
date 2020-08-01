const fs = require('fs')

const fileContent = fs.readFileSync('1-json.json').toString()
const fileJSON = JSON.parse(fileContent)
fileJSON.name = 'Fremy'
fileJSON.age = 28

const newJSON = JSON.stringify(fileJSON)
fs.writeFileSync('1-json.json', newJSON)

