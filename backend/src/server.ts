import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
import "express-async-errors";

import "./database/connection";

import routes from "./routes";
import errorHandlers from "./errors/handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandlers);

app.listen(process.env.PORT, () =>
  console.log(
    `App is runing on http://${process.env.HOSTNAME}:${process.env.PORT}`
  )
);
