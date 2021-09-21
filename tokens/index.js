const theo = require('theo');
const fs = require('fs')

theo
    .convert({
        transform: {
            type: "web",
            file: "./src/index.yml"
        },
        format: {
            type: "custom-properties.css"
        }
    })
    .then(css => {
        try {
            const dir = './build';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFileSync('./build/styles.css', css);
        } catch (error) {
            console.log(`An error occured write writing file: ${error}`);
        }
    })
    .catch(error => console.log(`Something went wrong: ${error}`));