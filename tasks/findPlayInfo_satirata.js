const scraper = require('../scrapers/findPlayInfo_satirata')
const { MongoClient } = require('mongodb')

const mongoUrl = 'mongodb://localhost:27017/sofiatheaters'

const findPlay = db => db.collection('plays').findOne({ processed: false })

const updatePlay = (db, play, payload) =>
  db.collection('plays').updateOne(
    {
      _id: play._id
    },
    {
      $set: {
        processed: true,
        payload
      }
    }
  )

module.exports = async () => {
  const db = await MongoClient.connect(mongoUrl)
  try {
    const play = await findPlay(db)
    const payload = await scraper(play.url)
    await updatePlay(db, play, payload)
  } catch (e) {
    console.error(e)
  } finally {
    db.close()
  }
}
