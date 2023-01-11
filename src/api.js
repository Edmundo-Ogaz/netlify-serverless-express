const express = require("express");
const serverless = require("serverless-http");
var cors = require('cors');

const app = express();
const router = express.Router();

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(cors({origin: 'http://localhost:3000'}));

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

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
