import { PORT } from './env.json';
import { DATABASE_URL } from './env.json';
import 'source-map-support/register';
import express, { Express, Request, Response, NextFunction } from "express";
import createError from "http-errors"
import path from "path";
import cors from "cors";
import compression from "compression";
import serveStatic from "serve-static";
import router from "./routes";
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from "./controllers/userController";
import dotenv from 'dotenv';


const app: Express = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json({
  type: [
    'application/json',
    'application/csp-report',
    'application/reports+json'
  ]
}));
app.use(express.urlencoded({ extended: false }));
app.use(serveStatic(path.join(__dirname, '../public')));
app.use(compression());


app.use("/api",router);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction)=> {
  next(createError(404))
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    next(createError(500, err))
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
});

app.set("port", PORT);
app.set("database_url", DATABASE_URL);
app.listen(app.get("port"));


// create new user
app.post("/users", createUser);

// find all users
app.get("/users", getUsers);

// findbyId User
app.get("/users/:id", getUserById);

// update by id user
app.put("/users/:id", updateUserById);

// delete by id user
app.delete("/users/:id", deleteUserById);

// Load environment variables from env.json
dotenv.config({ path: 'env.json' });

// Access the environment variables
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;