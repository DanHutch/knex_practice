const paper = require('../models/papers')
const pry = require('pryjs')

const index = (request, response) => {
  paper.all()
  .then((papers) => {
    response.status(200).json(papers);
  })
  .catch((error) => {
    response.status(500).json({error});
  })
}

const footnotes = (request, response) => {
  paper.findAll(request.params.id)
  .then((footnotes) => {
    response.status(200).json(footnotes);
  })
  .catch((error) => {
    response.status(500).json({error});
  })
}

module.exports = { index, footnotes }
