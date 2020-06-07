import express from 'express';
import { celebrate, Joi } from 'celebrate'

import multer from 'multer';
import multerConfig from './config/multer'

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// padrao do nome dos metodos: index para listagem, show para exibir um unico registro, create, update, delete

routes.get('/items', itemsController.index);

routes.post('/points',
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().max(2).required(),
        items: Joi.string().required(),
    }),
  }, {
      abortEarly: false     // mostra todos os erros ao inves de abortar no primeiro
  }),
  pointsController.create
  );


routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;