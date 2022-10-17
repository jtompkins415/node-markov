/** Command-line tool to generate Markov text. */

let fs = require('fs');
let { MarkovMachine } = require('./markov');
let axios = require('axios');
let process = require('process');

function generateText(text) {
let mm = new MarkovMachine(text)
console.log(mm.makeText())
}

function makeMarkovText(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            console.log('ERROR:', err);
            process.exit(1);
        } else {
            generateText(data);
        };
    });
};

async function makeMarkovHTML(url){
    let res;

    try{
        res = await axios.get(url)
    } catch(err) {
        console.log('ERROR:', err)
        process.exit(1)
    }
    generateText(res);
}

let [method, path] = process.argv.slice(2)

if (method === 'file'){
    makeMarkovText(path)
} else if (method === 'url') {
    makeMarkovHTML(path)
} else {
    console.log(`ERROR: unknown method: ${method}`)
    process.exit
}