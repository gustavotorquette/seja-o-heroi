const express = require('express');

const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Listar Ongs
routes.get('/ongs', OngController.index);

// Criar Ongs
routes.post('/ongs', OngController.create);

// Editar Ongs
routes.put('/ongs', OngController.edit);

//Criar Caso
routes.post('/casos', CasoController.create);

//Listar Casos
routes.get('/casos', CasoController.index);

//Listar Caso específico
routes.get('/profile', ProfileController.index);

//Deletar o Caso
routes.put('/casos/:id', CasoController.edit);

//Deletar o Caso
routes.delete('/casos/:id', CasoController.delete);


module.exports = routes;