const task = require('./findPlayInfo_satirata')

const url =
  // 'http://satirata.bg/show/%D1%82%D0%B8%D0%BA%D0%B2%D0%B0/'
  'http://satirata.bg/show/%D1%85%D0%B0%D0%BC%D0%B5%D0%BB%D0%B8%D0%BD/'
// 'http://satirata.bg/show/%D0%BB%D1%8A%D0%B6%D1%86%D0%B8-%D0%BF%D0%BE-%D0%BD%D0%B5%D0%B2%D0%BE%D0%BB%D1%8F/'

task(url)
  .then(console.log)
  .catch(console.error)
