const express = require('express');

const router = express.Router();

const Recorde = require('../model/recorde');

router.get('/', async function(req, res, next) {
  let data = Math.round(new Date() / 1000);
  let registros = await Recorde.count();
  let ultimo = 0;

  if (registros > 0) {
    ultimo = await Recorde.max('data');
  } else {
    const criar = await Recorde.create({ data, tempo: 0 });
    ultimo = data;
  }

  ultimo = data - ultimo;
  ultimo = isNaN(ultimo) ? 0 : ultimo;

  let recorde = await Recorde.max('tempo');

  console.log({ ultimo, recorde })
  res.render('index', { title: 'TRETAS', ultimo, recorde });
});

router.get('/zerar', async function(req, res, next) {
  try {
    let data = Math.round(new Date() / 1000);
    let id = await Recorde.max('id');
    let anterior = id > 0 ? await Recorde.findByPk(id) : { data: 0 };
    let tempo = data - anterior.data;
    tempo = isNaN(tempo) ? 0 : tempo;

    console.log({ data, tempo })
    const criar = await Recorde.create({ data, tempo });
    console.log('Contador zerado');
  } catch (error) {
    console.log(error);
  }

  res.redirect('/');
});

module.exports = router;