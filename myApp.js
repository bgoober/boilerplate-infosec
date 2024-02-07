const express = require('express'); // require express for app routing
const helmet = require('helmet'); // require helmet for security middleware
const app = express();










module.exports = app;
const api = require('./server.js'); // require the server.js file
app.use(express.static('public')); // serve static files
app.use(helmet.hidePoweredBy()); // hide the X-Powered-By header so hackers can't exploit known vulnerabilities
app.use(helmet.frameguard({action: 'deny'})) // deny iframe clickjacking
app.use(helmet.xssFilter()); // prevent cross-site scripting (XSS) attacks
app.disable('strict-transport-security'); // disable the strict-transport-security header
app.use('/_api', api); // use the api router
app.get("/", function (request, response) { // serve the index.html file
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
