var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

require("dotenv").config();
var pool = require("./models/bd");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//consultas
/**
//SELECT
pool.query("select * from empleados").then(function (resultados) {
  console.log(resultados);
});

//INSERT
var objeto_1 = {
  nombre: "Juan",
  apellido: "Lopez",
  trabajo: "docente",
  edad: 38,
  salario: 15000,
  mail: "juanlopez@correo.com",
};
pool
  .query("insert into empleados set ?", [objeto_1])
  .then(function (resultados) {
    console.log(resultados);
  });

//UPDATE
var id = 26;
var objeto_2 = {
  nombre: "Pablo",
  apellido: "Gomez",
};

pool
  .query("update empleados set ? where id=?", [objeto_2, id])
  .then(function (resultados) {
    console.log(resultados);
  });

//DELETE
var id = 24;
pool
  .query("delete from empleados where id=?", [id])
  .then(function (resultados) {
    console.log(resultados);
  });
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
