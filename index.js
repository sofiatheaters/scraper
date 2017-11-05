const fs = require('fs')
const osmosis = require('osmosis')
const scrapeSingle = require('./scrapeSingle')

const random = () => Math.random() * 2000 + 1000
const wait = () => new Promise(res => setTimeout(res, random()))

const urls = 
[
  "http://sofiatheatre.eu/%D0%B0%D0%BB%D0%BE%D0%BD%D1%81%D0%BE-%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B5%D1%80%D0%B0__5093",
  "http://sofiatheatre.eu/%D1%84%D1%80%D0%B0%D0%BD%D0%BA%D0%B5%D0%BD%D1%89%D0%B0%D0%B9%D0%BD-%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B5%D1%80%D0%B0__5091",
  "http://sofiatheatre.eu/%D0%B6%D0%B5%D0%BD%D0%B8%D1%82%D0%B1%D0%B0__5077",
  "http://sofiatheatre.eu/%D0%BC%D0%B5%D1%80%D0%B8-%D0%BF%D0%BE%D0%BF%D0%B8%D0%BD%D0%B7-%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B5%D1%80%D0%B0__5057",
  "http://sofiatheatre.eu/%D0%BC%D0%B0%D0%BB%D0%BA%D0%B0%D1%82%D0%B0-%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%B0-%D1%81%D0%B8%D1%80%D0%B5%D0%BD%D0%B0-%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B5%D1%80%D0%B0__5054",
  "http://sofiatheatre.eu/%D0%B0%D0%BD%D0%BD%D0%B0-%D0%BA%D0%B0%D1%80%D0%B5%D0%BD%D0%B8%D0%BD%D0%B0-%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B5%D1%80%D0%B0__5048",
  "http://sofiatheatre.eu/%D0%B0%D0%BF%D0%B5%D1%82%D0%B8%D1%82-%D0%B7%D0%B0-%D1%87%D0%B5%D1%80%D0%B5%D1%88%D0%B8-%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B5%D1%80%D0%B0__4994",
  "http://sofiatheatre.eu/%D1%80%D0%BE%D0%BD%D1%8F-%D0%B4%D1%8A%D1%89%D0%B5%D1%80%D1%8F%D1%82%D0%B0-%D0%BD%D0%B0-%D1%80%D0%B0%D0%B7%D0%B1%D0%BE%D0%B9%D0%BD%D0%B8%D0%BA%D0%B0-%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B5%D1%80%D0%B0__4988",
  "http://sofiatheatre.eu/%D0%BD%D0%BE%D1%89%D1%82%D0%B0-%D0%BD%D0%B0-16-%D1%82%D0%B8-%D1%8F%D0%BD%D1%83%D0%B0%D1%80%D0%B8-%D0%BF%D1%80%D0%B5%D0%BC%D0%B8%D0%B5%D1%80%D0%B0__4981",
  "http://www.sofiatheatre.eu/postanovka.php?ps=4950",
  "http://sofiatheatre.eu/%D0%BF%D0%B8%D1%82%D1%8A%D1%80-%D0%BF%D0%B0%D0%BD__4947",
  "http://sofiatheatre.eu/%D0%B0%D0%BD%D1%82%D0%B8%D0%B3%D0%BE%D0%BD%D0%B0__4939",
  "http://www.sofiatheatre.eu/postanovka.php?ps=4914",
  "http://www.sofiatheatre.eu/postanovka.php?ps=4902",
  "http://sofiatheatre.eu/postanovka.php?ps=4840",
  "http://www.sofiatheatre.eu/postanovka.php?ps=4820",
  "http://sofiatheatre.eu/postanovka.php?ps=4857",
  "http://sofiatheatre.eu/postanovka.php?ps=4415"
] 

const result = []

const go = async () => {
  for (url of urls) {
    try {
      let data = await scrapeSingle(url)
      // console.log(data)
      result.push(data)
      await wait()
    } catch (e) {
      console.error(e)
    } finally {
      console.log()
    }
  }
  fs.writeFileSync('hi.json', JSON.stringify(result), 'utf8')
}

go()
