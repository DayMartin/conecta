const router = require("express").Router();

// Services router
const servicesRouter = require("./service");

router.use("/", servicesRouter);

// Ordem routes

const ordemRouter = require("./ordem");

router.use("/", ordemRouter);

// comments routes

const commentsRouter = require("./comments");

router.use("/", commentsRouter);

// users routes

const usersRouter = require("./users");

router.use("/", usersRouter);

module.exports = router;