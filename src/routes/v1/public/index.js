const express = require('express');
const userPublicRoute = require('./user.public.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userPublicRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
