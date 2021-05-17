import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import * as express from "express";
import { json } from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import Router from "./routes/";

const app: express.Application = express();

app.use(json());
app.use(cors());
app.use(morgan("dev"));

app.use(Router);

createConnection()
  .then(async (_connection: Connection) => {
    app.listen(8000, () => {
      console.log("server started.");
    });
  })
  .catch((error: Error) => console.log(error));
