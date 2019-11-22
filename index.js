// @ts-nocheck
const yargs = require('yargs')
const axios = require('axios')

const options = yargs
  .usage('Usage: -n <name>')
  .option('n', {
    alias: 'name',
    describe: 'Your name',
    type: 'string',
    demandOption: false
  })
  .option('s', { alias: 'search', describe: 'search term', type: 'string' })
  .argv

if (options.name) console.log(`hello, ${options.name}!`)


if (options.search) {
  console.log(`Searching for jokes about ${options.search}...`)
} else {
  console.log('here is a joke for you:')
}

const url = options.search
  ? `https://icanhazdadjoke.com/search?term=${escape(options.search)}`
  : 'https://icanhazdadjoke.com/'

axios.get(url, { headers: { Accept: 'application/json' } }).then((res) => {
  if (options.search) {
    res.data.results.forEach((joke) => {
      console.log(`\n` + joke.joke)
    })
    if (res.data.results.length === 0) console.log('no jokes found 🙁')
  } else {
    console.log(res.data.joke)
  }
})
