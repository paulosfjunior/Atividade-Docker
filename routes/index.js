const express = require('express');

const router = express.Router();

const Recorde = require('../model/recorde');

router.get('/', async function(req, res, next) {
  let recorde = await Recorde.max('tempo');
  res.render('index', { title: 'TRETAS', recorde: recorde });
});

router.get('/zerar', async function(req, res, next) {
  try {
    let data = new Date();
    let id = await Recorde.max('id');
    let anterior = id > 1 ? await Recorde.findByPk((id - 1)) : 0;
    let tempo = Math.round(data / 1000) - Math.round(anterior.data / 1000);
    tempo = isNaN(tempo) ? 0 : tempo;

    const criar = await Recorde.create({ data, tempo });
    console.log('Contador zerado');
  } catch (error) {
    console.log(error);
  }

  res.redirect('/');
});

module.exports = router;