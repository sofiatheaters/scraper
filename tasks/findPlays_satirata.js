const osmosis = require('osmosis')

const task = async url =>
  new Promise((resolve, reject) => {
    console.log(`processing ${url}`)

    osmosis
      .get(url)
      .set({
        urls: osmosis
          .find('article.event h2.entry-title > a')
          .then((context, data, next) => {
            next(context, decodeURIComponent(context.href))
          })
      })
      .data(res => resolve(res.urls))
      .error(console.log)
  })

module.exports = task
