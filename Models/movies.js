const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    rated: String,
    year: String,
    cast: Object,
    languages: Object,
    directors: Object,
    awards: Object
})

const Movie = mongoose.model("movie",movieSchema);
module.exports=Movie
