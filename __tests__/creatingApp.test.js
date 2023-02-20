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

describe("/api", () => {
  describe("/api/categories", () => {
  it("GET-200, responds with a table of slug and categories", () => {
    return request(app)
    .get('/api/categories')
    .expect(200)
    .then((response) => {

    const categoryBodies = response.body.games

    categoryBodies.forEach(body => {
      expect(body).toHaveProperty('slug', expect.any(String));
      expect(body).toHaveProperty('description', expect.any (String));
    });
    expect(categoryBodies).toEqual(categoryData)
    expect(categoryBodies).toHaveLength(4);
    expect(categoryBodies).toBeInstanceOf(Array);
  });
    });
  });

  describe("/api/reviews", () => {
    it("GET-200, responds with a table of customer reviews", () => {
      return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((response) => {
        const reviewBodies = response.body.review;

        reviewBodies.forEach(body => {
          expect(body).toHaveProperty('review_id', expect.any(Number))
          expect(body).toHaveProperty('title', expect.any(String));
          expect(body).toHaveProperty('category', expect.any (String));
          expect(body).toHaveProperty('designer', expect.any(String));
          expect(body).toHaveProperty('owner', expect.any(String));
          expect(body).toHaveProperty('review_body', expect.any(String));
          expect(body).toHaveProperty('review_img_url', expect.any(String));
          expect(body).toHaveProperty('created_at', expect.any(String));
          expect(body).toHaveProperty('votes', expect.any(Number));
        });
        expect(reviewBodies).toHaveLength(13);
        expect(reviewBodies).toBeInstanceOf(Array);

        // expect(reviewBodies).toEqual(reviewData);
      });
    });
  });
});