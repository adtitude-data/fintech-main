const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser    = require('body-parser')
const cors = require('cors');

const { handleError } = require("./helpers/errorHandler");
const { cronJob } = require("./helpers/cron");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const agentsRouter = require("./routes/agents");
const clientsRouter = require("./routes/clients");
const AgentClientsRouter = require("./routes/agent_clients");
const PalidRouter = require("./routes/plaid");
const AccountsRouter = require("./routes/accounts");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());


// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_Orign);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


if (app.get("env") === "production") {
  const fs = require("fs");
  const path = require("path");
  var rfs = require("rotating-file-stream");

  const logPath = path.join(__dirname, "log");
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }
  const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "log"),
  });
  // log to a file
  app.use(morgan("combined", { stream: accessLogStream }));
} else {
  // log to stdout
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/agents", agentsRouter);
app.use("/api/v1/clients", clientsRouter);
app.use("/api/v1/agent/clients", AgentClientsRouter);
app.use("/api/v1/plaid", PalidRouter);
app.use("/api/v1/clients/accounts", AccountsRouter);

app.use((err, req, res, next) => handleError(err, res));


cronJob();

module.exports = app;
