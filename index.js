const express = require('express');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const routerApi = require('./routes');

const app = express();
const port = 3005;

app.use(express.json()); // middleware express

app.get('/', (req, res) => {
  res.send('Hello! My server in express');
});

app.listen(port, () => {
  console.log(`Port ${port} on`);
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
