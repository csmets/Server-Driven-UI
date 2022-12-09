const glob = require('glob');
const fs = require('fs');

const graphqlFiles = glob.sync('./graphql/**/*.graphql');
let schema = '';

graphqlFiles.forEach(element => {
  try {
    const file = fs.readFileSync(element, 'utf8');
    schema += file;
  } catch (error) {
    console.error(error);
  }
});

fs.writeFileSync('src/schema.graphql', schema, {encoding: 'utf-8', flag: 'w'});
