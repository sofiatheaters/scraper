const task = require('./findPlays_satirata')

task('http://satirata.bg/event/2017/11')
  .then(console.log)
  .catch(console.error)
