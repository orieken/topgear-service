import * as supertest from 'supertest';
import { app } from './app';

describe('App', () => {
  const request = supertest;
  describe('routes', () => {
    it('responds to /', (done) => {
      request(app)
          .get('/')
          .expect(200)
          .expect({message: 'Hello World!'})
          .end(done);
    });
    it('404 everything else', (done) => {
      request(app)
          .get('/foo/bar')
          .expect(404)
          .end(done);
    });
  });
});
