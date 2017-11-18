const task = require('./findPlayInfo_satirata')
// const task = require('./findPlays_satirata')

task()
  .then(() => console.log('clean exit'))
  .catch(console.error)
