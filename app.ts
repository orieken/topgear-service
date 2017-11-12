import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as request from 'request';

export class App {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.express.listen(7000);
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', (req, res) => res.json({ message: 'Hello World!' }));
    router.get('/foo', (req, res) => res.send('Hello World!'));
    router.get('/users', (req, res) => request('http://derp-bear-users-api.herokuapp.com/users').pipe(res));

    this.express.use('/', router);
  }
}

export default new App().express; // tslint:disable-line
