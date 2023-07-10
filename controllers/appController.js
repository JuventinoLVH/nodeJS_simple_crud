const bent = require('bent')
const getJSON = bent('json')
const semverMajor = require('semver/functions/major')
const semverGt = require('semver/functions/gt')
const packageJson = require('../package.json')
const NODE_API_URL = 'https://nodejs.org/dist/index.json'
const mongoose = require('mongoose');

const Movie = require('../Models/movies');

mongoose.connect('mongodb://localhost:27017/ejemplo')
    .then(()=> console.log("Base de datos conectada"))
    .catch(e => console.log(e))


const isGrater = (a, b) => semverGt(a.version, b.version)

const getLatestReleases = (releases) =>
  releases.reduce((acc, release) => {
    const major = `v${semverMajor(release.version)}`
    const existing = acc[major]
    if (!existing || isGrater(release, existing)) {
      acc[major] = release
    }
    return acc
  }, {})

exports.dependencies = (req, res) => {
  const dependencies = Object.entries(
    packageJson.dependencies
  ).map(([key, value]) => ({ name: key, version: value }))
  res.render('dependencies.hbs', { dependencies })
}

exports.mostrar =async (req, res) => {

    try{
        const movieArr = await Movie.find()
        res.render('mostrar.hbs',{ movies:movieArr})
    }
    catch(e) {
        console.log(e)
    }
}


exports.registrar = (req, res) => {
  res.render('registrar.hbs')
}

exports.home = (req, res) => {
  res.render('home.hbs')
}

