const fs = require('fs')

// Load environment variables from these files
const dotenvFiles = ['.env']

// expose environment variables to the frontend
const frontendConstants = ['APP_NAME']

function getEnvironmentConstants() {
    dotenvFiles.forEach((dotenvFile) => {
        if (fs.existsSync(dotenvFile)) {
            require('dotenv-expand')(
                require('dotenv').config({
                    path: dotenvFile,
                })
            )
        }
    })

    const arrayToObject = (array) =>
        array.reduce((obj, item, key) => {
            obj[item] = JSON.stringify(process.env[item])
            return obj
        }, {})

    return arrayToObject(frontendConstants)
}

module.exports = getEnvironmentConstants
