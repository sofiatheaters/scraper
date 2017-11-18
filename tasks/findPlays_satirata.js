const scraper = require('../scrapers/findPlays_satirata')
const url = 'http://satirata.bg/event/2017/11'
module.exports = async () => {
  await scraper(url)
}
