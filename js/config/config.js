
module.exports = {
    production: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'TV Schedule'
      },
      db: 'mongodb://localhost/tv',
      facebook: {
          clientID: "266066793415497"
        , clientSecret: "aa6fc6fe991dc39f21f12b27d71ed38b"
        , callbackURL: "http://localhost/auth/facebook/callback"
      }
    }
  , test: {

    }
  , dev: {

    }
}