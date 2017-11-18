const osmosis = require('osmosis')
const { reverse, last, map, prop, pipe, trim } = require('ramda')
const { URL } = require('url')

const findAuthor = () => ({
  author: osmosis.find('div.mb2 > span').then((context, data, next) => {
    const text = context.innerText.trim()
    const author = text.indexOf('от ') === 0 ? text.substring(3) : text
    next(context, author)
  })
})

const findActors = () => ({
  actors: osmosis.find('div.mt1.mb2').then((context, data, next) => {
    try {
      next(
        context,
        context
          .find('div:last-child')[0]
          .innerText.substring(9)
          .split(', ')
      )
    } catch (e) {
      next(context, map(pipe(prop('innerText'), trim), context.find('a')))
    }
  })
})

const task = async url =>
  new Promise((resolve, reject) => {
    console.log(`processing ${url}`)
    osmosis
      .get(new URL(url).href)
      .set({
        title: 'div.mb2 > h1',
        ...findAuthor(),
        ...findActors()
      })
      .data(resolve)
      .error(reject)
  })

module.exports = task
