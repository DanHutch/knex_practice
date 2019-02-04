const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('papers').select();
const findAll = (paper_id) => database('footnotes').where('paper_id', paper_id).select()

module.exports = { all, findAll }
