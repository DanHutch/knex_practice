const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pry = require('pryjs');
const papers = require('./lib/routes/api/v1/papers')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Publications';

app.use('/api/v1/papers', papers)

app.post('/api/v1/papers/footnotes', (request, response) => {
  const paper = request.body;

  for (let requiredParameter of ['note', 'paper_id']) {
    if (!paper[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { note: <String>, paper_id: <integer> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('footnotes').insert(paper, 'id')
    .then(footnote => {
      response.status(201).json({id: footnote[0]})
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/papers/:id', (request, response) => {

  database('papers').where('id', request.params.id).select()
    .then(paper_one => {
      if (paper_one.length) {
        response.status(200).json(paper_one);
      } else {
        response.status(404).json({
          error: `Could not find paper with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
