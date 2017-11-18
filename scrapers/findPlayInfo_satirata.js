const osmosis = require('osmosis')
const { reverse, last, trim } = require('ramda')

const task = async url =>
  new Promise((resolve, reject) => {
    console.log(`processing ${url}`)
    // TODO handle different structures ;(
    osmosis
      .get(url)
      .set({
        title: 'div.mb2 > h1',
        author: osmosis.find('div.mb2 > span').then((context, data, next) => {
          const text = context.innerText.trim()
          const author = text.indexOf('от ') === 0 ? text.substring(3) : text
          next(context, author)
        }),
        actors: osmosis.find('div.mt1.mb2').then((context, data, next) => {
          const actors = []
          const { children } = context
          const b = reverse(children).find(
            c => c.innerText.trim() === 'Участват'
          )
          if (b) {
            let { nextSibling } = b
            while (nextSibling) {
              const { innerText } = nextSibling
              if (innerText.split(' ').length === 2) {
                actors.push(innerText)
              }
              nextSibling = nextSibling.nextSibling
            }
            next(context, actors)
          } else {
            const lastDiv = last(children)
            const actors = lastDiv.innerText.split(', ').map(trim)
            next(context, actors)
          }
        })
        // urls: osmosis
        //   .find('article.event h2.entry-title > a')
        //   .then((context, data, next) => {
        //     next(context, decodeURIComponent(context.href))
        //   })
      })
      .data(resolve)
      .error(reject)
  })

module.exports = task
