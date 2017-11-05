const osmosis = require('osmosis')

module.exports = url =>
  new Promise((resolve, reject) => {
    console.log(`processing ${url}`);
    osmosis
      .get(url)
      .set({
        'title': '#main > div.site-content > div.container.container-main > div > div.col-sm-7.col-md-9.col-lg-9 > div > div.news-single > div > div > div:nth-child(1) > div',
        'image': '#main > div.site-content > div.container.container-main > div > div.col-sm-7.col-md-9.col-lg-9 > div > div.news-single > div > div > div:nth-child(2) > a > img@src',
        actors:
          osmosis
            .find('div.box-information a[href^="profile"]')
            .then((context, data, next) => {
              next(context, {
                name: context.text(),
                image: context.href
              })
            })
      })
      .data(resolve)
      .error(reject)
  })

