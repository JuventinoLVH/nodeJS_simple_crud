//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\  Cabecera  \\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const bent = require('bent')
const getJSON = bent('json')
const semverMajor = require('semver/functions/major')
const semverGt = require('semver/functions/gt')
const packageJson = require('../package.json')
const NODE_API_URL = 'https://nodejs.org/dist/index.json'
const Movie = require('../Models/movies');


//~~~~~~~~~~~~~~~~ Funciones útiles ~~~~~~~~~~~~~~~~~~~~~~~~~~
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


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\  Routeado  \\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//~~~~~~~~~~~~~~~~ Deprecated ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
exports.dependencies = (req, res) => {
  const dependencies = Object.entries(
    packageJson.dependencies
  ).map(([key, value]) => ({ name: key, version: value }))
  res.render('dependencies.hbs', { dependencies })
}

//~~~~~~~~~~~~~~~~~~~~~ Vista Mostrrar ~~~~~~~~~~~~~~~~~~~~~~~
exports.mostrar =async (req, res) => {
    try{
        const movieArr = await Movie.find()
        res.render('mostrar.hbs',{ movies:movieArr})
    }
    catch(e) {
        console.log(e)
    }
}


//~~~~~~~~~~~~~~~~~~~~~ Vista Registrar ~~~~~~~~~~~~~~~~~~~~~~
exports.registrar = (req, res) => {
  res.render('registrar.hbs')
}

//~~~~~~~~~~~~~~~~~~~~~ Vista Home ~~~~~~~~~~~~~~~~~~~~~~~~~~~
exports.home = (req, res) => {
  res.render('home.hbs')
}

//~~~~~~~~~~~~~~~~~~~~~ Post  Registrar ~~~~~~~~~~~~~~~~~~~~~~
exports.RegPost =  async (req,res) => {
    try {
        const pelicula= new Movie(req.body)
        await pelicula.save(); 
        res.redirect('/mostrar')
    }
    catch(error) {
        console.log(error)
    }
}

//~~~~~~~~~~~~~~~~~~~~~ GET Editar reg  ~~~~~~~~~~~~~~~~~~~~~~
exports.EditarReg =  async (req,res) => {
    const id =req.params.id
    try {
        const pelicula=await  Movie.findOne({_id:id})
        res.render('detalles.hbs', {
                error:false,
                pelicula:pelicula
            }
        )
    }
    catch(error) {
    console.log(id)
        res.render('detalles.hbs', {error:true})
    }
}
