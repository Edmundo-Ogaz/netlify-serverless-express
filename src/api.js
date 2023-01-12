const express = require("express");
const serverless = require("serverless-http");
let cors = require('cors');
const faunadb = require('faunadb')
const user = require('./user')

const app = express();
const router = express.Router();

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(cors({origin: '*'}));

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get('/cors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  res.send('cors problem fixed:)');
})

router.post('/cors2', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  res.send('cors problem fixed:)');
})

router.post("/user/login", async (req, res) => {
  console.log('api user/login', typeof req.body)
  const body = validateJson(req.body) && JSON.parse(req.body)
  if (!body || !body.email || !body.password) {
    res.json(null);
    return
  }
  const resp = await user.login(body.email, body.password)
  console.log('api user/login response', resp)
  res.json(resp);
});

const validateJson = (object) => {
  console.log('api validateJson')
  let result = true
  try {
    JSON.parse(object)
  } catch(e) {
    result = false
  }
  console.log('api validateJson', result)
  return result
}

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
