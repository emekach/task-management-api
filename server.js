process.on('uncaughtException', () => {
  console.log('Handling uncaught exception');
  process.exit(1);
});

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
