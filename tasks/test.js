const task = require('./findPlays_satirata')

task()
  .then(() => console.log('clean exit'))
  .catch(console.error)
