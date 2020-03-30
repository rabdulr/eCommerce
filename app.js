const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const models = db.models;
const ejs = require('ejs');

app.engine('html', ejs.renderFile);

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());

const isLoggedIn = (req, res, next) => {
  if (!req.user) {
    const error = Error('not authorized');
    error.status = 401;
    return next(error);
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return next(Error('not authorized'));
  }
  next();
};

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  db.findUserFromToken(token)
    .then(auth => {
      req.user = auth;
      next();
    })
    .catch(ex => {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    });
});

app.get('/', (req, res, next) => res.render(path.join(__dirname, 'index.html'), { FOO: 'BAR', GOOGLE_API_KEY }));


app.post('/api/auth', (req, res, next) => {
  db.authenticate(req.body)
    .then(token => res.send({ token }))
    .catch(() => {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    });
});

app.get('/api/auth', isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

app.get('/api/getCart', (req, res, next) => {
  db.getCart(req.user.id)
    .then(cart => res.send(cart))
    .catch(next);
});

app.get('/api/getOrders', (req, res, next) => {
  db.getOrders(req.user.id)
    .then(orders => res.send(orders))
    .catch(next);
});

app.post('/api/createOrder', (req, res, next) => {
  db.createOrder(req.user.id)
    .then(order => res.send(order))
    .catch(next);
});

app.post('/api/createUserAccount', (req, res, next) => {
  db.models.users.create(req.body)
    .then(userAccount => res.send(userAccount).sendStatus(204))
    .catch(next);
});

app.post('/api/createPromoCode', (req, res, next) => {
  db.models.promoCodes.create(req.body)
    .then(promoCode => res.send(promoCode).sendStatus(204))
    .catch(next);
});

app.get('/api/getLineItems', (req, res, next) => {
  db.getLineItems(req.user.id)
    .then(lineItems => res.send(lineItems))
    .catch(next);
});

app.post('/api/addToCart', (req, res, next) => {
  db.addToCart({ userId: req.user.id, productId: req.body.productId, num: req.body.num })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

app.delete('/api/removeFromCart/:id', (req, res, next) => {
  db.removeFromCart({ userId: req.user.id, lineItemId: req.params.id })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/removeOrder/:id', (req, res, next) => {
  db.removeOrder({ userId: req.user.id, orderId: req.params.id })
    .then(response => {
      res.send(response).sendStatus(204);
      console.log(response)
    })
    .catch(next)
})

app.put('/api/users/:id', (req, res, next) => {
  db.updatePassword(req.body)
    .then(response => res.send(response).sendStatus(201))
    .catch(next)
})

app.get('/api/products', (req, res, next) => {
  db.models.products.read()
    .then(products => res.send(products))
    .catch(next);
});

app.get('/api/promoCodes', (req, res, next) => {
  db.models.promoCodes.read()
    .then(promoCodes => res.send(promoCodes))
    .catch(next);
});

Object.keys(models).forEach(key => {
  app.get(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key].read({ user: req.user })
      .then(items => res.send(items))
      .catch(next);
  });
  app.post(`/api/${key}`, isLoggedIn, isAdmin, (req, res, next) => {
    models[key].create({ user: req.body })
      .then(items => res.send(items))
      .catch(next);
  });
});

app.use((req, res, next) => {
  const error = { message: `page not found ${req.url} for ${req.method}`, status: 404 };
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err.status);
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
