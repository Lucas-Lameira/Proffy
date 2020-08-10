import express from 'express';
const routes = express.Router();

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);
 
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;