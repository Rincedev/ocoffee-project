import 'dotenv/config';
import express from "express";
import localsMiddleware from './app/middleware/locals-middleware.js';
import path from "path";
import { fileURLToPath } from "url";
import session from 'express-session';
import router from './app/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default __dirname;

const app = express();

app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(localsMiddleware.listAllCategories);

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
