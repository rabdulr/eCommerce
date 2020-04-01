const db = require('./db');

try {
  process.env = { ...process.env, ...require('./.env') };
}
catch (ex) {
  console.log('Either add some environment variables or create an env.js file');
  console.log(ex);
}

const app = require('./app');
const port = process.env.PORT || 3000;

db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
