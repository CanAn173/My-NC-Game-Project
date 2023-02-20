const request = require("supertest");

const app = require("../db/creatingApp/app");

const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const {categoryData, commentData, reviewData, userData} = require("../db/data/test-data/index");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed({categoryData, commentData, reviewData, userData});
});

describe.only("/api/categories", () => {
  it("GET-200, responds with a table of slug and categories", () => {
    return request(app)
    .get('/api/categories')
    .expect(200)
    .then((response) => {

    const bodies = response.body.games

    console.log(bodies)
    bodies.forEach(body => {
      expect(bodies).toHaveLength(4);
      expect(body).toHaveProperty('slug', expect.any(String));
      expect(body).toHaveProperty('description', expect.any(String));
    })
    })
  })
})