const expressJwt = require('express-jwt');

function auth() {
  const api = process.env.api;
  return expressJwt({
    secret: process.env.secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      `${api}/user/login`,
      `${api}/user/register`,
      {
        url: /\/api\/v1\/products(.*)/,
        methods: [`GET`, `OPTIONS`],
      },
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: [`GET`, `OPTIONS`],
      },
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
