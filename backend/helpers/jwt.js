const expressJwt = require('express-jwt');

function auth() {
  const api = process.env.API_URL;
  return expressJwt({
    secret: process.env.secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      {
        url: /\/public\/uploads(.*)/,
        methods: [`GET`, `OPTIONS`],
      },
      {
        url: /\/api\/v1\/products(.*)/,
        methods: [`GET`, `OPTIONS`],
      },
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: [`GET`, `OPTIONS`],
      },
      `${api}/user/login`,
      `${api}/user/register`,
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = auth;
