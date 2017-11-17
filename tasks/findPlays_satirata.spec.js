const expect = require('chai').expect
const sinon = require('sinon')

const task = require('./findPlays_satirata')
const osmosis = require('osmosis')

const fakeUrls = {
  urls: [
    'http://satirata.bg/show/%D1%82%D0%B8%D0%BA%D0%B2%D0%B0/',
    'http://satirata.bg/show/%D1%81%D0%BD%D0%B5%D0%B6%D0%BD%D0%B0%D1%82%D0%B0-%D0%BA%D1%80%D0%B0%D0%BB%D0%B8%D1%86%D0%B0/'
  ]
}

beforeEach(function() {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function() {
  this.sandbox.restore()
})

describe('Find plays from Satirata', function() {
  it('finds all plays for a given date', async function() {
    const url = 'http://satirata.bg/event/2017/11'

    const error = obj => {
      return true
    }

    const data = f => {
      f(fakeUrls)
    }

    const set = obj => {
      expect(obj).to.have.property('urls')
      return { data }
    }

    const get = url => {
      expect(url).to.equal(url)
      return { set }
    }

    const then = () => {
      return true
    }

    const find = selector => {
      return { then }
    }

    this.sandbox.stub(osmosis, 'get').callsFake(get)
    this.sandbox.stub(osmosis, 'find').callsFake(find)

    const result = await task(url)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(2)
  })
})
