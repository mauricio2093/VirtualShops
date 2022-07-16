const { app, routerApi } = require('./routes/app');

const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello! My server in express');
});

app.listen(port, () => {
  console.log(`Port ${port} on`);
});

routerApi(app);
