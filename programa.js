const fs = require('fs')
const osmosis = require('osmosis')

const imageUrl = path => `http://www.programata.bg/${path}`

const translateMonth = bgMonth => [
  'януари',
  'февруари',
  'март',
  'април',
  'май',
  'юни',
  'юли',
  'август',
  'септември',
  'октомври',
  'ноември',
  'декември'
].indexOf(bgMonth)

const findDirector = context => {
  const str = context.innerHTML.split('<br>')
  let dstr = str.find(s => s.indexOf('Режисьор: ') === 0)
  if (dstr) {
    return dstr.substring(10)
  }
  dstr = str.find(s => s.indexOf('Постановка: ') === 0)
  if (dstr) {
    return dstr.substring(12)
  }
  return ''
}

const findActors = context => {
 const str= context.innerHTML.split('<br>')
 let dstr = str.find(s => s.indexOf('С: ') === 0)
 if (dstr) {
   return dstr.substring(3).split(', ')
 }
 return []
}

module.exports = url => new Promise((resolve, reject) => {
  
  console.log(`processing: ${url}`);
  
  osmosis.get(url).set({
    title: '#article > div.main-preview > h1',
    imageUrl: osmosis.find('#article > div.main-preview > a').then((context, data, next) => next(context, imageUrl(context.href))),
    director: osmosis.find('#article > div.text.summary').then((context, data, next) => next(context, findDirector(context))),
    actors: osmosis.find('#article > div.text.summary').then((context, data, next) => next(context, findActors(context))),
    theater: '#article > div.program > ul > li > h6 > a',
    schedule: osmosis.find('#article > div.program > ul > li > p').then((context, data, next) => {
      const tokens = context.innerText.split(' ')
      const [day, month] = tokens
      const hour = tokens[tokens.length - 1]
      const date = new Date()
      date.setDate(day)
      date.setMonth(translateMonth(month))
      date.setHours(hour.split(':')[0])
      date.setMinutes(hour.split(':')[1])
      next(context, date.getTime())
    })
  }).data(resolve).error(reject)
  
})
