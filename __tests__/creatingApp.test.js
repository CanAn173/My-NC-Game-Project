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
    
  })
})

  it("GET-404, responds with not found", () => {
  return request(app)
  .get("/api/category")
  .expect(404)
  })
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
      });
    });
    it("GET-404, responds with not found", () => {
      return request(app)
      .get("/api/reviewer")
      .expect(404)
      })
  });

  describe("/api/reviews/:reviews_id", () => {
    it("GET-200, responds a table with customer reviews and its id", () => {
      return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then((response) => {
        const body = response.body.customerReviews;
        
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
    });
    test("404-GET-api/reviews/:review_id", () => {
      return request(app)
      .get('/api/reviews/100000')
      .expect(404);
    });
    it("400-GET-api/reviews/:review_id", () => {
      return request(app)
      .get('/api/reviews/one')
      .expect(400)
  });
  });

  describe("GET-/api/reviews/:review_id/comments", () => {
    it("GET-200, repond with a table of comment using review id", () => {
      return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then((response) => {
        const commentBodies = response.body.commentsById

        expect(commentBodies.length > 0).toBe(true);

        commentBodies.forEach((body) => {
          
          expect(body).toHaveProperty('body', expect.any(String));
          expect(body).toHaveProperty('votes', expect.any(Number));
          expect(body).toHaveProperty('author', expect.any(String));
          expect(body).toHaveProperty('review_id', 3);
          expect(body).toHaveProperty('created_at', expect.any(String));
        });
      });
   });

   test("404-GET-api/reviews/:review_id/comments", () => {
    return request(app)
    .get('/api/reviews/100000/comment')
    .expect(404);
  });

  it("400-GET-api/reviews/:review_id/comments", () => {
    return request(app)
    .get('/api/reviews/one/comments')
    .expect(400)
  });
 });

  describe('POST-/api/reviews/:review_id/comments', () => {
    it("POST-201, responds with table of only username and body", () => {
      const commentToSend = 
      {
        userName: "bainesface",
        body: 'I enjoy coding?'
      };
      
      return request(app)
      .post("/api/reviews/3/comments")
      .send(commentToSend)
      .expect(201)
      .then((response) => {

      const receivedComment = response.body.comment

      expect(receivedComment).toMatchObject(
        {
          author: 'bainesface',
          votes: expect.any(Number),
          body: 'I enjoy coding?',
          review_id: 3,
          created_at: expect.any(String)
        }
      )

      });
    });

    test("404-responds with error 404, due to non-existing path", () => {

      const commentToSend = 
      {
        userName: 'mallionaire',
        body: 'I enjoy coding?'
      };

      return request(app)
      .post('/api/reviews/10000/comments')
      .send(commentToSend)
      .expect(404)
      .then((response) => {
        
        const receivedComment = response.body

        expect(receivedComment).toMatchObject(
          {
            msg: 'Not found'
          }
        )
      })
      
    });

    test("400-responds with error 400 due to invalid path", () => {
      const commentToSend =
        {
          userName: 'mallionaire',
          body: 'I enjoy coding?'
        }
    
      return request(app)
      .post("/api/reviews/one/comments")
      .send(commentToSend)
      .expect(400)
      .then((response) => {

        const receivedComment = response.body

        expect(receivedComment).toMatchObject(
          {
            msg: 'Bad Request'
          }
        )
      });
    });

    test("404-should responds with error 404, due to missing properties", () => {

      const commentToSend = {
        body: 'I enjoy coding?'
      };

      return request(app)
      .post('/api/reviews/2/comments')
      .send(commentToSend)
      .expect(404)
      .then((response) => {
        
        const receivedComment = response.body

        expect(receivedComment).toMatchObject(
          {
            msg: 'Not found'
          }
        )
      });
    });
  });


});