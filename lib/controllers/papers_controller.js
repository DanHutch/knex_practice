const paper = require('../models/paper')

const index = (request, response) => {
  paper.all()
  .then((papers) => {
    response.statuss(200).json(papers);
  })
  .catch((error) => {
    response.status(500).json({error});
  })
}

module.exports = { index }
