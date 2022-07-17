const express = require('express');
const routerApi = require('./routes');

const app = express();

const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello! My server in express');
});

app.listen(port, () => {
  console.log(`Port ${port} on`);
});

routerApi(app);
