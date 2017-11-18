const scraper = require('../scrapers/findPlays_satirata')
const { MongoClient } = require('mongodb')

const url = 'http://satirata.bg/event/2017/11'
const mongoUrl = 'mongodb://localhost:27017/sofiatheaters'

const saveOrUpdate = db => url => {
  console.log(`set ${url} for processing`)
  db.collection('plays').updateOne(
    {
      url
    },
    {
      $set: {
        url,
        processed: false
      }
    },
    { upsert: true }
  )
}

module.exports = async () => {
  const db = await MongoClient.connect(mongoUrl)
  try {
    const playUrls = await scraper(url)
    playUrls.forEach(saveOrUpdate(db))
  } catch (e) {
    console.error(e)
  } finally {
    db.close()
  }
}
